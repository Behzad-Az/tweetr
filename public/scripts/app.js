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
    let txtArea = $form.find('textarea');
    let charCounter = $form.find('.counter');
    let content = txtArea.val();

    if (!content) { alert('Don\'t forget to enter tweet first!'); }
    else if (content.length > 140) { alert('Please shorten your tweet to less than or equal to 140 chars'); }
    else {
      $.ajax({
        type: method,
        url: url,
        data: $form.serialize(),
        success: function (data) {
          txtArea.val('');
          charCounter.text('140');
        }
      }).done(function(){
        $ajaxGETLoadTweets();
      });
    }
  });

  $ajaxGETLoadTweets();

});

// create html element of each tweet object
function createTweetElement (tweet) {
  let avatar = $('<img>').attr("src", tweet['user']['avatars']['regular']);
  let username = $('<h2>').text(tweet['user']['name']);
  let handle = $('<p>').text(tweet['user']['handle']);
  let content = $('<p>').text(tweet['content']['text']);
  let date = $('<p>').text(getTimePassed(tweet['created_at']));
  let likeCount = Number(tweet['likeCount']);

  if (!likeCount) { likeCount = 0; }
  let likeCountTxt = $('<p>').text(`Likes ${likeCount}`);
  likeCountTxt.attr("class", 'likeCountTxt');
  likeCountTxt.data('likeCount', likeCount);

  var $tweet = $("<article>").addClass("tweet");
  var header = $('<header>');
  header.attr('id', tweet["_id"]);
  var middle = $('<div>');
  var footer = $('<footer>');
  header.append(avatar, username, handle);
  middle.append(content);
  footer.append(date, likeCountTxt);

  $tweet.append(header, middle, footer);
  return $tweet;
}

// render the tweet objects.
function renderTweets (tweets) {
  $('#dynamicTweetsContainer').empty();
  tweets.forEach((tweet) => {
    twtElement = createTweetElement(tweet);
    $("#dynamicTweetsContainer").prepend(twtElement);
  });
}

// render tweet when mouse enters it.
function hoverEnterEffect(jTweet) {
  let header = jTweet.find('header');
  let footer = jTweet.find('footer');

  let greenFlag = $('<img>').attr("src", '/images/greenFlag.png');
  let greenRetweet = $('<img>').attr("src", '/images/greenRetweet.png');
  let greenHeart = $('<img>').attr("src", '/images/greenHeart.png');
  greenHeart.attr("class", 'likeTwtBtn');
  let greenDelete = $('<img>').attr("src", '/images/greenDelete.png');
  greenDelete.attr("class", 'dltTwtBtn');

  footer.append(greenFlag, greenRetweet, greenHeart, greenDelete);
}

// render tweet when mouse leaves it.
function hoverExitEffect(jTweet) {
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

// submit jQuery GET request from /tweets when page is loaded
function $ajaxGETLoadTweets(){
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: 'JSON',
    success: function (data){
      renderTweets(data);
      $('.tweet').on('mouseenter', function(event) {
        hoverEnterEffect($(this));
      }).on('mouseleave', function(event) {
        hoverExitEffect($(this));
      });
    }
  });
}

