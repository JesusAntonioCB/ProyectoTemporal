import React from 'react';
import $ from "jquery";
import load from 'load-script';
import FloatPlayer from './../../CamusGlobalComponents/FloatPlayer.jsx';

class Extraordinary extends React.Component {
  constructor(props) {
    super(props);
    this.addContrastColor();
    this.addClickPlayer();
  }

  addClickPlayer(){
    var oThis = $(this.props);
    var oThisSelf = this;

    var containerPlay = oThis.find(".description-btn-container"),
    containerTv = oThis.find(".holder-container");
    if(containerPlay.length){
      var containerParent = containerPlay.parent(),
      providerContainer = containerPlay.find("button");

      providerContainer.click(function(){
        var provider = $(this).attr("data-provider"),
        reference = $(this).attr("data-reference");

        if(provider.search("youtube") != -1){
          var ytVid = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+reference+'?autoplay=1&enablejsapi=1" enablejsapi="1" video-id="'+reference+'" class="camus-youtube" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
          containerParent.css("z-index", "3").html(ytVid);
        }else if (provider.search("brigthcove") != -1){
          var containerVideoBrightcove = oThis.find(".player-live");
          var videoId = "player" + reference;
          var playerHTML = '<video id=\"'+videoId+'\" data-account="57828478001" data-player="SyoL14kBx" data-embed="default" data-video-id="'+reference+'" width="100%" height="100%" class="video-js" controls></video>';
          oThisSelf.restoreAllVideos();
          containerParent.toggle();
          containerVideoBrightcove.toggle();
          containerVideoBrightcove.append(playerHTML);
          load("//players.brightcove.net/57828478001/SyoL14kBx_default/index.min.js", function (err, script) {
            var myPlayer = videojs(videoId);
            myPlayer.play();
            videojs(videoId).play();
            videojs(videoId).on("ready",function(){
              videojs(videoId).play();
              videojs(videoId).on('ended',function(){
                containerParent.toggle();
                containerVideoBrightcove.toggle();
                containerVideoBrightcove.empty();
                videojs(videoId).dispose();
              });
            });
          });
        }
        else {
          return false
        }
      });
    } else if(containerTv.length){
      //if(containerTv.attr('preload')){
        var provider = containerTv.attr("data-provider"),
        reference = containerTv.attr("data-reference");

        if(provider.search("youtube") != -1){
          var ytVid = '<div class="float-container"><div class="camus-youtube video-item" video-id="'+reference+'"></div><button class="btn-remove-floated"><i class="fa fa-times"></i></button></div>';
          containerTv.html(ytVid);
        } else if(provider.search("brigthcove") != -1) {
          var bcVid = '<div class="float-container"><video id="playerLiveVideo" class="video-js video-item" data-account="57828478001" data-player="SyoL14kBx" data-embed="default" data-video-id="'+reference+'" width="100%" height="100%" controls></video><button class="btn-remove-floated"><i class="fa fa-times"></i></button></div>';
          containerTv.html(bcVid);
          var isDisplayHidde = false;
          load("//players.brightcove.net/57828478001/SyoL14kBx_default/index.min.js", function (err, script) {
            videojs('playerLiveVideo').ready(function(){
             var myPlayer = this;
             myPlayer.on("playing", function(){
               myPlayer.play();
             });
           });
          });

          var config = { attributes: true, childList: true, subtree: true };
          var observer = new MutationObserver(function(mutationsList) {
            for(var mutation of mutationsList) {
              if (mutation.type == 'attributes') {
                $("body").trigger("slick-opening-change", {target: oThis});
                return false;
              }
            }
          });

          observer.observe($(oThis).find(".social-networks-share").find("[data-social-link]")[0], config);
        } else {
          return false;
        }

        new FloatPlayer(oThis, ".float-container");

      // } else {
      //   containerTv.click(function(){
      //     var provider = $(this).attr("data-provider"),
      //     reference = $(this).attr("data-reference");
      //
      //     if(provider.search("youtube") != -1){
      //       var ytVid = '<div class="camus-youtube" video-id="'+reference+'"></div>';
      //       $(this).replaceWith(ytVid);
      //     } else if(provider.search("brigthcove") != -1) {
      //       var bcVid = '<div class="player-live">'+
      //       '<video id="playerLiveVideo" data-account="57828478001" data-player="SyoL14kBx" data-embed="default" data-video-id="'+reference+'" width="100%" height="100%" class="video-js" controls></video>'+
      //       '</div>';
      //       $(this).replaceWith(bcVid);
      //       load("//players.brightcove.net/57828478001/SyoL14kBx_default/index.min.js", function (err, script) {
      //         videojs('playerLiveVideo').ready(function(){
      //          var myPlayer = this;
      //          myPlayer.play();
      //          myPlayer.on("playing", function(){
      //            myPlayer.play();
      //          });
      //        });
      //       });
      //     } else {
      //       return false;
      //     }
      //   });
      // }
    }
  }
  restoreAllVideos(){
    var containerVideoJs = $(".video-js");
    $.each(containerVideoJs,function(key,value){
      if($(value).length > 0){
        var containerMedia = $(value).parent(".player-live").parent(".media-container");
        var containerImage = containerMedia.find(".img-container");
        var containerVideoBrightcove = containerMedia.find(".player-live");
        if(containerImage.css("display") == "none"){
            containerImage.toggle();
            containerVideoBrightcove.toggle();
            var videoId = $(value).attr("id");
            videojs(videoId).dispose();
            containerVideoBrightcove.empty();
        }else{
            var videoId = $(value).attr("id");
            videojs(videoId).muted(true);
        }
      }
    });
  }
  addContrastColor() {
    var heading = $(this.props).find(".section-container-yellow");
    if(heading.length > 0){
      var rgb = this.getRGB(heading.css("background-color"));
      var whatColor = this.getContrast(rgb["red"],rgb["green"],rgb["blue"]);
      var text = heading.find("span");
      text.css("color",whatColor);
    }
  }
  getRGB(str){
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return match ? {
      red: match[1],
      green: match[2],
      blue: match[3]
    } : {};
  }
  getContrast(red,green,blue) {
    // http://www.w3.org/TR/AERT#color-contrast
    var o = Math.round(((parseInt(red) * 299) +
                        (parseInt(green) * 587) +
                        (parseInt(blue) * 114)) / 1000);
    var fore = (o > 125) ? 'black' : 'white';
    return fore;
  }
}

export default Extraordinary;
