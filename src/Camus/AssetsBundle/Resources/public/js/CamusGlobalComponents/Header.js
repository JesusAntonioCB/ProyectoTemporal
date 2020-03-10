import $ from 'jquery';

class Header  {
  constructor() {
    this.transitionHeader();
    this.toggleSearch();
  }

  transitionHeader() {
    var elEditions = ".container-editions",
    elToday = ".container-today",
    //elSubMenu = ".container-submenu",
    elTitleNote = ".container-title-note",
    elModalGigya = ".front-modal .container-modal",
    socialfather = $('.social-media-buttons').parent(),
    heightHeader = $(".header").height();
    $(".to-top", "#main-footer").click(function(){
      $('html, body').animate({scrollTop : 0},1000);
    });
    $(".header-link").hover(function(){
      console.log("entrada");
      $(this).find(".sub-menu").offset();
      var width= $(this).width();
      var left= $(this).position().left;
      // var width= $(this).find(".sub-menu").width();
      // var left= $(this).find(".sub-menu").offset().left;
      console.log(left + width);
      console.log(width);
      console.log(left);
      var position= left;
      $(this).find(".sub-menu").css("left",position);
      $(this).find(".sub-menu").css("top",top);
    }, function(){
      console.log("salida");
      var width= $(this).width();
      var left= $(this).position().left;
      var top= $(this).position().top;
      // var width= $(this).find(".sub-menu").width();
      // var left= $(this).find(".sub-menu").offset().left;
      console.log(left + width);
      console.log(width);
      console.log(left);
      var position= left;
      $(this).find(".sub-menu").css("left",position);
      $(this).find(".sub-menu").css("top",top);
    });
    window.addEventListener( "scroll", function( event ) {
      if($(document).scrollTop() >= heightHeader){
        $(elEditions+","+elToday+","+elTitleNote+","+elModalGigya).addClass("view-small");
        $("#share-icons, .btnPrint, .social-media-buttons").appendTo("#share-icons-container-title");
      }else{
        $(elEditions+","+elToday+","+elTitleNote+","+elModalGigya).removeClass("view-small");
        $("#share-icons, .btnPrint").appendTo("#share-icons-container");
        $("#share-icons, .btnPrint, .social-media-buttons").appendTo(socialfather);
      }
    });
  }

  toggleSearch() {
    var searchCnt = $("#search-container"),
    searchForm = searchCnt.find(".search-form"),
    searchHiddenItem = searchCnt.find(".search-hidden"),
    searchOpen = $("#search-open"),
    searchClose = $("#search-close");

    searchOpen.on("click", function() {
      searchCnt.siblings().fadeOut(400, function(){
        searchForm.addClass("search-active");
        searchHiddenItem.fadeIn();
      });
    });

    searchClose.on("click", function() {
      searchHiddenItem.fadeOut(400, function(){
        searchForm.removeClass("search-active");
        searchCnt.siblings().fadeIn();
      });
    });
  }
}

export default Header;
