(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ 191:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_scroll_listener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(192);
/* harmony import */ var react_scroll_listener__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_scroll_listener__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rc_progress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(201);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







function ProgressBarRender(props) {
  var containerNewsBlock = jquery__WEBPACK_IMPORTED_MODULE_2___default()(".contenedor-notas-block, .nd-error404, #md-profile, .block-terms-conditions");

  if (containerNewsBlock.length) {
    return null;
  } else {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(rc_progress__WEBPACK_IMPORTED_MODULE_4__["Line"], {
      percent: props.perc,
      strokeLinecap: "square",
      strokeColor: "#E51B3F",
      style: {
        width: '100%',
        height: '5px'
      }
    });
  }
}

var Scroll =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Scroll, _React$Component);

  function Scroll() {
    var _this;

    _classCallCheck(this, Scroll);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scroll).call(this));
    _this.state = {
      perc: 0
    };
    _this.myScrollStartHandler = _this.myScrollStartHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Scroll, [{
    key: "myScrollStartHandler",
    value: function myScrollStartHandler(event) {
      var documentDOM = event.target;
      var perc = Math.max(0, Math.min(1, jquery__WEBPACK_IMPORTED_MODULE_2___default()(window).scrollTop() / (jquery__WEBPACK_IMPORTED_MODULE_2___default()(documentDOM).height() - jquery__WEBPACK_IMPORTED_MODULE_2___default()(window).height()))) * 100;

      if (perc >= 1) {
        this.setState({
          perc: perc
        });
      } else {
        this.setState({
          perc: 0
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var scrollListener = new react_scroll_listener__WEBPACK_IMPORTED_MODULE_3___default.a();
      scrollListener.addScrollHandler('redband', this.myScrollStartHandler);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ProgressBarRender, {
        perc: this.state.perc
      });
    }
  }]);

  return Scroll;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Scroll, null), document.getElementById("container-redband"));
/* harmony default export */ __webpack_exports__["default"] = (Scroll);

/***/ })

}]);