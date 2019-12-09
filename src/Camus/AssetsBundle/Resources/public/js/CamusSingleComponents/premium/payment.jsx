import React from 'react';
import $ from "jquery";

class Payment extends React.Component {

  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize() {
    var subscritionsblock = $(".block-subscriptions");
    var user = "";
    if(subscritionsblock.length > 0){
      var uid = this.getCookie('UID');
      if (uid != "") {
        var gigyaInfo = gigya.socialize.getUserInfo({ callback: function(res){
          user = res;
          $('#milenio_premium').ready(function(){
            $('#milenio_premium').trigger('gygyaInfo', user);
          });
        }});
      }
    }
  }

  getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
  }
}

export default Payment;
