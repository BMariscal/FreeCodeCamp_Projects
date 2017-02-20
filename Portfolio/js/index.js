  $(document).ready(function() {
    $(".top").fadeIn(4000);  
  });


$(window).scroll(function(){
    $(".top").css("opacity", 5 - $(window).scrollTop() / 250);
  });
/* Demo purposes only */	
$("figure").mouseleave(
  function () {
    $(this).removeClass("hover");
  }
);
function changeHeight() {
  var windowHeight = $(window).height();
  var footerHeight = $("footer").height();
  $(".page-holder").css({
    "padding-bottom": footerHeight,
    "min-height": windowHeight
  });
}
window.addEventListener('resize', changeHeight);
changeHeight();