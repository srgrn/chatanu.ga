var Twit = require('twit')
var request = require('request');

module.exports = 
    function (ctx, done) {
        var T = new Twit({
            consumer_key:         ctx.data.KEY
          , consumer_secret:      ctx.data.KEY_SECRET
          , access_token:         ctx.data.TOKEN
          , access_token_secret:  ctx.data.TOKEN_SECRET
        })
        var formdata = {
            url:ctx.data.target_url,
            username: ctx.data.startafire_user,
            token: ctx.data.startafire_token,
            source: "Srgrn StartaFire Automation"
        }
        request.post({url:'http://startafire.com/api/createFIRE',form:formdata}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                result = JSON.parse(body);
                if (result.success == true) {
                    // here be twitter post with result.url
                    // example content
                    tweet = ctx.data.title + " " + result.shortUrl + " #newpost #chatanu.ga";
                    console.log(tweet)
                    T.post('statuses/update', { status: tweet}, function(err, data, response) { 
                        done(null,"Posted tweet" + tweet);
                    });
                } else {
                    done(null,"something went wrong failed to add link to startafire")
                }
            } else {
                done(null,"something went wrong during post")
            }
        });
        
        
    }