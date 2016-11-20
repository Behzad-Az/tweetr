$(function () {
  // action for when compose is clicked
  let newTwtBox = $('.new-tweet');
  $('.composeBtn').on('click', function(event) {

    if (newTwtBox.is(":visible")) {
      newTwtBox.slideUp(100);
    } else {
      newTwtBox.slideDown(100, function() {
        newTwtBox.find('textArea').focus();
      });
    }
  });

  // action for when delete tweet button is clicked on each tweet
  $('#dynamicTweetsContainer').on('click', '.dltTwtBtn', function(event) {
    let tweetItem = $(this).parent().parent();
    let id = tweetItem.find('header').attr('id');
    let templateVars = { 'id': id };
    $.ajax({
      type: 'POST',
      url: '/delete',
      data: templateVars,
      success: function (data) {
        tweetItem.remove();
      }
    });
  });

  // action to be implemented when like button is clicked.
  $('#dynamicTweetsContainer').on('click', '.likeTwtBtn', function(event) {
    let heart = $(this);
    let tweetItem = heart.parent().parent();
    let countTxt = tweetItem.find('.likeCountTxt');
    let id = tweetItem.find('header').attr('id');

    let count = countTxt.data('likeCount');

    if (heart.css('background-color') === 'rgb(0, 0, 255)') {
      count--;
      heart.css({'background-color': 'white'});
    } else {
      count++;
      heart.css({'background-color': 'rgb(0, 0, 255)'});
    }

    countTxt.data('likeCount', count);
    countTxt.text(`Likes: ${count}`);

    let templateVars = {
      'id': id,
      'likeCount': count
    };

    $.ajax({
      type: 'POST',
      url: '/',
      data: templateVars
    });
  });

});