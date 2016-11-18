
"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  db.collection('tweets').find().sort({"created_at":-1});

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        //db.tweets.push(newTweet);
        db.collection('tweets').insert(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        function getTweets(callback) {
          db.collection("tweets").find().toArray((err, tweets) => {
            if (err) {
              return callback(err);
            }
            callback(null, tweets);
          });
        }


        getTweets((err, tweets) => {
          console.log(tweets);
          if (err) throw err;
          callback(null, tweets);
          //console.log("Logging each tweet:");
          for (let tweet of tweets) {
            //console.log(tweet);
          }

          //db.close();
        });


      });


    }

  };
}