import React from 'react';
import $ from "jquery";

class SelectLastHour extends React.Component {
  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize() {
    var elSelect = $("#selectLastHour");
    var _this = this;
    elSelect.on("change",function(){
      var value = this.value;
      var linkSection = this.options[this.selectedIndex].getAttribute('link');
      var path = document.location.pathname;
      var includeDev = path.indexOf("app");
      var splitUrl = path.split("/")
      if(includeDev >= 0){
        if(linkSection.length == 0){
          splitUrl = splitUrl.slice(0,3);
          var path = splitUrl.join("/");
        }else if(splitUrl.length > 3){
          splitUrl = splitUrl.slice(0,4);
          splitUrl[3] = linkSection.replace("/","");
          var path = splitUrl.join("/");
        }else{
          path = '/ultima-hora' + linkSection;
        }
      }else{
        if(linkSection.length == 0){
          splitUrl = splitUrl.slice(0,2);
          var path = splitUrl.join("/");
        }if(splitUrl.length > 2){
          splitUrl = splitUrl.slice(0,3);
          splitUrl[2] = linkSection.replace("/","");
          var path = splitUrl.join("/");
        }else{
          path = '/ultima-hora' + linkSection;
        }
      }
      _this.deleteCookie('sectionLastHour');
      _this.deleteCookie('sectionLink');
      document.cookie='sectionLastHour='+this.value+';domain='+window.location.hostname+';path=/';
      document.cookie='sectionLink='+linkSection+';domain='+window.location.hostname+';path=/';
      window.location.href = path;
    });
  }
  deleteCookie(name){
    document.cookie = name + '=;domain='+window.location.hostname+';path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

export default SelectLastHour;
