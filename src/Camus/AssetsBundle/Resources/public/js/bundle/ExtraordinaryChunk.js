(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var load_script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(204);
/* harmony import */ var load_script__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(load_script__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CamusGlobalComponents_FloatPlayer_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(205);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Extraordinary =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Extraordinary, _React$Component);

  function Extraordinary(props) {
    var _this;

    _classCallCheck(this, Extraordinary);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Extraordinary).call(this, props));

    _this.addContrastColor();

    _this.addClickPlayer();

    return _this;
  }

  _createClass(Extraordinary, [{
    key: "addClickPlayer",
    value: function addClickPlayer() {
      var oThis = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.props);
      var oThisSelf = this;
      var containerPlay = oThis.find(".description-btn-container"),
          containerTv = oThis.find(".holder-container");

      if (containerPlay.length) {
        var containerParent = containerPlay.parent(),
            providerContainer = containerPlay.find("button");
        providerContainer.click(function () {
          var provider = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).attr("data-provider"),
              reference = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).attr("data-reference");

          if (provider.search("youtube") != -1) {
            var ytVid = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + reference + '?autoplay=1&enablejsapi=1" enablejsapi="1" video-id="' + reference + '" class="camus-youtube" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
            containerParent.css("z-index", "3").html(ytVid);
          } else if (provider.search("brigthcove") != -1) {
            var containerVideoBrightcove = oThis.find(".player-live");
            var videoId = "player" + reference;
            var playerHTML = '<video id=\"' + videoId + '\" data-account="57828478001" data-player="SyoL14kBx" data-embed="default" data-video-id="' + reference + '" width="100%" height="100%" class="video-js" controls></video>';
            oThisSelf.restoreAllVideos();
            containerParent.toggle();
            containerVideoBrightcove.toggle();
            containerVideoBrightcove.append(playerHTML);
            load_script__WEBPACK_IMPORTED_MODULE_2___default()("//players.brightcove.net/57828478001/SyoL14kBx_default/index.min.js", function (err, script) {
              var myPlayer = videojs(videoId);
              myPlayer.play();
              videojs(videoId).play();
              videojs(videoId).on("ready", function () {
                videojs(videoId).play();
                videojs(videoId).on('ended', function () {
                  containerParent.toggle();
                  containerVideoBrightcove.toggle();
                  containerVideoBrightcove.empty();
                  videojs(videoId).dispose();
                });
              });
            });
          } else {
            return false;
          }
        });
      } else if (containerTv.length) {
        //if(containerTv.attr('preload')){
        var provider = containerTv.attr("data-provider"),
            reference = containerTv.attr("data-reference");

        if (provider.search("youtube") != -1) {
          var ytVid = '<div class="float-container"><div class="camus-youtube video-item" video-id="' + reference + '"></div><button class="btn-remove-floated"><i class="fa fa-times"></i></button></div>';
          containerTv.html(ytVid);
        } else if (provider.search("brigthcove") != -1) {
          var bcVid = '<div class="float-container"><video id="playerLiveVideo" class="video-js video-item" data-account="57828478001" data-player="SyoL14kBx" data-embed="default" data-video-id="' + reference + '" width="100%" height="100%" controls></video><button class="btn-remove-floated"><i class="fa fa-times"></i></button></div>';
          containerTv.html(bcVid);
          var isDisplayHidde = false;
          load_script__WEBPACK_IMPORTED_MODULE_2___default()("//players.brightcove.net/57828478001/SyoL14kBx_default/index.min.js", function (err, script) {
            videojs('playerLiveVideo').ready(function () {
              var myPlayer = this;
              myPlayer.on("playing", function () {
                myPlayer.play();
              });
            });
          });
          var config = {
            attributes: true,
            childList: true,
            subtree: true
          };
          var observer = new MutationObserver(function (mutationsList) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var mutation = _step.value;

                if (mutation.type == 'attributes') {
                  jquery__WEBPACK_IMPORTED_MODULE_1___default()("body").trigger("slick-opening-change", {
                    target: oThis
                  });
                  return false;
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          });
          observer.observe(jquery__WEBPACK_IMPORTED_MODULE_1___default()(oThis).find(".social-networks-share").find("[data-social-link]")[0], config);
        } else {
          return false;
        }

        new _CamusGlobalComponents_FloatPlayer_jsx__WEBPACK_IMPORTED_MODULE_3__["default"](oThis, ".float-container"); // } else {
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
  }, {
    key: "restoreAllVideos",
    value: function restoreAllVideos() {
      var containerVideoJs = jquery__WEBPACK_IMPORTED_MODULE_1___default()(".video-js");
      jquery__WEBPACK_IMPORTED_MODULE_1___default.a.each(containerVideoJs, function (key, value) {
        if (jquery__WEBPACK_IMPORTED_MODULE_1___default()(value).length > 0) {
          var containerMedia = jquery__WEBPACK_IMPORTED_MODULE_1___default()(value).parent(".player-live").parent(".media-container");
          var containerImage = containerMedia.find(".img-container");
          var containerVideoBrightcove = containerMedia.find(".player-live");

          if (containerImage.css("display") == "none") {
            containerImage.toggle();
            containerVideoBrightcove.toggle();
            var videoId = jquery__WEBPACK_IMPORTED_MODULE_1___default()(value).attr("id");
            videojs(videoId).dispose();
            containerVideoBrightcove.empty();
          } else {
            var videoId = jquery__WEBPACK_IMPORTED_MODULE_1___default()(value).attr("id");
            videojs(videoId).muted(true);
          }
        }
      });
    }
  }, {
    key: "addContrastColor",
    value: function addContrastColor() {
      var heading = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.props).find(".section-container-yellow");

      if (heading.length > 0) {
        var rgb = this.getRGB(heading.css("background-color"));
        var whatColor = this.getContrast(rgb["red"], rgb["green"], rgb["blue"]);
        var text = heading.find("span");
        text.css("color", whatColor);
      }
    }
  }, {
    key: "getRGB",
    value: function getRGB(str) {
      var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
      return match ? {
        red: match[1],
        green: match[2],
        blue: match[3]
      } : {};
    }
  }, {
    key: "getContrast",
    value: function getContrast(red, green, blue) {
      // http://www.w3.org/TR/AERT#color-contrast
      var o = Math.round((parseInt(red) * 299 + parseInt(green) * 587 + parseInt(blue) * 114) / 1000);
      var fore = o > 125 ? 'black' : 'white';
      return fore;
    }
  }]);

  return Extraordinary;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Extraordinary);

/***/ }),

/***/ 204:
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

/***/ 205:
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

/***/ })

}]);