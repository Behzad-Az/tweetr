$(function () {
  let newTwtBox = $('.new-tweet');

  $('.composeBtn').on('click', function(event) {


    // newTwtBox.toggle(

    //   // function(){
    //   //   console.log('hiding')
    //   //   $(this).animate({
    //   //     width:["toggle", "swing"],
    //   //     height:["toggle", "swing"],
    //   //     opacity: "toggle"
    //   //   },500,"linear");

    //   // },
    //   function(){
    //     console.log("showing")
    //     $(this).animate({
    //        //width:["toggle", "swing"],
    //       // height:["toggle"],
    //       //opacity: "toggle"
    //     },500);
    //   }
    // );



    // newTwtBox.toggle(
    //   function(){
    //       console.log('Here')
    //       newTwtBox.animate({
    //           //height: "150",
    //           //padding:"20px 0",
    //           // backgroundColor:'#000000',
    //           // opacity:.8
    //       }, 500);
    //   },
    //   function(){
    //       newTwtBox.animate({
    //           height: ["toggle"],
    //           //padding:"0px 0",
    //           opacity:1
    //       }, 500);
    //   });



    if (newTwtBox.is(":visible")) {
      newTwtBox.slideUp(100);
    }
    else {
      newTwtBox.slideDown(100,function(){
        newTwtBox.find('textArea').focus();

      });

    }


  });



});



