import React from 'react';
import $ from "jquery";
import load from 'load-script';

class SmallNews extends React.Component {
  constructor(props) {
    super(props);
    this.addContrastColor();
  }

  addContrastColor() {
    var heading = $(this.props).find(".section-top");
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

export default SmallNews;
