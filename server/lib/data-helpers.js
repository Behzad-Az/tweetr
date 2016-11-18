
"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

// sort the data inside mongoDb
db.collection('tweets').find().sort( { "created_at" : -1 } );

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.collection('tweets').insert(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        function getTweets(callback) {
          db.collection("tweets").find().toArray((err, tweets) => {
            if (err) { return callback(err); }
            callback(null, tweets);
          });
        }

        getTweets((err, tweets) => {
          if (err) { throw err; }
          callback(null, tweets);
        });
      });
    }

  };
}
//db.close();    <------------------------------------- Where do I put this?