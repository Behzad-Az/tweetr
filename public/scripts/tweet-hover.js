$(document).ready( function () {


  let tweet = ("#tweetLog");

  $("#tweetLog").mouseover( function(event) {
    console.log("hovering...");
    $("#tweetLog").css({ 'background-color': 'red'});
  });

  $("#tweetLog").mouseout ( function(event) {
    console.log("hovering...");
    $("#tweetLog").css({ 'background-color': 'blue'});
  });



});