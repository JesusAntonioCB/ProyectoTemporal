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
