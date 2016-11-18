$(function () {
  // action for when compose is clicked
  let newTwtBox = $('.new-tweet');
  $('.composeBtn').on('click', function(event) {

    if (newTwtBox.is(":visible")) {
      newTwtBox.slideUp(100);
    }
    else {
      newTwtBox.slideDown(100,function(){
        newTwtBox.find('textArea').focus();
      });
    }
  });

  // action for when delete tweet button is clicked on each tweet
  $('#dynamicTweetsContainer').on('click', '.dltTwtBtn', function(event) {
    let tweetItem = $(this).parent().parent();
    let id = tweetItem.find('header').attr('id');
    let templateVars = { 'id': id }
    $.ajax({
        type: 'POST',
        url: '/delete',
        data: templateVars,
        success: function (data) {
          tweetItem.remove();
        }
      });
  });
});