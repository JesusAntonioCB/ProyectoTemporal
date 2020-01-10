import React from 'react';
import $ from "jquery";
import slick from "slick-carousel";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.Slick();
  }
  Slick(){
    // $('.gallery-container').slick();
    // $('.gallery-nav').slick();
    $('.gallery-container').slick({
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: false,
     fade: true,
     asNavFor: '.gallery-nav'
   });
   $('.gallery-nav').slick({
     slidesToShow: 20,
     slidesToScroll: 1,
     asNavFor: '.gallery-container',
     dots: false,
     centerMode: false,
     focusOnSelect: true
   });
  }
}

export default Slider;
