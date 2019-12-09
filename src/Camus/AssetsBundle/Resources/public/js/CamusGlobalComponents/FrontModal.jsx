import React from 'react';
import $ from "jquery";

class FrontModal extends React.Component {
  static appendView(view, type = "login-type"){
    var el = $(".front-modal");
    if($(".container-modal").length){
      $(".container-modal").remove();
    }else{
      el.css("display","block");
    }
    el.append("<div class='container-modal "+type+"'><span class='close fa fa-times'></span>"+view+"</div>");
    el.click(function(e){
      if($(e.target).attr("class") != "front-modal"){
      }else{
        el.css("display","none");
        el.unbind("click");
        el.empty();
      }
    });
    var btnClose = el.find(".container-modal").find(".close");
    btnClose.click(function(e){
      $(".btnAccess,.btnOpenRegister,.btnOpenResetPassword,.btnOpenLogin").unbind("click");
      el.css("display","none");
      el.unbind("click");
      el.empty();
    });
  }
}

export default FrontModal;
