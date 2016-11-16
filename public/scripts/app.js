/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

  // create html element of each tweet object
  function createTweetElement (tweet) {
    let avatar = $('<img>').attr("src", tweet['user']['avatars']['regular']);
    let username = $('<h2>').text(tweet['user']['name']);
    let handle = $('<p>').text(tweet['user']['handle']);

    let content = $('<p>').text(tweet['content']['text']);

    let date = $('<p>').text(tweet['created_at']);

    var $tweet = $("<article>").addClass("tweet");
    var header = $('<header>');
    var middle = $('<div>');
    var footer = $('<footer>');
    header.append(avatar, username, handle);
    middle.append(content);
    footer.append(date);

    $tweet.append(header, middle, footer);
    return $tweet;
  }

  // render the tweet objects.
  function renderTweets (tweets) {
    tweetData.forEach((tweet) => {
      twtElement = createTweetElement(tweet);
      $("#dynamicTweetsContainer").append(twtElement);
    });

    $('.tweet').css({
      'height': '180px',
      'width': '100%',
      'background-color': 'white',
      'margin': '20px auto',
      'overflow': 'hidden',
      'border-radius': '10px',
      'border': '2px solid black'
     });

    $('.tweet header').css({
      'height': '60px',
      'background-color': '#eeeeee',
      'border-bottom': '1px solid grey'
    });

    $('.tweet header h2').css({
      'margin': '0',
      'line-height': '60px',
      'padding-left': '0',
      'display': 'inline-block'
    });

    $('.tweet header img').css({
      'height': '60px',
      'width': '60px',
      'padding-top': '5px',
      'padding-bottom': '5px',
      'background-repeat': 'no-repeat',
      'background-size': 'cover',
      'background-position': 'center center',
      'margin': '0',
      'padding-right': '10px',
      'border-radius': '50%',
      'float': 'left',
      'padding-left': '10px'
    });

    $('.tweet header p').css({
      'margin': '0',
      'line-height': '60px',
      'float': 'right',
      'padding-right': '10px'
    });

    $('.tweet div').css({
      'height': '90px',
      'margin': '0',
      'padding': '5px',
      'border-bottom': '1px solid grey'
    });

    $('.tweet footer').css({
      'margin': '0',
    });

    $('.tweet footer p').css({
      'margin': '0',
      'line-height': '30px',
      'font-size': '12px',
      'padding-left': '5px'
    });
  }

  renderTweets(tweetData);
});

// hard coded tweet data.
var tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];