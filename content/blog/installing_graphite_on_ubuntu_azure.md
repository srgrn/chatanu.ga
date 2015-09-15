+++
Description = ""
date = "2015-09-15T06:47:09+03:00"
draft = false
title = "installing graphite on ubuntu in Azure"
type = "post"

+++

Reading on how to deploy graphite is annoying, there are so many articles each was probably correct when it was written, here below is my own story of how to deploy a monitoring station on an Azure VM.
<!--more-->

```
# set enviroment
sudo chown `id -u` /etc/environment
cat <<EOT > /etc/environment
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games"
LANG=en_US.UTF-8
LANGUAGE=en_US.UTF-8
LANG=en_US.UTF-8
LC_ALL=en_US.UTF-8
EOT

# generate new ssh key
ssh-keygen -b 2048 -f /home/monitor/.ssh/id_rsa -q -N ""

sudo apt-get update
sudo apt-get upgrade -y
```

First step is to set the environment with UTF settings, this is due to the fact that the ubuntu image on azure starts without an LANG settings, this in turn cause weird errors in some applications.

The second step is creating a new key (used for github and others) and updating the machine.

```
# install python
sudo apt-get install -y git python-cairo gcc-multilib g++-multilib libffi-dev libffi6 libffi6-dbg python-crypto python-mox3 python-pil python-ply libssl-dev zlib1g-dev libbz2-dev libexpat1-dev libbluetooth-dev libgdbm-dev dpkg-dev quilt autotools-dev libreadline-dev libtinfo-dev libncursesw5-dev tk-dev blt-dev libssl-dev zlib1g-dev libbz2-dev libexpat1-dev libbluetooth-dev libsqlite3-dev libgpm2 mime-support netbase net-tools bzip2
wget https://www.python.org/ftp/python/2.7.10/Python-2.7.10.tgz
tar xfz Python-2.7.10.tgz
cd Python-2.7.10/
./configure
make
sudo make install
wget https://raw.github.com/pypa/pip/master/contrib/get-pip.py
sudo python get-pip.py
# adding virtualenv
sudo pip install virtualenv virtualenvwrapper
export WORKON_HOME=~/Envs
mkdir -p $WORKON_HOME
source /usr/local/bin/virtualenvwrapper.sh

cat <<EOT >> .bashrc
export WORKON_HOME=~/Envs
source /usr/local/bin/virtualenvwrapper.sh
EOT

# install mosh becouse it is plays nice with leaving your computer locked
sudo apt-get install mosh

```

Now ubuntu comes with python 2.7.6, which is nice until you try to use the requests module and it prints to STDERR that you need to update ypur python. So installing python 2.7.10 (the latest when this was written) is a easy step that doesn't seem to harm anything so far.

After installing python and pip it is usually a good idea to install virtualenv (which you will notice was not used in most installation on this server) for other scripts you will write and use.

Here I also installed mosh. Mosh has many imporvements on ssh but it requires to open ports 60000-61000 for udp on your server in the azure Security Policy (for ARM) or firewall settings (for ASM).

```
cd /usr/local/src
sudo git clone https://github.com/graphite-project/graphite-web.git
sudo git clone https://github.com/graphite-project/carbon.git
 
sudo pip install -r /usr/local/src/graphite-web/requirements.txt
 
cd /usr/local/src/carbon/
sudo python setup.py install
cd /usr/local/src/graphite-web/
sudo python setup.py install
```

Here we installed the latest graphite and carbon using the sources from github. and they are installed into /opt/graphite .

In order to run graphite web (and since we want to run graphite in a subfolder like http://localhost/graphite/) nginx and uwsgi should be installed as well (it is possible to use apache or other webserver here as well but I like nginx).

```
# install nginx and uwsgi
sudo apt-get install nginx
sudo pip install uwsgi 
sudo touch /etc/init/uwsgi.conf
sudo chown `id -u` /etc/init/uwsgi.conf
cat <<EOT > /etc/init/uwsgi.conf 
# Emperor uWSGI script

description "uWSGI Emperor"
start on runlevel [2345]
stop on runlevel [06]
pre-start script
    mkdir -p /var/log/uwsgi
end script

respawn

exec uwsgi --master --die-on-term --emperor /etc/uwsgi/apps-enabled --logto /var/log/uwsgi/emperor.log
EOT
sudo chown root /etc/init/uwsgi.conf
sudo mkdir -p /etc/uwsgi/apps-enabled
sudo mkdir -p /etc/uwsgi/apps-available

# nginx site configuration
sudo touch /etc/nginx/sites-available/graphite
sudo chown `id -u` > /etc/nginx/sites-available/graphite
cat <<EOT > /etc/nginx/sites-available/graphite
upstream graphite {
     server unix:///opt/graphite/uwsgi.sock;
}
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;
    server_name localhost;
    access_log /var/log/nginx/server_access.log;
    error_log /var/log/nginx/server_error.log;

    charset     utf-8;
    location /static {
        alias /opt/graphite/static;
    }
    location /graphite/ {
        uwsgi_pass  graphite;
        include     uwsgi_params;
        access_log /var/log/nginx/graphite_access.log;
        error_log /var/log/nginx/graphite_error.log;
    }
}
EOT
sudo chown root /etc/nginx/sites-available/graphite
sudo ln -s /etc/nginx/sites-available/graphite /etc/nginx/sites-enabled/graphite
sudo unlink /etc/nginx/sites-enabled/default

```

In this very long blob nginx was installed from the offical repo and uwsgi was installed from pip (to get the latest version). uwsgi has been configured as a service in emperor mode which will make it start apps it finds in the apps-enabled folder and restart them when they crash.

The apps-available is just to maintain order similar to the way nginx is working.

You will also notice that the nginx configuration file refers to the /opt/graphite/static, this folder doesn't exist yet and it will be created as part of the graphite Web configuration.

It is also possible toe keep the location directive in a different file and include it in the default nginx configuration file, however this is a bit easier to use.

```
sudo touch /etc/uwsgi/apps-available/graphite.ini
sudo chown `id -u` /etc/uwsgi/apps-available/graphite.ini
cat <<EOT > /etc/uwsgi/apps-available/graphite.ini
[uwsgi]
processes = 2
chmod-socket = 664
socket = /opt/graphite/uwsgi.sock
gid = www-data
uid = www-data
chdir = /opt/graphite/webapp
mount = /graphite=graphite/wsgi.py
EOT
sudo ln -s /etc/uwsgi/apps-available/graphite.ini /etc/uwsgi/apps-enables/graphite.ini
sudo chown root /etc/uwsgi/apps-available/graphite.ini
sudo service uwsgi start
``` 
Simple uwsgi configuration for graphite using sockets, and a mount point this will allow graphite to work inside a subfolder. There are other ways to deal with nginx than using the server directive for graphite alone, but in this case 

Getting up to here doesn't mean graphite is working, it just means we have most of the stuff in place.

```
# setting graphite and carbon
sudo cp /opt/graphite/conf/storage-schemas.conf.example /opt/graphite/conf/storage-schemas.conf
sudo cp /opt/graphite/conf/storage-aggregation.conf.example /opt/graphite/conf/storage-aggregation.conf
sudo cp /opt/graphite/conf/carbon.conf.example /opt/graphite/conf/carbon.conf
sudo touch /etc/init/carbon-cache.conf
sudo chown `id -u` /etc/init/carbon-cache.conf
cat <<EOT > /etc/init/carbon-cache.conf
# carbon-cache-a upstart job
#
# Daniel Beckham 
# @dbeckham
# https://github.com/dbeckham

description "Carbon Cache-a Service"
author      "Daniel Beckham"

start on runlevel [2345]
stop on runlevel [016]

env GRAPHITE_ROOT=/opt/graphite
env PYTHONPATH=/opt/graphite/lib
pre-start script
    mkdir -p \$GRAPHITE_ROOT/storage/log/carbon-cache/carbon-cache-a
end script

script
    exec twistd \
    --nodaemon \
    --reactor=epoll \
    --no_save \
    carbon-cache \
    --config \$GRAPHITE_ROOT/conf/carbon.conf \
    2>&1 >> \$GRAPHITE_ROOT/storage/log/carbon-cache/carbon-cache-a/console.log
end script
EOT
sudo chown root /etc/init/carbon-cache.conf
```

Very naive carbon configuration using the defaults, there are many guides explaining how the to configure carbon, but it is important to remember the 2 following points:

* Carbon default is for 1 day retention only. So it will aggregate data points for 1 minute intervals and will keep those data points for 1 day.
* When updating carbon configuration after the DB (whisper file .wsp) already exists it will not change the whisper file configuration, in order to change the configuration after you already got some data you need to use the whisper-resize.py command.

```
# setting up graphite web
sudo chown `id -u` /opt/graphite/webapp/graphite
SECRET=`strings /dev/urandom | grep -o '[[:alnum:]]' | head -n 100 | tr -d '\n'; echo`
cat <<EOT > /opt/graphite/webapp/graphite/local_settings.py
URL_PREFIX = '/graphite'
SECRET_KEY = '${SECRET}'
EOT

sudo chown -R www-data:www-data /opt/graphite/
cd /opt/graphite/webapp
sudo -u www-data PYTHONPATH=/opt/graphite/webapp django-admin.py collectstatic --noinput --settings=graphite.settings
```

The last command should have generated the static folder that I mentioned during the nginx configuration step.

We are now almost ready for the graphite ui to work. The last step is running the syncdb command, however this is an interactive command that requires choosing an admin user and a password and cannot be part of the rest.

```
sudo -u www-data PYTHONPATH=/opt/graphite/webapp django-admin.py syncdb --settings=graphite.settings
```

Now you should simply go to http://<yourmachine>/graphite and should see the graphite window.


All this took me some time to figure out, and there are other improvments that were added later on. I hope that it will be of use to others as well.

In the case you find this too long and would like to use a container one of the easiest graphite docker containers I used was https://hub.docker.com/r/sitespeedio/graphite/ which is based on https://hub.docker.com/r/hopsoft/graphite-statsd/ both are great ways to experiment with graphite without the need to install it on a machine by yourself. 

