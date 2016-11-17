$(document).ready( function () {
  let txtArea = $(".container .new-tweet form textarea");

  txtArea.on("input", function(event) {
    let counter = $(".container .new-tweet form .counter");
    let count = 140 - countSymbols($(this).val());
    let color = count < 0 ? 'red' : 'black';
    counter.text(count);
    counter.css( { 'color': color } );
  });
});



const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function countSymbols(string) {
  return string.replace(regexAstralSymbols, '_').length;
}
