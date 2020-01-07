(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

(function () {
  var t,
      r,
      o,
      l,
      n,
      e,
      s = function s(t, r) {
    return function () {
      return t.apply(r, arguments);
    };
  };

  n = __webpack_require__(191), e = __webpack_require__(194), t = function () {
    function t(t) {
      this._onHostScroll = s(this._onHostScroll, this), this._onHostScrollEnd = s(this._onHostScrollEnd, this), t = n.forceObject(t), this.scrollHost = n.forceObject(t.host), this.scrollStartHandlers = {}, this.scrollEndHandlers = {}, this.scrollTop = 0, this.isScrolling = !1, this.scrollTimeoutDelay = n.forceNumber(t.delay, r), this._scrollTimeout = void 0, this.scrollListenerSet = !1;
    }

    var r;
    return r = 300, t.prototype.addScrollEventListener = function () {
      if (!this.scrollListenerSet) {
        if (!this.scrollHost.addEventListener) {
          if ("undefined" == typeof window) return console.log("ScrollListener::addScrollEventListener -> bad or missing host/window, cannot add event-listener!");
          this.scrollHost = window;
        }

        return this.scrollHost.addEventListener("scroll", this._onHostScroll), this.scrollListenerSet = !0;
      }
    }, t.prototype.removeScrollEventListener = function () {
      return this.scrollHost.removeEventListener("scroll", this._onHostScroll);
    }, t.prototype.addScrollHandler = function (t, r, o) {
      return (t = n.forceString(t)) ? (r = n.forceFunction(r), o && !this.scrollEndHandlers[t] ? this.scrollEndHandlers[t] = r : this.scrollStartHandlers[t] || (this.scrollStartHandlers[t] = r), this.addScrollEventListener()) : console.log("ScrollListener::addScrollHandler -> cannot add handler without id!");
    }, t.prototype.addScrollStartHandler = function (t, r) {
      return this.addScrollHandler(t, r);
    }, t.prototype.addScrollEndHandler = function (t, r) {
      return this.addScrollHandler(t, r, !0);
    }, t.prototype.removeScrollStartHandler = function (t) {
      return delete this.scrollStartHandlers[t];
    }, t.prototype.removeScrollEndHandler = function (t) {
      return delete this.scrollEndHandlers[t];
    }, t.prototype.removeScrollHandlers = function () {
      return this.scrollStartHandlers = {}, this.scrollEndHandlers = {};
    }, t.prototype._onHostScrollEnd = function (t) {
      var r, o;

      if (this.scrollTop === this.scrollHost.pageYOffset) {
        clearTimeout(this._scrollTimeout), this.isScrolling = !1, o = [];

        for (r in this.scrollEndHandlers) {
          o.push(this.scrollEndHandlers[r](t));
        }

        return o;
      }
    }, t.prototype._onHostScroll = function (t) {
      var r;
      this.isScrolling = !0, this.scrollTop = this.scrollHost.pageYOffset, clearTimeout(this._scrollTimeout);

      for (r in this.scrollStartHandlers) {
        this.scrollStartHandlers[r](t);
      }

      return this._scrollTimeout = setTimeout(this._onHostScrollEnd.bind(this, t), this.scrollTimeoutDelay);
    }, t;
  }(), o = {}, l = function l(r) {
    return o[r] || (o[r] = new t());
  }, r = function r(t) {
    var r, o, s;
    return s = e.v4(), o = e.v4(), r = {
      scrollListener: l(n.forceString(t, "generic")),
      componentDidMount: function componentDidMount() {
        return this.scrollListener.addScrollStartHandler(s, this.onScrollStart), this.scrollListener.addScrollEndHandler(o, this.onScrollEnd);
      },
      componentWillUnmount: function componentWillUnmount() {
        return this.scrollListener.removeScrollStartHandler(s), this.scrollListener.removeScrollEndHandler(o);
      }
    };
  }, t.componentWillMount = function () {
    throw new Error("You are trying to use ScrollListenerMixin as an object, but it's a Function! Check the mixin for usage details.");
  }, t.Mixin = r, t.ScrollListenerMixin = r, module.exports = t;
}).call(this);

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(){var n,e,r,t,i,u,o,f,a,c,s,l,g;n={boolean:!1,string:"",object:{},array:[],function:function(){},number:((g=new Number).void=!0,g),regexp:new RegExp},o=function(...n){if(r.logging)return console.log(...n)},f=function(){},l=function(n){return n[0].toUpperCase()+n.slice(1)},u=function(n,e){return e instanceof n},c=function(n,e="object"){return typeof n===e},t=function(){var n;return n={},Object.defineProperty(n,"_ENUM_",{configurable:!1,enumerable:!1,value:!0,writable:!1}),n},(e={undefined:function(n){return void 0===n},null:function(n){return null===n},function:function(n){return c(n,"function")},boolean:function(n){return c(n,"boolean")},string:function(n){return c(n,"string")},array:function(n){return c(n)&&u(Array,n)},regexp:function(n){return c(n)&&u(RegExp,n)},date:function(n){return c(n)&&u(Date,n)},number:function(n){return c(n,"number")&&n==n||c(n)&&u(Number,n)},object:function(n){return c(n)&&null!==n&&!u(Boolean,n)&&!u(Number,n)&&!u(Array,n)&&!u(RegExp,n)&&!u(Date,n)},symbol:function(n){return c(n,"symbol")},nan:function(n){return c(n,"number")&&n!=n},enum:function(n){return r.forceObject(n).hasOwnProperty("_ENUM_")},defined:function(n){return void 0!==n}}).StringOrNumber=function(n){return e.string(n)||e.number(n)},r=s={parseIntBase:10,autoConvert:!0,logging:!0,disableLogging:function(){return r.logging=!1,console.log("types.js - all logging disabled by user")},enableLogging:function(){return r.logging=!0,console.log("types.js - logging re-enabled by user")},logForce:function(n){return f=function(e,t,i){var u;if(r.isFunction(n))return n(e,t,i);switch(u=t,e){case 1:u+=": initial value is not of type "+t;break;case 2:u+=": optional value is not of type "+t;break;case 3:u+=": no valid type found, returning a type "+t+" literal"}return o("types.js - force"+u)}}},i=function(e){var t,i;return t=l(e),i=function(n){if(s.autoConvert)switch(e){case"number":s.isString(n)&&(n=parseInt(n,s.parseIntBase));break;case"string":s.isNumber(n)&&(n+="")}if(r["is"+t](n))return n},function(r,u){var o;if(null!=r&&void 0!==(o=i(r)))return o;if(f(1,t,r),s.isDefined(u)){if(s.typeof(u),null!=u&&void 0!==(u=i(u)))return u;f(2,t,r)}return f(3,t,r),n[e]}},a=function(n,r,t=[]){var i,u;if(t.length<1)return n===e[void 0];for(i=0,u=t.length;i<u;i++)if(n(t[i])===r)return r;return!r},function(){var t,u,o;for(o in u=[],e)t=e[o],u.push(function(e,t){var u;return u=function(){switch(e){case"nan":return"NaN";case"regexp":return"RegExp";default:return l(e)}}(),r["is"+u]=t,r["not"+u]=function(n){return!t(n)},r["has"+u]=function(){return a(t,!0,arguments)},r["all"+u]=function(){return a(t,!1,arguments)},e in n&&(r["force"+u]=i(e)),r["getFirst"+u]=function(...n){var e,t,i;for(e=0,t=n.length;e<t;e++)if(i=n[e],r["is"+u](i))return i}}(o,t))}(),r.intoArray=function(...n){return n.length<2&&(s.isString(n[0])?n=n.join("").replace(/^\s+|\s+$/g,"").replace(/\s+/g," ").split(" "):s.isArray(n[0])&&(n=n[0])),n},r.typeOf=r.typeof=function(n){var r;for(r in e)if(!0===(0,e[r])(n))return r},r.enum=r.enumerate=function(n,e){var r,i,u,f,a;if(e=s.forceNumber(e,0),r=t(),s.notArray(n))return o("types.js - enum: ERROR, invalid or missing enumeration array"),r;for(u=i=0,a=n.length;i<a;u=++i)f=n[u],s.isString(f)?r[f]=u+e:o("types.js - enum: ERROR, ignored non-string item that was found in enumeration array");return s.forceFunction(Object.freeze)(r),r}, true&&null!==__webpack_require__(192)&&"function"=="function"&&__webpack_require__(193)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){return r}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)), true&&(module.exports=r),"undefined"!=typeof window&&(window.Types=r)}).call(this);

/***/ }),

/***/ 192:
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ 193:
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(195);
var v4 = __webpack_require__(198);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(196);
var bytesToUuid = __webpack_require__(197);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ 196:
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ 197:
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(196);
var bytesToUuid = __webpack_require__(197);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Line__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(200);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return _Line__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(203);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return _Circle__WEBPACK_IMPORTED_MODULE_1__["default"]; });




/* harmony default export */ __webpack_exports__["default"] = ({
  Line: _Line__WEBPACK_IMPORTED_MODULE_0__["default"],
  Circle: _Circle__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _enhancer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(201);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(202);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Line =
/*#__PURE__*/
function (_Component) {
  _inherits(Line, _Component);

  function Line() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Line);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Line)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "paths", {});

    return _this;
  }

  _createClass(Line, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          percent = _this$props.percent,
          prefixCls = _this$props.prefixCls,
          strokeColor = _this$props.strokeColor,
          strokeLinecap = _this$props.strokeLinecap,
          strokeWidth = _this$props.strokeWidth,
          style = _this$props.style,
          trailColor = _this$props.trailColor,
          trailWidth = _this$props.trailWidth,
          transition = _this$props.transition,
          restProps = _objectWithoutProperties(_this$props, ["className", "percent", "prefixCls", "strokeColor", "strokeLinecap", "strokeWidth", "style", "trailColor", "trailWidth", "transition"]);

      delete restProps.gapPosition;
      var percentList = Array.isArray(percent) ? percent : [percent];
      var strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];
      var center = strokeWidth / 2;
      var right = 100 - strokeWidth / 2;
      var pathString = "M ".concat(strokeLinecap === 'round' ? center : 0, ",").concat(center, "\n           L ").concat(strokeLinecap === 'round' ? right : 100, ",").concat(center);
      var viewBoxString = "0 0 100 ".concat(strokeWidth);
      var stackPtg = 0;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
        className: "".concat(prefixCls, "-line ").concat(className),
        viewBox: viewBoxString,
        preserveAspectRatio: "none",
        style: style
      }, restProps), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
        className: "".concat(prefixCls, "-line-trail"),
        d: pathString,
        strokeLinecap: strokeLinecap,
        stroke: trailColor,
        strokeWidth: trailWidth || strokeWidth,
        fillOpacity: "0"
      }), percentList.map(function (ptg, index) {
        var pathStyle = {
          strokeDasharray: "".concat(ptg, "px, 100px"),
          strokeDashoffset: "-".concat(stackPtg, "px"),
          transition: transition || 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear'
        };
        var color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
        stackPtg += ptg;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
          key: index,
          className: "".concat(prefixCls, "-line-path"),
          d: pathString,
          strokeLinecap: strokeLinecap,
          stroke: color,
          strokeWidth: strokeWidth,
          fillOpacity: "0",
          ref: function ref(path) {
            _this2.paths[index] = path;
          },
          style: pathStyle
        });
      }));
    }
  }]);

  return Line;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

Line.propTypes = _types__WEBPACK_IMPORTED_MODULE_2__["propTypes"];
Line.defaultProps = _types__WEBPACK_IMPORTED_MODULE_2__["defaultProps"];
/* harmony default export */ __webpack_exports__["default"] = (Object(_enhancer__WEBPACK_IMPORTED_MODULE_1__["default"])(Line));

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var enhancer = function enhancer(WrappedComponent) {
  return (
    /*#__PURE__*/
    function (_WrappedComponent) {
      _inherits(Progress, _WrappedComponent);

      function Progress() {
        _classCallCheck(this, Progress);

        return _possibleConstructorReturn(this, _getPrototypeOf(Progress).apply(this, arguments));
      }

      _createClass(Progress, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          var _this = this;

          var now = Date.now();
          var updated = false;
          Object.keys(this.paths).forEach(function (key) {
            var path = _this.paths[key];

            if (!path) {
              return;
            }

            updated = true;
            var pathStyle = path.style;
            pathStyle.transitionDuration = '.3s, .3s, .3s, .06s';

            if (_this.prevTimeStamp && now - _this.prevTimeStamp < 100) {
              pathStyle.transitionDuration = '0s, 0s';
            }
          });

          if (updated) {
            this.prevTimeStamp = Date.now();
          }
        }
      }, {
        key: "render",
        value: function render() {
          return _get(_getPrototypeOf(Progress.prototype), "render", this).call(this);
        }
      }]);

      return Progress;
    }(WrappedComponent)
  );
};

/* harmony default export */ __webpack_exports__["default"] = (enhancer);

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultProps", function() { return defaultProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propTypes", function() { return propTypes; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(131);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);

var defaultProps = {
  className: '',
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  style: {},
  trailColor: '#D9D9D9',
  trailWidth: 1
};
var mixedType = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string]);
var propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  percent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([mixedType, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(mixedType)]),
  prefixCls: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  strokeColor: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object])), prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object]),
  strokeLinecap: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOf(['butt', 'round', 'square']),
  strokeWidth: mixedType,
  style: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  trailColor: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  trailWidth: mixedType
};

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(131);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _enhancer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(201);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(202);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint react/prop-types: 0 */




var gradientSeed = 0;

function stripPercentToNumber(percent) {
  return +percent.replace('%', '');
}

function toArray(symArray) {
  return Array.isArray(symArray) ? symArray : [symArray];
}

function getPathStyles(offset, percent, strokeColor, strokeWidth) {
  var gapDegree = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var gapPosition = arguments.length > 5 ? arguments[5] : undefined;
  var radius = 50 - strokeWidth / 2;
  var beginPositionX = 0;
  var beginPositionY = -radius;
  var endPositionX = 0;
  var endPositionY = -2 * radius;

  switch (gapPosition) {
    case 'left':
      beginPositionX = -radius;
      beginPositionY = 0;
      endPositionX = 2 * radius;
      endPositionY = 0;
      break;

    case 'right':
      beginPositionX = radius;
      beginPositionY = 0;
      endPositionX = -2 * radius;
      endPositionY = 0;
      break;

    case 'bottom':
      beginPositionY = radius;
      endPositionY = 2 * radius;
      break;

    default:
  }

  var pathString = "M 50,50 m ".concat(beginPositionX, ",").concat(beginPositionY, "\n   a ").concat(radius, ",").concat(radius, " 0 1 1 ").concat(endPositionX, ",").concat(-endPositionY, "\n   a ").concat(radius, ",").concat(radius, " 0 1 1 ").concat(-endPositionX, ",").concat(endPositionY);
  var len = Math.PI * 2 * radius;
  var pathStyle = {
    stroke: strokeColor,
    strokeDasharray: "".concat(percent / 100 * (len - gapDegree), "px ").concat(len, "px"),
    strokeDashoffset: "-".concat(gapDegree / 2 + offset / 100 * (len - gapDegree), "px"),
    transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s' // eslint-disable-line

  };
  return {
    pathString: pathString,
    pathStyle: pathStyle
  };
}

var Circle =
/*#__PURE__*/
function (_Component) {
  _inherits(Circle, _Component);

  function Circle() {
    var _this;

    _classCallCheck(this, Circle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this));

    _defineProperty(_assertThisInitialized(_this), "paths", {});

    _defineProperty(_assertThisInitialized(_this), "gradientId", 0);

    _this.gradientId = gradientSeed;
    gradientSeed += 1;
    return _this;
  }

  _createClass(Circle, [{
    key: "getStokeList",
    value: function getStokeList() {
      var _this2 = this;

      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          percent = _this$props.percent,
          strokeColor = _this$props.strokeColor,
          strokeWidth = _this$props.strokeWidth,
          strokeLinecap = _this$props.strokeLinecap,
          gapDegree = _this$props.gapDegree,
          gapPosition = _this$props.gapPosition;
      var percentList = toArray(percent);
      var strokeColorList = toArray(strokeColor);
      var stackPtg = 0;
      return percentList.map(function (ptg, index) {
        var color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
        var stroke = Object.prototype.toString.call(color) === '[object Object]' ? "url(#".concat(prefixCls, "-gradient-").concat(_this2.gradientId, ")") : '';

        var _getPathStyles = getPathStyles(stackPtg, ptg, color, strokeWidth, gapDegree, gapPosition),
            pathString = _getPathStyles.pathString,
            pathStyle = _getPathStyles.pathStyle;

        stackPtg += ptg;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
          key: index,
          className: "".concat(prefixCls, "-circle-path"),
          d: pathString,
          stroke: stroke,
          strokeLinecap: strokeLinecap,
          strokeWidth: ptg === 0 ? 0 : strokeWidth,
          fillOpacity: "0",
          style: pathStyle,
          ref: function ref(path) {
            _this2.paths[index] = path;
          }
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          prefixCls = _this$props2.prefixCls,
          strokeWidth = _this$props2.strokeWidth,
          trailWidth = _this$props2.trailWidth,
          gapDegree = _this$props2.gapDegree,
          gapPosition = _this$props2.gapPosition,
          trailColor = _this$props2.trailColor,
          strokeLinecap = _this$props2.strokeLinecap,
          style = _this$props2.style,
          className = _this$props2.className,
          strokeColor = _this$props2.strokeColor,
          restProps = _objectWithoutProperties(_this$props2, ["prefixCls", "strokeWidth", "trailWidth", "gapDegree", "gapPosition", "trailColor", "strokeLinecap", "style", "className", "strokeColor"]);

      var _getPathStyles2 = getPathStyles(0, 100, trailColor, strokeWidth, gapDegree, gapPosition),
          pathString = _getPathStyles2.pathString,
          pathStyle = _getPathStyles2.pathStyle;

      delete restProps.percent;
      var strokeColorList = toArray(strokeColor);
      var gradient = strokeColorList.find(function (color) {
        return Object.prototype.toString.call(color) === '[object Object]';
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
        className: "".concat(prefixCls, "-circle ").concat(className),
        viewBox: "0 0 100 100",
        style: style
      }, restProps), gradient && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("defs", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("linearGradient", {
        id: "".concat(prefixCls, "-gradient-").concat(this.gradientId),
        x1: "100%",
        y1: "0%",
        x2: "0%",
        y2: "0%"
      }, Object.keys(gradient).sort(function (a, b) {
        return stripPercentToNumber(a) - stripPercentToNumber(b);
      }).map(function (key, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("stop", {
          key: index,
          offset: key,
          stopColor: gradient[key]
        });
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
        className: "".concat(prefixCls, "-circle-trail"),
        d: pathString,
        stroke: trailColor,
        strokeLinecap: strokeLinecap,
        strokeWidth: trailWidth || strokeWidth,
        fillOpacity: "0",
        style: pathStyle
      }), this.getStokeList().reverse());
    }
  }]);

  return Circle;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

Circle.propTypes = _objectSpread({}, _types__WEBPACK_IMPORTED_MODULE_3__["propTypes"], {
  gapPosition: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['top', 'bottom', 'left', 'right'])
});
Circle.defaultProps = _objectSpread({}, _types__WEBPACK_IMPORTED_MODULE_3__["defaultProps"], {
  gapPosition: 'top'
});
/* harmony default export */ __webpack_exports__["default"] = (Object(_enhancer__WEBPACK_IMPORTED_MODULE_2__["default"])(Circle));

/***/ })

}]);