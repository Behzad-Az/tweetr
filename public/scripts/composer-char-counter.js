$(document).ready( function () {
  let txtArea = $(".container .new-tweet form textarea");

  txtArea.on("input", function(event) {
    let counter = $(".container .new-tweet form .counter");
    let count = 140 - $(this).val().length;
    let color = count < 0 ? 'red' : 'black';
    counter.text(count);
    counter.css( { 'color': color } );
  });
});