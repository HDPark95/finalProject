  $(document).ready(function(){
    $('#tab-2').click(function(){
      $(".login-html").css("height","770px")
   });
   $('#tab-1').click(function(){
      $(".login-html").css("height","510px")
   });
   $('.search-button').click(function(){
  $(this).parent().toggleClass('open');
});
});