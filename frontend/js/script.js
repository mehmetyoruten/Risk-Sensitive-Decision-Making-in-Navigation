/*
================================================================================
jQuery Flow
================================================================================
*/

$(document).ready(function(){
    $("#welcome__button").click(function() {
      $(".welcome").slideUp();
      $(".consent").slideDown()
  });

  $("#consent__button__agree").click(function() {
    $(".consent").slideUp();
    $(".grids").slideDown()
    });

  $(".square").click(function() {
    $(this).addClass('active')
  })

  $(".square .active").click(function() {
    $(this).removeClass('.square .active')
  })
});



