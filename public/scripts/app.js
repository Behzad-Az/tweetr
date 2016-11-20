/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // converts javascript time to time passed in minutes, days or years.
function getTimePassed(time) {
  let diff = Date.now() - time;
  let tempTime = Math.round(diff / 60000);
  if (tempTime < 1) { return 'less than a minute ago'; }
  else if (tempTime < 60) { return  `${tempTime} minutes ago`; }
  else { tempTime = Math.round(tempTime / 60); }

  if (tempTime < 24) { return `${tempTime} hours ago`; }
  else { tempTime = Math.round(tempTime / 24); }

  if (tempTime < 365) { return `${tempTime} days ago`; }
  else { tempTime = Math.round(tempTime / 365); }

  return `${tempTime} years ago`;
}

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

  let greenFlag = $('<img>').attr("src", '/images/greenFlag.png');
  let greenRetweet = $('<img>').attr("src", '/images/greenRetweet.png');
  let greenHeart = $('<img>').attr("src", '/images/greenHeart.png');
  greenHeart.attr("class", 'likeTwtBtn');
  let greenDelete = $('<img>').attr("src", '/images/greenDelete.png');
  greenDelete.attr("class", 'dltTwtBtn');

  var $tweet = $("<article>").addClass("tweet");
  var header = $('<header>');
  header.attr('id', tweet["_id"]);
  var middle = $('<div>');
  var footer = $('<footer>');
  header.append(avatar, username, handle);
  middle.append(content);
  footer.append(date, likeCountTxt, greenFlag, greenRetweet, greenHeart, greenDelete);

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

 // submit jQuery GET request from /tweets when page is loaded
function $ajaxGETLoadTweets(){
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: 'JSON',
    success: function (data){
      renderTweets(data);
      // REPLACED WITH SCSS
      // $('.tweet').on('mouseenter', function(event) {
      //   hoverEnterEffect($(this));
      // }).on('mouseleave', function(event) {
      //   hoverExitEffect($(this));
      // });
    }
  });
}

$(function () {

  // submit jQuery POST request when form is submitted
  let $form = $(".new-tweet form");
  let $message = $("#errorMessage");
  $form.submit( function (event) {
    event.preventDefault();
    let url = $form.attr('action');
    let method = $form.attr('method');
    let txtArea = $form.find('textarea');
    let charCounter = $form.find('.counter');
    let content = txtArea.val();

    if (!content) {
      $message.css({'display': 'none'});
      $message.text('Don\'t forget to enter tweet first');
      $message.fadeIn( 400 ).delay( 2000 ).fadeOut(400);
    } else if (content.length > 140) {
      $message.css({'display': 'none'});
      $message.text('Tweet charecter limit exceeded');
      $message.fadeIn( 400 ).delay( 2000 ).fadeOut(400);
    } else {
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

// render tweet when mouse enters it. REPLACED WITH SCSS.
// function vagrant EnterEffect(jTweet) {
//   let header = jTweet.find('header');
//   let footer = jTweet.find('footer');

//   let greenFlag = $('<img>').attr("src", '/images/greenFlag.png');
//   let greenRetweet = $('<img>').attr("src", '/images/greenRetweet.png');
//   let greenHeart = $('<img>').attr("src", '/images/greenHeart.png');
//   greenHeart.attr("class", 'likeTwtBtn');
//   let greenDelete = $('<img>').attr("src", '/images/greenDelete.png');
//   greenDelete.attr("class", 'dltTwtBtn');

//   footer.append(greenFlag, greenRetweet, greenHeart, greenDelete);
// }

// render tweet when mouse leaves it. REPLACED WITH SCSS.
// function hoverExitEffect(jTweet) {
//   // let footer = jTweet.find('footer');
//   //footer.find('img').remove();
// }

