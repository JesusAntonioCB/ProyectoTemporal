import React from 'react';
import $ from "jquery";

class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.addPlayer();
  }

  addPlayer() {
    var selector = this.props["selector"],
    contentItems = $(this.props).find(".player"),
    playIcons = contentItems.find(".sphere"),
    audioContainers = contentItems.find(".audio-container");

    playIcons.click(function() {
      var icon = $(this).find(".sphere"),
      audioContainer = $(this).parentsUntil(selector).find(".audio-container")[0];
      var frameUrl = $(audioContainer).attr("data-link");      
      var frameWindow = window.open(frameUrl, "top", "width=420, height=245");
      // if (audioContainer.paused) {
      //   playIcons.removeClass("playing");
      //   $(this).addClass("playing");
      //   audioContainers.each(function() {
      //     this.pause();
      //   });
      //   audioContainer.play();
      // }
      // else {
      //   $(this).removeClass("playing");
      //   audioContainer.pause();
      // }
    });
  }
}

export default Radio;
