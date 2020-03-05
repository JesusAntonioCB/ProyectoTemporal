import $ from 'jquery';

class Menu {
  constructor(){
    this.initSlidebars();
    this.openSections();
  }

  initSlidebars(){
    var menuIcon = $(".container-hamburguer, .container-left-mobile", "#main-header"),
    menu = $("#menu"),
    menuMobile = $("#sidebar"),
    closeIcon = $(".close", "#social-login"),
    headerNBody = $("#main-header, .body-content"),
    activeSidebarClass = "active-sidebar",
    windowWidth = 719;

    window.addEventListener("resize", function(event) {
      if(this.innerWidth > windowWidth && menuMobile.is(":visible")) {
        menuMobile.hide();
        headerNBody.removeClass(activeSidebarClass);
        menuIcon.toggleClass("act");
        menu.show();
      } else if(this.innerWidth <= windowWidth && menu.is(":visible")) {
        menuMobile.show();
        headerNBody.addClass(activeSidebarClass);
        menu.hide();
        menuIcon.toggleClass("act");
      }
    });

    menuIcon.on( 'click', function ( event ) {
      menuMobile.toggle();
      headerNBody.toggleClass(activeSidebarClass);
      // if(window.innerWidth <= windowWidth) {
      //   menuMobile.toggle();
      //   headerNBody.toggleClass(activeSidebarClass);
      // } else {
      //   menu.toggle();
      //   $(this).toggleClass("act");
      //   if(!$(this).hasClass('act')){
      //     $(".contenedor-notas-block").bind('touchmove', function(e){e.preventDefault()});
      //   }
      // }
    });

    $('.body-content', 'body').on('touchmove', function(e) {
      if($(this).hasClass("active-sidebar")) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });

    closeIcon.on("click", function() {
      menuMobile.toggle();
      headerNBody.toggleClass(activeSidebarClass);
    });
  }

  openSections() {
    $(".item .father", "#menu-mobile").on("click", function() {
      this.classList.toggle("active");

      var childList = this.nextElementSibling;

      if(childList !== null) {
        var chevronIcon = this.lastElementChild.classList,
        chevronClassName = chevronIcon.item(1);
        if (this.classList.contains("active")){
          chevronIcon.remove(chevronClassName);
          chevronIcon.add("fa-chevron-down");
          childList.style.maxHeight = childList.scrollHeight + "px";
        } else {
          chevronIcon.remove(chevronClassName);
          chevronIcon.add("fa-chevron-right");
          childList.removeAttribute("style");
        }
      }
    });
  }
}

export default Menu;
