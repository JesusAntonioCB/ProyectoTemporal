import $ from "$";

$(document).ready(function(){
  $(".toggle-gray").slideUp();
  $( ".toggle-state, .toggle-resume" ).on('click', function() {
    $(".toggle-gray").slideToggle();
  });
});
