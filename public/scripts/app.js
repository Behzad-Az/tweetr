/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

  // submit jQuery POST request when form is submitted
  let $form = $(".new-tweet form");
  $form.submit( function (event) {
    event.preventDefault();
    let url = $form.attr('action');
    let method = $form.attr('method');
    let content = $form.find('textarea').val();
    // content = $form.serialize();

    if (!content) { alert('Don\'t forget to enter tweet first!'); }
    else if (content.length > 140) { alert('Please shorten your tweet to less than or equal to 140 chars'); }
    else {
      $.ajax({
        type: method,
        url: url,
        data: $form.serialize(),
        success: function (data) {
          console.log('success');
        }
      }).done(function(){
        $.ajax({
          type: "GET",
          url: "/tweets",
          dataType: 'JSON',
          success: function (data){
            console.log("success in GET /tweets");
            renderTweets(data);

            $('.tweet').on('mouseenter', function(event) {
              hoverEnterEffect($(this));
            }).on('mouseleave', function(event) {
              hoverExitEffect($(this));
            });
          }
        });

      });
    }
  });

  // submit jQuery GET request from /tweets when page is loaded
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: 'JSON',
    success: function (data){
      console.log("success in GET /tweets");
      renderTweets(data);

      $('.tweet').on('mouseenter', function(event) {
        hoverEnterEffect($(this));
      }).on('mouseleave', function(event) {
        hoverExitEffect($(this));
      });
    }
  });

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

// create html element of each tweet object
function createTweetElement (tweet) {
  let avatar = $('<img>').attr("src", tweet['user']['avatars']['regular']);
  let username = $('<h2>').text(tweet['user']['name']);
  let handle = $('<p>').text(tweet['user']['handle']);

  let content = $('<p>').text(tweet['content']['text']);
  let date = $('<p>').text(getTimePassed(tweet['created_at']));

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
  tweets.forEach((tweet) => {
    twtElement = createTweetElement(tweet);
    $("#dynamicTweetsContainer").prepend(twtElement);
  });

  $('.tweet').css({
    'height': '180px',
    'width': '100%',
    'background-color': 'white',
    'margin': '20px auto',
    'overflow': 'hidden',
    'border-radius': '10px',
    'border': '1px solid #bec0c4'
   });

  $('.tweet header').css({
    'height': '60px',
    'background-color': '#eeeeee',
    'color': '#05214f',
    'border-bottom': '1px solid #eeeeee'
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
    'border-radius': '30%',
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
    'padding': '15px',
    'border-bottom': '1px solid #eeeeee'
  });

  $('.tweet footer').css({
    'margin': '0',
  });

  $('.tweet footer p').css({
    'margin': '0',
    'line-height': '30px',
    'font-size': '12px',
    'padding-left': '15px',
    'padding-right': '200px',
    'display': 'inline-block'
  });
}

// render tweet when mouse enters it.
function hoverEnterEffect(jTweet) {
  jTweet.css({ 'border': '2px solid grey'});

  let header = jTweet.find('header');
  header.css({'font-weight': 'bold'});
  header.css({'color': '#3c3d3f'});

  let footer = jTweet.find('footer');

  let greenFlag = $('<img>').attr("src", '/images/greenFlag.png');
  greenFlag.css({'height': '20px'});
  greenFlag.css({'display': 'inline-block'});
  greenFlag.css({'vertical-align':'middle'});

  let greenRetweet = $('<img>').attr("src", '/images/greenRetweet.png');
  greenRetweet.css({'height': '20px'});
  greenRetweet.css({'display': 'inline-block'});
  greenRetweet.css({'vertical-align': 'middle'});

  let greenHeart = $('<img>').attr("src", '/images/greenHeart.png');
  greenHeart.css({'height':'20px'});
  greenHeart.css({'display': 'inline-block'});
  greenHeart.css({'vertical-align': 'middle'});

  footer.append(greenFlag, greenRetweet, greenHeart);
}

// render tweet when mouse leaves it.
function hoverExitEffect(jTweet) {
  jTweet.css({ 'border': '1px solid #bec0c4'});

  let header = jTweet.find('header');
  header.css({'font-weight': 'normal'});
  header.css({'color': '#05214f'});

  let footer = jTweet.find('footer');
  footer.find('img').remove();
}

// converts javascript time to time passed in minutes, days or years.
function getTimePassed(time) {
  let diff = Date.now() - time;
  let tempTime = Math.round(diff/60000);
  if (tempTime < 1) return 'less than a minute ago';
  else if (tempTime < 60) return  `${tempTime} minutes ago`;
  else tempTime = Math.round(tempTime / 60);

  if (tempTime < 24) return `${tempTime} hours ago`;
  else tempTime = Math.round(tempTime/24);

  if (tempTime < 365) return `${tempTime} days ago`;
  else tempTime = Math.round(tempTime/365);

  return `${tempTime} years ago`;
}

