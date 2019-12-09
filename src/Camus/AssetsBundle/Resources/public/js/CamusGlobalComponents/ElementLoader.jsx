import $ from "jquery";
import React from 'react';
import load from 'load-script';
import slick from "slick-carousel";
import Blazy from 'blazy';

export default function ElementLoader(obj){
  try {
    if($(obj.father).length === 0) throw false;
    if(typeof obj.element !== "undefined"){
      if($(obj.father).find(obj.element).length === 0) throw false;
    }
    if(typeof obj.path !== "undefined"){
      if(window.location.pathname.search(obj.path) === -1) throw false;
    }
  } catch (e) {
    return e;
  }

  this.keyword = obj.keyword;
  this.path = obj.path;
  this.father = obj.father;
  this.element = obj.element;
  this.limitActive = obj.limitActive;
  this.actionUrl = obj.action.url;
  this.actionType = obj.action.type;
  this.actionData = (typeof obj.action.data !== "undefined") ? obj.action.data : {};
  this.actionDataType = obj.action.dataType;
  this.call = "";
  if(this.limitActive){
    if (this.actionData.limit !== "") this.actionData.limit = 5;
    this.actionData.offset = this.actionData.limit;
  }

  var oThis = this;
  var start = 2;
  var artHeight = [];
  window.addEventListener("scroll", scrollBehavior);

  function scrollBehavior() {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();

    if(scrollPosition >= scrollHeight) {

      oThis.call = $.ajax({
        url: oThis.actionUrl,
        type: oThis.actionType,
        data: oThis.actionData,
        dataType: oThis.actionDataType,
        async: false
      });

      oThis.call.done(function(data) {
        switch (oThis.keyword) {
          case "slick":
          oThis.actionData.offset = start * oThis.actionData.limit;
          start += 1;

          var list = $.parseHTML(data);
          var oo = $.grep(list, function(a) {
            return ($(a).hasClass(oThis.element));
          });
          if(oo.length) {
            $.each(oo, function(i, v) {
              $(oThis.father).append(v);
              var bLazy = new Blazy();
              bLazy.revalidate();
              $(v).find(".firms").slick({
                lazyLoad: 'ondemand',
                infinite: true,
                slidesToShow: 4,
                swipeToSlide: true,
                variableWidth: true,
                responsive: [
                  {
                    breakpoint: 1574,
                    settings: {
                      slidesToShow: 3
                    }
                  },
                  {
                    breakpoint: 938,
                    settings: {
                      slidesToShow: 2
                    }
                  },
                  {
                    breakpoint: 618,
                    settings: {
                      slidesToShow: 1
                    }
                  }
                ],
                prevArrow: $(v).find(".left"),
                nextArrow: $(v).find(".right"),
                dots: true
              });
            });
          } else {
            window.removeEventListener("scroll", scrollBehavior);
          }
          break;
          case "detail":
          if(data) {
            oThis.actionData.index += 1;
            changeCnt(data);
            $(oThis.father).append(data);
            var bLazy = new Blazy();
            bLazy.revalidate();

            artHeight.push({"height": scrollHeight, "flag": false});

            var hint = $(".social-network").find(".hint").last()[0];
            $(hint).hide();

            var carousel = $(".carousel"),
            arrowLeft = carousel.last().parent().parent().find(".left"),
            arrowRight = carousel.last().parent().parent().find(".right");
            $(carousel.last()[0]).slick({
              infinite: true,
              slidesToShow: 1,
              lazyLoad: 'ondemand',
              prevArrow: arrowLeft,
              nextArrow: arrowRight,
              adaptiveHeight: true
            });

            var videoItem = $(data).find(".video-item");
            if(videoItem.length){
              videoItem.each(function() {
                  if($(this).hasClass("video-js")){
                    load("//players.brightcove.net/57828478001/SyoL14kBx_default/index.min.js", function (err, script) {});
                    return false;
                  }
              });
            }
          } else {
            window.removeEventListener("scroll", scrollBehavior);
          }
          break;
          default:
          break;
        }
      });
    } else {
      $.each(artHeight, function(index, value) {
        if(scrollPosition <= value["height"]) {
          if(!value["flag"]) {
            changeCnt($(oThis.element)[index]);
            value["flag"] = true;
          }
        } else {
          if(value["flag"]) {
            changeCnt($(oThis.element)[index + 1]);
            value["flag"] = false;
          }
        }
      });
    }
  }

  var changeCnt = function(elem) {
    var actionTitle = $(elem).find("[itemprop='headline']").html();

    document.title = actionTitle;
    window.history.replaceState({}, actionTitle, $(elem).find("[itemprop='mainEntityofPage']").attr("content"));

    $(".container-title-note").find(".bg-content > span").html("Estás leyendo: " + actionTitle);
    ga('gtm1.send', { 'hitType': 'pageview', 'page': window.location.pathname });
    window.pSUPERFLY.virtualPage({
      path: window.location.protocol+'//'+window.location.host+window.location.pathname
    });
  };
}

var regex = /.*\.(com|net|mx|php)(?=\/)/,
index = 0,
pathVar = window.location.pathname.replace(regex, '');

var dataUrl = $(".list-base-findings").find("[data-url]");
if(dataUrl.length){
  var mvList = [];
  $(dataUrl).each(function(index, e) {
    var attr = e.getAttribute("data-url"),
    test = attr.replace(regex, '');
    if(pathVar != test){
      mvList.push(attr);
    }
  });

  new ElementLoader({
    "keyword": "detail",
    "father": ".body-content > .content",
    "element": ".contenedor-detail-block.news",
    "limitActive": false,
    "action": {
      "url": "/next-content",
      "type": "get",
      "dataType": "html",
      "data": {
        "mvList": mvList,
        "index": index
      }
    }
  });
}
