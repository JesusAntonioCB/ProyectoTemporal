(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Contact =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Contact, _React$Component);

  function Contact(props) {
    var _this;

    _classCallCheck(this, Contact);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Contact).call(this, props));

    _this.initialize();

    return _this;
  }

  _createClass(Contact, [{
    key: "initialize",
    value: function initialize() {
      var btnSend = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cSend");
      var oThis = this;
      btnSend.on("click", function () {
        oThis.loadEvents();
      });
    }
  }, {
    key: "loadEvents",
    value: function loadEvents() {
      var oThis = this;
      oThis.validate();
    }
  }, {
    key: "validate",
    value: function validate() {
      var userName = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cName").val().replace(/\s\s+/g, ' ').trim(),
          email = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cEmail").val().replace(/\s\s+/g, ' ').trim(),
          departament = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cDepartament").val(),
          place = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cPlace").val(),
          message = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cMessage").val(),
          flag = true,
          oThis = this;

      if (userName == "") {
        flag = false;
        return jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cName").placeholderWarn("Ingresa tu nombre");
      } else if (userName.length < 3) {
        flag = false;
        return jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cName").placeholderWarn("El nombre debe contener al menos 3 caracteres");
      }

      if (email == "") {
        flag = false;
        return jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cEmail").placeholderWarn("Ingresa tu correo");
      } else {
        if (flag == false) {
          return jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cEmail").placeholderWarn("Ingresa un correo válido");
        }
      }

      if (departament == "") {
        flag = false;
        return jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cDepartament").placeholderWarn("Selecciona un departamento");
      }

      if (place == "") {
        flag = false;
        return jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cPlace").placeholderWarn("Selecciona una plaza");
      }

      if (message == "") {
        flag = false;
        return jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cMessage").placeholderWarn("Ingresa tu mensaje");
      }

      if (flag == true) {
        var contactForm = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#contact-form"); //We set our own custom submit function

        contactForm.on("submit", function (e) {
          //Prevent the default behavior of a form
          e.preventDefault(); //Get the values from the form

          var name = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cName").val();
          var email = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cEmail").val();
          var message = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cMessage").val();
          var departament = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cDepartament").val();
          var place = jquery__WEBPACK_IMPORTED_MODULE_1___default()("#cPlace").val(); //Our AJAX POST

          jquery__WEBPACK_IMPORTED_MODULE_1___default.a.ajax({
            type: "GET",
            url: "/contact-form",
            data: {
              name: name,
              email: email,
              message: message,
              //THIS WILL TELL THE FORM IF THE USER IS CAPTCHA VERIFIED.
              captcha: grecaptcha.getResponse(),
              departament: departament,
              place: place
            },
            dataType: "json",
            success: function success(data) {
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(".alert-contact").show();
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(".mask").show();

              if (data == "False") {
                jquery__WEBPACK_IMPORTED_MODULE_1___default()(".alert-contact").find(".advice").text("Incorrecto, resuelva el CAPTCHA e inténtelo nuevamente.");
                jquery__WEBPACK_IMPORTED_MODULE_1___default()('#cAccept, .closebtn').on("click", function () {
                  location.reload();
                });
              } else {
                jquery__WEBPACK_IMPORTED_MODULE_1___default()('#cAccept, .closebtn').on("click", function () {
                  jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).parents(".alert-contact").hide();
                  jquery__WEBPACK_IMPORTED_MODULE_1___default()(".mask").hide();
                });
              }
            }
          });
        });
      }
    }
  }]);

  return Contact;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Contact);

/***/ })

}]);