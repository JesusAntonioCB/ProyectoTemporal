import React from 'react';
import $ from "jquery";
import slick from "slick-carousel";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.addSlick();
  }

  addSlick(){
    var slickFatherContainer = this.props;
    var arrowLeft = slickFatherContainer.getElementsByClassName("left");
    var arrowRight = slickFatherContainer.getElementsByClassName("right");
    var slickElement = slickFatherContainer.querySelectorAll(".firms, .thin-data, .gallery-container");

    var slickFatherClass = slickFatherContainer.classList;
    /* Slider types.
    - sli-base
    - sli-opening
    - sli-large
    - sli-opinion
    - sli-thin
    - sli-modal
    */

    // Media Queries
    var oneColumn    = 618,
    twoColumn    = 938,
    threeColumn  = 1574;
    var that = this;
    $.each(slickFatherClass, function(index, value) {
      switch(value) {
        case "sli-large":
        $(slickElement).slick({
          infinite: true,
          slidesToShow: 1,
          variableWidth: true,
          lazyLoad: 'ondemand',
          centerMode: true,
          responsive: [
            {
              breakpoint: oneColumn,
              settings: {
                centerMode: false,
                centerPadding: '0%',
              }
            }
          ],
          prevArrow: arrowLeft,
          nextArrow: arrowRight,
          dots: true
        });
        $(slickElement).on('beforeChange', function(event, slick, currentSlide, nextSlide){
          var pictureEl = $(slickElement).find(".slick-slide").find("picture");
          var listImg = pictureEl.find("img");
          $(listImg).each(function(key,value){
            var srcImg = $(value).attr("src");
            var srcImgCorrect = "";$(value).prev().attr("data-srcset");
            if(window.innerWidth >= 648){
              srcImgCorrect = $(value).prev().attr("data-srcset");
            }else{
              srcImgCorrect = $(value).prev().prev().attr("data-srcset");
            }
            var indexLogoDefault = srcImg.indexOf("placeholder.jpg");
            if(indexLogoDefault >= 0){
              $(value).attr("data-src",srcImgCorrect);
              $(value).attr("data-lazy",srcImgCorrect);
            }else{
              $(value).attr("src",srcImgCorrect);
            }
          });
        });
        break;
        case "sli-opinion":
        var params = {
          infinite: true,
          slidesToShow: 7,
          slidesToScroll: 1,
          variableWidth: true,
          swipeToSlide: true,
          prevArrow: arrowLeft,
          nextArrow: arrowRight,
          dots: true
        },
        firms = $(slickElement).children();
        firms.first().addClass("first-firm");
        if(firms.length <= 7){
          params.responsive = [
            {
              breakpoint: threeColumn,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: twoColumn,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: oneColumn,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ];
        }
        $(slickElement).slick(params);
        break;
        case "sli-base":
        case "sli-base-left-title":
        var params = {
          lazyLoad: 'ondemand',
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide: true,
          variableWidth: true,
          prevArrow: arrowLeft,
          nextArrow: arrowRight,
          dots: true
        },
        items = $(slickElement).children();
        if(items.length <= 4){
          params.responsive = [
            {
              breakpoint: threeColumn,
              settings: {
                infinite: true,
                slidesToShow: 3
              }
            },
            {
              breakpoint: twoColumn,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: oneColumn,
              settings: {
                slidesToShow: 1
              }
            }
          ];
        }
        $(slickElement).slick(params);
        break;
        case "sli-left-title-sortable":
        var params = {
          variableWidth: true,
          infinite: true,
          lazyLoad: 'ondemand',
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide: true,
          prevArrow: arrowLeft,
          nextArrow: arrowRight,
          dots: true
        },
        firms = $(slickElement).children();
        if(firms.length <= 4){
          params.responsive = [
            {
              breakpoint: threeColumn,
              settings: {
                infinite: true,
                slidesToShow: 3
              }
            },
            {
              breakpoint: twoColumn,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: oneColumn,
              settings: {
                slidesToShow: 1
              }
            }
          ];
        }
        $(slickElement).slick(params);
        break;
        case "sli-thin-authors":
        case "sli-thin-themes":
        case "sli-thin-programs":
        $(slickElement).slick({
          variableWidth: true,
          infinite: true,
          slidesToShow: 5,
          swipeToSlide: true,
          prevArrow: arrowLeft,
          nextArrow: arrowRight,
          dots: false
        });
        break;
        case "sli-thin-matches":
        $(slickElement).slick({
          variableWidth: true,
          infinite: true,
          slidesToShow: 3,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: twoColumn,
              settings: {
                slidesToShow: 5,
                arrows: false
              }
            }
          ],
          prevArrow: arrowLeft,
          nextArrow: arrowRight,
          dots: false
        });
        break;
        case "sli-thin-clubs":
        $(slickElement).slick({
          variableWidth: true,
          infinite: true,
          slidesToShow: 18,
          swipeToSlide: true,
          arrows: false,
          responsive: [
            {
              breakpoint: twoColumn,
              settings: {
                slidesToShow: 12
              }
            },
            {
              breakpoint: oneColumn,
              settings: {
                slidesToShow: 5
              }
            }
          ],
          dots: false
        });
        break;
        case "sli-opening":
        $(slickElement).slick({
          infinite: true,
          slidesToShow: 1,
          swipeToSlide: true,
          prevArrow: arrowLeft,
          nextArrow: arrowRight,
          responsive: [
            {
              breakpoint: oneColumn,
              settings: {
                infinite: true,
                slidesToShow: 2,
                variableWidth: true,
              }
            },
            {
              breakpoint: twoColumn,
              settings: {
                infinite: true,
                slidesToShow: 2,
                variableWidth: true,
              }
            }
          ],
        });
        var url = window.location.href;
        var splitedUrl = url.split("?image=");
        var index = 0;
        var flag = false;
        if (splitedUrl.length > 1) {
          $(slickElement).slick('slickGoTo', splitedUrl[1]-1);
        }
        $(slickElement).on('afterChange', function(event, slick, currentSlide, nextSlide){
         if(currentSlide !== index || flag){
             flag = true;
             var currentSlide = $(slickElement).slick('slickCurrentSlide');
             // $('.img-index').text(currentSlide+1);
             var imgItem = $(this).find(".slick-current").text();
             $('.img-detail').text(imgItem);
             // ga('gtm1.send', { 'hitType': 'pageview', 'page': location.pathname+"?image="+(currentSlide+1) });
             // window.history.replaceState({}, imgItem, '?image='+(currentSlide+1));
             // window.pSUPERFLY.virtualPage({
             //   path: window.location.protocol+'//'+window.location.host+window.location.pathname+'#'+(currentSlide+1)
             // });
             // dataLayer.push({
             //   "varPage": (currentSlide+1)
             // });
             //udm_(comscoreUrl+comscoreSection+'.'+comscorePath+'.'+(currentSlide+1));
             var socialSpan = $(slickElement).parent().find("[data-social-link]")[0];
             var oldLink = $(socialSpan).attr('data-social-link');
             var splitedLink = oldLink.split("?image=");
             if (splitedLink.length > 1) {
               splitedLink[1] = currentSlide+1;
               oldLink  = splitedLink.join("?image=");
             }
             else{
               splitedLink[1] = currentSlide+1;
               oldLink  = splitedLink.join("?image=");
             }
             $(socialSpan).attr('data-social-link', oldLink);
             var newImage = $(this).find('.slick-current').find('img').attr('src');
             $(socialSpan).attr('data-social-picture', newImage);
             $("body").trigger("slick-opening-change", {target: that.props});
           }
        });
        break;
        case "sli-modal":
        var startSlider= $(slickElement).find(".item-start").index();
        if (startSlider<0) {
          startSlider=0;
        }
        console.log(startSlider);
        $(slickElement).slick({
          infinite: true,
          initialSlide: startSlider,
          slidesToShow: 1,
          swipeToSlide: true,
          prevArrow: arrowLeft,
          nextArrow: arrowRight,
          asNavFor: '.child-sli'
        });
        var url = window.location.href;
        var splitedUrl = url.split("?image=");
        var index = 0;
        var flag = false;
        // $("body, html").css({"height":"100%","overflow":"hidden"});
        var header= $(slickElement).parent().parent().find(".header-cartoon");
        header.find(".btn-buy").click(function(){
          $(this).addClass("hide");
          $(".modal-left-menu, .modal-carruseles-container").toggleClass("menu-active");
          $(slickElement).slick('refresh');
          $(slickElement).slick('slickPause');
        });
        $(".modal-left-menu").find(".left-menu-header").find(".left-menu-close").click(function(){
          header.find(".btn-buy").removeClass("hide");
          $(".modal-left-menu, .modal-carruseles-container").toggleClass("menu-active");
          $(slickElement).slick('refresh');
          $(slickElement).slick('slickPause');
        });
        header.find(".btn-return").click(function(){
          $("body, html").removeAttr('style');
          $(".modal").toggleClass("hide");
        });
        header.find(".btn-share").click(function(){
          $(".social-networks-share").css("display", "table");
        });
        if (splitedUrl.length > 1) {
          $(slickElement).slick('slickGoTo', splitedUrl[1]-1);
        }
        $(slickElement).on('afterChange', function(event, slick, currentSlide, nextSlide){
         if(currentSlide !== index || flag){
             flag = true;
             var currentSlide = $(slickElement).slick('slickCurrentSlide');
             // $('.img-index').text(currentSlide+1);
             var imgItem = $(this).find(".slick-current").text();
             $('.img-detail').text(imgItem);
             // ga('gtm1.send', { 'hitType': 'pageview', 'page': location.pathname+"?image="+(currentSlide+1) });
             // window.history.replaceState({}, imgItem, '?image='+(currentSlide+1));
             // window.pSUPERFLY.virtualPage({
             //   path: window.location.protocol+'//'+window.location.host+window.location.pathname+'#'+(currentSlide+1)
             // });
             // dataLayer.push({
             //   "varPage": (currentSlide+1)
             // });
             //udm_(comscoreUrl+comscoreSection+'.'+comscorePath+'.'+(currentSlide+1));

             var socialSpan = $(slickElement).parent().parent().parent().parent().find("[data-social-link]")[0];
             var oldLink = $(socialSpan).attr('data-social-link');
             var splitedLink = oldLink.split("?image=");
             if (splitedLink.length > 1) {
               splitedLink[1] = currentSlide+1;
               oldLink  = splitedLink.join("?image=");
             }
             else{
               splitedLink[1] = currentSlide+1;
               oldLink  = splitedLink.join("?image=");
             }
             $(socialSpan).attr('data-social-link', oldLink);
             var newImage = $(this).find('.slick-current').find('img').attr('src');
             $(socialSpan).attr('data-social-picture', newImage);
             $("body").trigger("slick-opening-change", {target: that.props});
           }
        });
        break;
        case "sli-child":
        var startSlider= $(slickElement).find(".item-start").index();
        if (startSlider<0) {
          startSlider=0;
        }
        $(slickElement).slick({
          infinite: true,
          initialSlide: startSlider,
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          focusOnSelect: true,
          variableWidth: true,
          prevArrow: arrowLeft,
          nextArrow: arrowRight,
          asNavFor: '.father-sli',
        });
        // $("body, html").css({"height":"100%","overflow":"hidden"});
        var detailC= $(slickElement).parent().parent().find(".detail-container");
        detailC.find(".hide-slider").click(function(){
          $(slickElement).parent().slideToggle(500);
          var fatherSli= $(slickElement).parent().parent().parent().parent().find(".sli-modal");
          fatherSli.find(".gallery-container").toggleClass("child-Hide");
        });
        detailC.find(".auto-start").click(function(){
          $(this).toggleClass("start");
          $(this).find(".text-container").find(".fa").toggleClass("fa-play").toggleClass("fa-pause");
          var fatherSli= $(slickElement).parent().parent().parent().parent().find(".sli-modal");
          console.log($(this).hasClass("start"));
          if ($(this).hasClass("start")) {
            fatherSli.find(".slick-initialized").slick('slickPlay');
          }else {
            fatherSli.find(".slick-initialized").slick('slickPause');
          }
        });
        break;
        case "sli-videos":
        $(slickElement).slick({
          infinite: true,
          slidesToShow: 1,
          lazyLoad: 'ondemand',
          swipeToSlide: true,
          centerMode: true,
          centerPadding: '20%',
          responsive: [
            {
              breakpoint: threeColumn,
              settings: 'unslick'
            },
            {
              breakpoint: twoColumn,
              settings: 'unslick'
            },
            {
              breakpoint: oneColumn,
              settings: {
                infinite: true,
                lazyLoad: 'ondemand',
                dots: true,
                arrows: false
              }
            }
          ],
          arrows: false,
          dots: true
        })
        default:
        break;
      }
      that.layoutDots(slickElement);
      $(window).resize(function(){
        var module = $(slickElement).parent().parent();
        if($(module).attr("class") == "sli-large"){
          if(module.find(".slick-dots").hasClass("personalizado") == false){
            that.layoutDots(slickElement);
          }
        }
      });
    });
  }

  removeSlick(){
    var slickFatherContainer = this.props;
    var slickElement = slickFatherContainer.querySelectorAll(".firms, .thin-data, .gallery-container");

    $(slickElement).slick('unslick');
  }

  layoutDots(slickElement){
    var contenedorTop = $(slickElement),
    lengthFotos = $(slickElement).slick('getSlick').slideCount - 1,
    limiteDots = 5,
    segmento = 1,
    arraySegmento = {};
    if(lengthFotos > 5){
      contenedorTop.find('.slick-dots').addClass('personalizado');
      contenedorTop.each(function(i, v) {
        var dots = $(this).find(".slick-dots li");
        dots.first().addClass("personalizado");
        dots.filter(function() {
          return $(this).index() > 4;
        }).hide();
      });

      for (var j=1; j <= lengthFotos; j++) {
        if(j === 1){
          arraySegmento[segmento] = [];
          arraySegmento[segmento].push(j);
        } else {
          var nPos = j * (limiteDots/lengthFotos);
          if(nPos < 1) {
            segmento = 2;
            if(typeof arraySegmento[segmento] !== 'undefined'){
              arraySegmento[segmento].push(j);
            } else {
              arraySegmento[segmento] = [];
              arraySegmento[segmento].push(j);
            }
          } else if(nPos >= (limiteDots)) {
            segmento = limiteDots;
            if(typeof arraySegmento[segmento] !== 'undefined'){
              arraySegmento[segmento].push(j);
            } else {
              arraySegmento[segmento] = [];
              arraySegmento[segmento].push(j);
            }
          } else {
            segmento = parseInt(nPos) + 1;
            if(typeof arraySegmento[segmento] !== 'undefined'){
              arraySegmento[segmento].push(j);
            } else {
              arraySegmento[segmento] = [];
              arraySegmento[segmento].push(j);
            }
          }
        }
      }

      contenedorTop.on("afterChange", function(){
        var indiceSlick = $(this).slick("slickCurrentSlide");
        $.each(arraySegmento,function(key,value){
          $.each(value,function(indice,valueIndice){
            if(indiceSlick == valueIndice){
              contenedorTop.find(".slick-dots li").removeAttr("class");
              contenedorTop.find(".slick-dots li:nth-child("+key+")").attr("class","slick-active personalizado");
              return false;
            } else if(indiceSlick == 0) {
              contenedorTop.find(".slick-dots li").first().attr("class","slick-active personalizado");
              return false;
            }
          });
        });
      });

      contenedorTop.find('.slick-dots li').unbind();
      contenedorTop.find('.slick-dots li').on("click",function(){
        var indiceButton = $(this).index() + 1;
        contenedorTop.slick("slickGoTo", arraySegmento[indiceButton][0]);
        contenedorTop.find(".slick-dots li").removeAttr("class");
        contenedorTop.find(".slick-dots li:nth-child("+indiceButton+")").attr("class","slick-active personalizado");
      });
    }
  }
}

export default Slider;
