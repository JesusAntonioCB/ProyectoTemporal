import React from 'react';
import $ from "jquery";
import * as kaleidoscope from "kaleidoscopejs";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.addPlayer();
    this.state
  }

  addPlayer(){
    // var kaleidoscope = require('../../../node_modules/kaleidoscopejs/dist/kaleidoscope.es.js');
    // console.log("aqui va kaleidoscope 2");
    var video = $(this.props).find("video")[0];
    var currentWidth = $(video).width();
    var currentHeight = $(video).height();
    // if(currentWidth > currentHeight){
    //   currentWidth -= currentWidth*.5;
    // }
    var viewer = new kaleidoscope.Video({
      source: video,
      width:currentWidth,
      containerId: '#contenedorVRPrincipal'
    });
    var pauseButton = $(".faPauseVR.controlPlayer");
    var playButton = $(".faPlayVR.controlPlayer");
    var progressBar = $("#progress-bar");
    viewer.render();
    var startButton = $("#contenedorVRPrincipal .startPlay");

    $(video).on("play",function(){
      startButton.hide();
      pauseButton.removeClass("hidden");
      playButton.addClass("hidden");
    });

    var muted = viewer.element.getAttribute("muted") || false;
    $("#botonPlayVR .controlPlayer").click(function(){;
      video.paused ? video.play(): video.pause();
      $(this).toggleClass("hidden").siblings().toggleClass("hidden");
      startButton.hide();
      tTime.innerHTML=that.formatSecondsAsTime(video.duration,'mm:ss');
      progressBar.max = video.duration;
      progressBar.attr('max', video.duration);
    });
    var that = this;
    startButton.click(function(){
      this.remove();
      video.play();
      pauseButton.removeClass("hidden");
      playButton.addClass("hidden");
      tTime.innerHTML=that.formatSecondsAsTime(video.duration,'mm:ss');
      progressBar.max = video.duration;
    });
    video.addEventListener('timeupdate', function(){
      cTime.innerHTML=that.formatSecondsAsTime(video.currentTime,'mm:ss');
      // tTime.innerHTML=that.formatSecondsAsTime(video.duration,'mm:ss');
      // progressBar.max = video.duration;
      // progressBar.attr('max', video.duration);
      // console.log(video.duration);
      // console.log(video.currentTime);
      $("#progress-bar").val(video.currentTime);
    });
    progressBar.click(function(e){
      var nativeProgress = $(this).get(0);
      var x = e.pageX - $(this).offset().left;
      var clickedValue = x * nativeProgress.max / nativeProgress.offsetWidth;
      this.value = Math.round(clickedValue);
      video.currentTime = this.value;
    });

    if(video.autoplay)
    {
      startButton.hide();
      pauseButton.removeClass("hidden");
      playButton.addClass("hidden");
    }else{
      playButton.removeClass("hidden");
      pauseButton.addClass("hidden");
    }
  }

  formatSecondsAsTime(secs, format){
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

    if (hr < 10)   { hr    = "0" + hr; }
    if (min < 10) { min = "0" + min; }
    if (sec < 10)  { sec  = "0" + sec; }
    if (hr)            { hr   = "00"; }

    if (format != null) {
      var formatted_time = format.replace('hh', hr);
      formatted_time = formatted_time.replace('h', hr*1+""); // check for single hour formatting
      formatted_time = formatted_time.replace('mm', min);
      formatted_time = formatted_time.replace('m', min*1+""); // check for single minute formatting
      formatted_time = formatted_time.replace('ss', sec);
      formatted_time = formatted_time.replace('s', sec*1+""); // check for single second formatting
      if(formatted_time == 'NaN:NaN'){
        return '';
      }
      return formatted_time;
    } else {
      return hr + ':' + min + ':' + sec;
    }
  }
}

export default Player;
