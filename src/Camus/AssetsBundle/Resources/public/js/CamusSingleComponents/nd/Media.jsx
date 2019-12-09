import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import load from 'load-script';
import slick from "slick-carousel";
import FloatPlayer from './../../CamusGlobalComponents/FloatPlayer.jsx';
//import ModuleShareButtons from "./../../CamusGlobalComponents/ModuleShareButtons.jsx";

class Media extends React.Component {
  constructor(props) {
    super(props);
    this.shuffle();
  }

  shuffle(){
    var oThis = this;
    $.each(this.props.classList, function(index, value) {
      switch (value) {
        case "nd-md-base":
          oThis.mdInit();
          break;
        case "nd-sd-media":
          oThis.sdInit();
          break;
        default:
          break;
      }
    });
  }

  mdInit(){
    var oThis = $(this.props),
    that = this,
    sliderContainer = oThis.find(".carousel"),
    arrowLeft = sliderContainer.parent().parent().find(".left"),
    arrowRight = sliderContainer.parent().parent().find(".right"),
    titleContainer = oThis.find(".text"),
    sliderCount = oThis.find(".currentSlide");

    // var gallery = $("<div />", {
    //   id: 'gallery-modal',
    //   class: 'hideIt'
    // });
    // var galleryContent = $("<div />", {
    //   class: 'gallery-modal-content'
    // });
    // var closeGallery = $("<span />", {
    //   class: 'close-gallery'
    // });
    // var iconClose = $("<span />", {
    //   class: 'fa fa-times'
    // });
    // var galleryCounter = $("<div />", {
    //   class: "count-gallery",
    //   text: "Galeria "
    // });
    // var galleryCount =  $("<span />", {
    //   class: "currentCount"
    // });
    // $(".contenedor-detail-block").append(gallery);
    // gallery.append(galleryContent, closeGallery);
    // closeGallery.append(iconClose);
    //
    // closeGallery.click(function(){
    //   gallery.addClass('hideIt');
    //   that.enableScroll();
    // })
    // sliderContainer.clone().appendTo(galleryContent);
    // galleryContent.append(galleryCounter);
    // galleryCounter.append(galleryCount);
    // galleryContent.find(".social-media, .social-media-large").each(function(){
    //   var socialUrl = $(this).siblings("span[data-social-link]");
    //   if(socialUrl.length){
    //     var socialTitle = $(socialUrl[0]).attr('data-social-title');
    //     socialUrl = $(socialUrl[0]).attr('data-social-link');
    //     ReactDOM.render(<ModuleShareButtons url={socialUrl}  title={socialTitle} parent={this.className} />, this);
    //   }
    // });
    // galleryContent.find(".carousel").addClass('.slider-for');

    sliderContainer.slick({
      infinite: true,
      slidesToShow: 1,
      lazyLoad: 'ondemand',
      prevArrow: arrowLeft,
      nextArrow: arrowRight,
      adaptiveHeight: true
      //asNavFor: galleryContent.find('.carousel')
    });

    // galleryContent.find('.carousel').slick({
    //   infinite: true,
    //   slidesToShow: 1,
    //   lazyLoad: 'ondemand',
    //   nextArrow: '<span class="next"><i class="fa fa-chevron-right"></i></span>',
    //   prevArrow: '<span class="prev"><i class="fa fa-chevron-left"></i></span>',
    //   adaptiveHeight: true,
    //   asNavFor: sliderContainer
    // });
    // var slickInfo = $(sliderContainer).slick("getSlick");
    // galleryCount.text((slickInfo.currentSlide+1) + ' / '+ (slickInfo.slideCount));

    $(sliderContainer).on('afterChange', function(event, slick, currentSlide, nextSlide){
      var videoItem = $(".video-item");
      if(videoItem.length){
        videoItem.each(function() {
            if($(this).hasClass("video-js")){
              var videoId = $(this)[0].id;
              videojs(videoId).ready(function(){
                var myPlayer = this;
                myPlayer.pause();
              });
            } else {
              $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
            }
        });
      }

      $('.currentSlide').text(slick.currentSlide+1);
      var counterString = slick.currentSlide+1;
      var slash = ' / '+slick.slideCount;
      counterString = counterString + slash;
      //galleryCount.text(counterString);
    });

    //
    // $(sliderContainer).find('.slide img, .slide iframe').click(function(){
    //   gallery.removeClass('hideIt');
    //   that.disableScroll();
    // });

    load("//players.brightcove.net/57828478001/SyoL14kBx_default/index.min.js", function (err, script) {});

    new FloatPlayer(oThis, ".slick-active", "slick");
  }

  sdInit(){
    var oThis = $(this.props),
    btnPlay = oThis.find(".btn-play");

    if(btnPlay.length) {
      var imgContainer = btnPlay.parent(),
      playerContainer = imgContainer.parent().find(".player-live");

      $(btnPlay).click(function() {
        var provider = $(this).attr("data-provider"),
        reference = $(this).attr("data-reference");

        if(provider.search("youtube") != -1){
          var playerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+reference+'?autoplay=1" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
        } else if(provider.search("brigthcove") != -1) {
          var videoId = "player" + reference,
          playerHTML = '<video id=\"'+videoId+'\" data-account="57828478001" data-player="SyoL14kBx" data-embed="default" data-video-id="'+reference+'" width="100%" height="100%" class="video-js" controls></video>';
        }

        imgContainer.toggle(),
        playerContainer.append(playerHTML),
        playerContainer.toggle();

        load("//players.brightcove.net/57828478001/SyoL14kBx_default/index.min.js", function (err, script) {
          var myPlayer = videojs(videoId);
          myPlayer.play();
          // videojs(videoId).ready(function(){
          //   var myPlayer = this;
          //   myPlayer.play();
          //   myPlayer.on("playing", function(){
          //     myPlayer.play();
          //   });
          // });
        });
      });
    }
  }


  // preventDefault(e){
  //   e = e || window.event;
  //   if (e.preventDefault)
  //       e.preventDefault();
  //   e.returnValue = false;
  // }
  //
  // preventDefaultForScrollKeys(e){
  //   var keys = {37: 1, 38: 1, 39: 1, 40: 1};
  //   if (keys[e.keyCode]) {
  //     preventDefault(e);
  //     return false;
  //   }
  // }
  //
  // disableScroll(){
  //   if (window.addEventListener) // older FF
  //       window.addEventListener('DOMMouseScroll', this.preventDefault, false);
  //   window.onwheel = this.preventDefault; // modern standard
  //   window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
  //   window.ontouchmove  = this.preventDefault; // mobile
  //   document.onkeydown  = this.preventDefaultForScrollKeys;
  // }
  //
  // enableScroll(){
  //   if (window.removeEventListener)
  //     window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
  //   window.onmousewheel = document.onmousewheel = null;
  //   window.onwheel = null;
  //   window.ontouchmove = null;
  //   document.onkeydown = null;
  // }
}

export default Media;
