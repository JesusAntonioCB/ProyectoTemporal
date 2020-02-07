(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ 209:
/***/ (function(module, exports) {


module.exports = function load (src, opts, cb) {
  var head = document.head || document.getElementsByTagName('head')[0]
  var script = document.createElement('script')

  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = opts || {}
  cb = cb || function() {}

  script.type = opts.type || 'text/javascript'
  script.charset = opts.charset || 'utf8';
  script.async = 'async' in opts ? !!opts.async : true
  script.src = src

  if (opts.attrs) {
    setAttributes(script, opts.attrs)
  }

  if (opts.text) {
    script.text = '' + opts.text
  }

  var onend = 'onload' in script ? stdOnEnd : ieOnEnd
  onend(script, cb)

  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script, cb);
  }

  head.appendChild(script)
}

function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}

function stdOnEnd (script, cb) {
  script.onload = function () {
    this.onerror = this.onload = null
    cb(null, script)
  }
  script.onerror = function () {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null
    cb(new Error('Failed to load ' + this.src), script)
  }
}

function ieOnEnd (script, cb) {
  script.onreadystatechange = function () {
    if (this.readyState != 'complete' && this.readyState != 'loaded') return
    this.onreadystatechange = null
    cb(null, script) // there is no way to catch loading errors in IE8
  }
}


/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FloatPlayer; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

function FloatPlayer(father, element) {
  var keyword = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  try {
    if (father.find(".video-item").length === 0) throw false;
  } catch (e) {
    return e;
  }

  var floatElem = "",
      $window = jquery__WEBPACK_IMPORTED_MODULE_0___default()(window),
      videoTop = father.position().top,
      videoOffset = Math.floor(videoTop + father.outerHeight());

  if (keyword == "slick") {
    $window.on('scroll', function () {
      floatElem = father.find(element);

      if (floatElem.find(".video-item").length) {
        if ($window.scrollTop() > videoOffset) {
          floatElem.parent().addClass("carousel-lock");
          floatElem.addClass("floated");
        } else {
          floatElem.parent().removeClass("carousel-lock");
          floatElem.removeClass("floated");
        }
      }
    });
  } else {
    $window.on('scroll', function () {
      floatElem = father.find(element);

      if ($window.scrollTop() > videoOffset) {
        floatElem.addClass("floated");
      } else {
        floatElem.removeClass("floated");
      }
    });
  }

  jquery__WEBPACK_IMPORTED_MODULE_0___default()(".btn-remove-floated").click(function () {
    if (keyword == "slick") {
      floatElem.parent().removeClass("carousel-lock");
    }

    floatElem.removeClass("floated");
    $window.off("scroll");
  });
}

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var load_script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(209);
/* harmony import */ var load_script__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(load_script__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(207);
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _CamusGlobalComponents_FloatPlayer_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(210);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






 //import ModuleShareButtons from "./../../CamusGlobalComponents/ModuleShareButtons.jsx";

var Media =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Media, _React$Component);

  function Media(props) {
    var _this;

    _classCallCheck(this, Media);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Media).call(this, props));

    _this.shuffle();

    return _this;
  }

  _createClass(Media, [{
    key: "shuffle",
    value: function shuffle() {
      var oThis = this;
      jquery__WEBPACK_IMPORTED_MODULE_2___default.a.each(this.props.classList, function (index, value) {
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
  }, {
    key: "mdInit",
    value: function mdInit() {
      var oThis = jquery__WEBPACK_IMPORTED_MODULE_2___default()(this.props),
          that = this,
          sliderContainer = oThis.find(".carousel"),
          arrowLeft = sliderContainer.parent().parent().find(".left"),
          arrowRight = sliderContainer.parent().parent().find(".right"),
          titleContainer = oThis.find(".text"),
          sliderCount = oThis.find(".currentSlide"); // var gallery = $("<div />", {
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
        adaptiveHeight: true //asNavFor: galleryContent.find('.carousel')

      }); // galleryContent.find('.carousel').slick({
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

      jquery__WEBPACK_IMPORTED_MODULE_2___default()(sliderContainer).on('afterChange', function (event, slick, currentSlide, nextSlide) {
        var videoItem = jquery__WEBPACK_IMPORTED_MODULE_2___default()(".video-item");

        if (videoItem.length) {
          videoItem.each(function () {
            if (jquery__WEBPACK_IMPORTED_MODULE_2___default()(this).hasClass("video-js")) {
              var videoId = jquery__WEBPACK_IMPORTED_MODULE_2___default()(this)[0].id;
              videojs(videoId).ready(function () {
                var myPlayer = this;
                myPlayer.pause();
              });
            } else {
              jquery__WEBPACK_IMPORTED_MODULE_2___default()(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
            }
          });
        }

        jquery__WEBPACK_IMPORTED_MODULE_2___default()('.currentSlide').text(slick.currentSlide + 1);
        var counterString = slick.currentSlide + 1;
        var slash = ' / ' + slick.slideCount;
        counterString = counterString + slash; //galleryCount.text(counterString);
      }); //
      // $(sliderContainer).find('.slide img, .slide iframe').click(function(){
      //   gallery.removeClass('hideIt');
      //   that.disableScroll();
      // });

      load_script__WEBPACK_IMPORTED_MODULE_3___default()("//players.brightcove.net/57828478001/SyoL14kBx_default/index.min.js", function (err, script) {});
      new _CamusGlobalComponents_FloatPlayer_jsx__WEBPACK_IMPORTED_MODULE_5__["default"](oThis, ".slick-active", "slick");
    }
  }, {
    key: "sdInit",
    value: function sdInit() {
      var oThis = jquery__WEBPACK_IMPORTED_MODULE_2___default()(this.props),
          btnPlay = oThis.find(".btn-play");

      if (btnPlay.length) {
        var imgContainer = btnPlay.parent(),
            playerContainer = imgContainer.parent().find(".player-live");
        jquery__WEBPACK_IMPORTED_MODULE_2___default()(btnPlay).click(function () {
          var provider = jquery__WEBPACK_IMPORTED_MODULE_2___default()(this).attr("data-provider"),
              reference = jquery__WEBPACK_IMPORTED_MODULE_2___default()(this).attr("data-reference");

          if (provider.search("youtube") != -1) {
            var playerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + reference + '?autoplay=1" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
          } else if (provider.search("brigthcove") != -1) {
            var videoId = "player" + reference,
                playerHTML = '<video id=\"' + videoId + '\" data-account="57828478001" data-player="SyoL14kBx" data-embed="default" data-video-id="' + reference + '" width="100%" height="100%" class="video-js" controls></video>';
          }

          imgContainer.toggle(), playerContainer.append(playerHTML), playerContainer.toggle();
          load_script__WEBPACK_IMPORTED_MODULE_3___default()("//players.brightcove.net/57828478001/SyoL14kBx_default/index.min.js", function (err, script) {
            var myPlayer = videojs(videoId);
            myPlayer.play(); // videojs(videoId).ready(function(){
            //   var myPlayer = this;
            //   myPlayer.play();
            //   myPlayer.on("playing", function(){
            //     myPlayer.play();
            //   });
            // });
          });
        });
      }
    } // preventDefault(e){
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

  }]);

  return Media;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Media);

/***/ })

}]);