$(document).ready( function () {
  // let x;
  //   $("#dynamicTweetsContainer").on('mouseenter','article', function(event) {
  //     hoverEnterEffect($(this));
  //     x = $(this);
  //   }).on('mouseleave', function(event) {
  //     hoverExitEffect(x);
  //   });

});

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