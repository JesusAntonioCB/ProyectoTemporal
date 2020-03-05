(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Slider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slider).call(this, props));

    _this.addSlick();

    return _this;
  }

  _createClass(Slider, [{
    key: "addSlick",
    value: function addSlick() {
      var slickFatherContainer = this.props;
      var arrowLeft = slickFatherContainer.getElementsByClassName("left");
      var arrowRight = slickFatherContainer.getElementsByClassName("right");
      var slickElement = slickFatherContainer.querySelectorAll(".firms, .thin-data, .gallery-container");
      var slickFatherClass = slickFatherContainer.classList;
      /* Slider types.
      - sli-base
      - sli-opening
      - sli-large
      - sli-opinion
      - sli-thin
      - sli-modal
      */
      // Media Queries

      var oneColumn = 618,
          twoColumn = 938,
          threeColumn = 1574;
      var that = this;
      jquery__WEBPACK_IMPORTED_MODULE_1___default.a.each(slickFatherClass, function (index, value) {
        switch (value) {
          case "sli-large":
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick({
              infinite: true,
              slidesToShow: 1,
              variableWidth: true,
              lazyLoad: 'ondemand',
              centerMode: true,
              responsive: [{
                breakpoint: oneColumn,
                settings: {
                  centerMode: false,
                  centerPadding: '0%'
                }
              }],
              prevArrow: arrowLeft,
              nextArrow: arrowRight,
              dots: true
            });
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
              var pictureEl = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).find(".slick-slide").find("picture");
              var listImg = pictureEl.find("img");
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(listImg).each(function (key, value) {
                var srcImg = jquery__WEBPACK_IMPORTED_MODULE_1___default()(value).attr("src");
                var srcImgCorrect = "";
                jquery__WEBPACK_IMPORTED_MODULE_1___default()(value).prev().attr("data-srcset");

                if (window.innerWidth >= 648) {
                  srcImgCorrect = jquery__WEBPACK_IMPORTED_MODULE_1___default()(value).prev().attr("data-srcset");
                } else {
                  srcImgCorrect = jquery__WEBPACK_IMPORTED_MODULE_1___default()(value).prev().prev().attr("data-srcset");
                }

                var indexLogoDefault = srcImg.indexOf("placeholder.jpg");

                if (indexLogoDefault >= 0) {
                  jquery__WEBPACK_IMPORTED_MODULE_1___default()(value).attr("data-src", srcImgCorrect);
                  jquery__WEBPACK_IMPORTED_MODULE_1___default()(value).attr("data-lazy", srcImgCorrect);
                } else {
                  jquery__WEBPACK_IMPORTED_MODULE_1___default()(value).attr("src", srcImgCorrect);
                }
              });
            });
            break;

          case "sli-opinion":
            var params = {
              infinite: true,
              slidesToShow: 7,
              slidesToScroll: 1,
              variableWidth: true,
              swipeToSlide: true,
              prevArrow: arrowLeft,
              nextArrow: arrowRight,
              dots: true
            },
                firms = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).children();
            firms.first().addClass("first-firm");

            if (firms.length <= 7) {
              params.responsive = [{
                breakpoint: threeColumn,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1
                }
              }, {
                breakpoint: twoColumn,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              }, {
                breakpoint: oneColumn,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }];
            }

            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick(params);
            break;

          case "sli-base":
          case "sli-base-left-title":
            var params = {
              lazyLoad: 'ondemand',
              infinite: true,
              slidesToShow: 4,
              slidesToScroll: 1,
              swipeToSlide: true,
              variableWidth: true,
              prevArrow: arrowLeft,
              nextArrow: arrowRight,
              dots: true
            },
                items = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).children();

            if (items.length <= 4) {
              params.responsive = [{
                breakpoint: threeColumn,
                settings: {
                  infinite: true,
                  slidesToShow: 3
                }
              }, {
                breakpoint: twoColumn,
                settings: {
                  slidesToShow: 2
                }
              }, {
                breakpoint: oneColumn,
                settings: {
                  slidesToShow: 1
                }
              }];
            }

            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick(params);
            break;

          case "sli-left-title-sortable":
            var params = {
              variableWidth: true,
              infinite: true,
              lazyLoad: 'ondemand',
              slidesToShow: 4,
              slidesToScroll: 1,
              swipeToSlide: true,
              prevArrow: arrowLeft,
              nextArrow: arrowRight,
              dots: true
            },
                firms = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).children();

            if (firms.length <= 4) {
              params.responsive = [{
                breakpoint: threeColumn,
                settings: {
                  infinite: true,
                  slidesToShow: 3
                }
              }, {
                breakpoint: twoColumn,
                settings: {
                  slidesToShow: 2
                }
              }, {
                breakpoint: oneColumn,
                settings: {
                  slidesToShow: 1
                }
              }];
            }

            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick(params);
            break;

          case "sli-thin-authors":
          case "sli-thin-themes":
          case "sli-thin-programs":
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick({
              variableWidth: true,
              infinite: true,
              slidesToShow: 5,
              swipeToSlide: true,
              prevArrow: arrowLeft,
              nextArrow: arrowRight,
              dots: false
            });
            break;

          case "sli-thin-matches":
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick({
              variableWidth: true,
              infinite: true,
              slidesToShow: 3,
              swipeToSlide: true,
              responsive: [{
                breakpoint: twoColumn,
                settings: {
                  slidesToShow: 5,
                  arrows: false
                }
              }],
              prevArrow: arrowLeft,
              nextArrow: arrowRight,
              dots: false
            });
            break;

          case "sli-thin-clubs":
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick({
              variableWidth: true,
              infinite: true,
              slidesToShow: 18,
              swipeToSlide: true,
              arrows: false,
              responsive: [{
                breakpoint: twoColumn,
                settings: {
                  slidesToShow: 12
                }
              }, {
                breakpoint: oneColumn,
                settings: {
                  slidesToShow: 5
                }
              }],
              dots: false
            });
            break;

          case "sli-opening":
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick({
              infinite: true,
              slidesToShow: 1,
              swipeToSlide: true,
              prevArrow: arrowLeft,
              nextArrow: arrowRight,
              responsive: [{
                breakpoint: oneColumn,
                settings: {
                  infinite: true,
                  slidesToShow: 2,
                  variableWidth: true
                }
              }, {
                breakpoint: twoColumn,
                settings: {
                  infinite: true,
                  slidesToShow: 2,
                  variableWidth: true
                }
              }]
            });
            var url = window.location.href;
            var splitedUrl = url.split("?image=");
            var index = 0;
            var flag = false;

            if (splitedUrl.length > 1) {
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('slickGoTo', splitedUrl[1] - 1);
            }

            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).on('afterChange', function (event, slick, currentSlide, nextSlide) {
              if (currentSlide !== index || flag) {
                flag = true;
                var currentSlide = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('slickCurrentSlide'); // $('.img-index').text(currentSlide+1);

                var imgItem = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).find(".slick-current").text();
                jquery__WEBPACK_IMPORTED_MODULE_1___default()('.img-detail').text(imgItem); // ga('gtm1.send', { 'hitType': 'pageview', 'page': location.pathname+"?image="+(currentSlide+1) });
                // window.history.replaceState({}, imgItem, '?image='+(currentSlide+1));
                // window.pSUPERFLY.virtualPage({
                //   path: window.location.protocol+'//'+window.location.host+window.location.pathname+'#'+(currentSlide+1)
                // });
                // dataLayer.push({
                //   "varPage": (currentSlide+1)
                // });
                //udm_(comscoreUrl+comscoreSection+'.'+comscorePath+'.'+(currentSlide+1));

                var socialSpan = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parent().find("[data-social-link]")[0];
                var oldLink = jquery__WEBPACK_IMPORTED_MODULE_1___default()(socialSpan).attr('data-social-link');
                var splitedLink = oldLink.split("?image=");

                if (splitedLink.length > 1) {
                  splitedLink[1] = currentSlide + 1;
                  oldLink = splitedLink.join("?image=");
                } else {
                  splitedLink[1] = currentSlide + 1;
                  oldLink = splitedLink.join("?image=");
                }

                jquery__WEBPACK_IMPORTED_MODULE_1___default()(socialSpan).attr('data-social-link', oldLink);
                var newImage = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).find('.slick-current').find('img').attr('src');
                jquery__WEBPACK_IMPORTED_MODULE_1___default()(socialSpan).attr('data-social-picture', newImage);
                jquery__WEBPACK_IMPORTED_MODULE_1___default()("body").trigger("slick-opening-change", {
                  target: that.props
                });
              }
            });
            break;

          case "sli-modal":
            var startSlider = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).find(".item-start").index();

            if (startSlider < 0) {
              startSlider = 0;
            }

            console.log(startSlider);
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick({
              infinite: true,
              initialSlide: startSlider,
              slidesToShow: 1,
              pauseOnHover: false,
              swipeToSlide: true,
              prevArrow: arrowLeft,
              nextArrow: arrowRight,
              asNavFor: '.child-sli'
            });
            var url = window.location.href;
            var splitedUrl = url.split("?image=");
            var index = 0;
            var flag = false; // $("body, html").css({"height":"100%","overflow":"hidden"});

            var header = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parent().parent().find(".header-cartoon");
            var fatherSli = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parent().parent().parent().parent().find(".sli-modal");
            var bPresent = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parents().parents().parents().parents().parents().parents().parents().find(".buttons-top-content");
            var share = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parents().parents().parents().parents().parents().parents();
            share.find(".div-share-content").find(".button").click(function () {
              share.find(".div-share-content").slideUp();
            });
            share.find(".div-share-content").find(".last").click(function () {//cambiar datos en share-content
            });
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(document).click(function (e) {
              var container = share.find(".div-share-content");

              if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.slideUp();
              }
            });
            bPresent.find("#Share").click(function () {
              share.find(".div-share-content").slideToggle();
              share.find(".sf-url").find("#up").val(url);
              event.stopImmediatePropagation();
            });
            header.find(".btn-buy").click(function () {
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).addClass("hide");
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal-left-menu, .modal-carruseles-container").toggleClass("menu-active");
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('refresh');
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('slickPause');
            });
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal-left-menu").find(".left-menu-header").find(".left-menu-close").click(function () {
              header.find(".btn-buy").removeClass("hide");
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal-left-menu, .modal-carruseles-container").toggleClass("menu-active");
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('refresh');
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('slickPause');
            });
            header.find(".btn-return").click(function () {
              var detailC = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parents().parents().find(".detail-container"),
                  modalMenu = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parents().parents().parents().parents().find(".modal-carruseles-container");
              jquery__WEBPACK_IMPORTED_MODULE_1___default()("body, html").removeAttr('style');
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal").toggleClass("hide");

              if (detailC.find(".auto-start").hasClass("start")) {
                detailC.find(".auto-start").toggleClass("start");
                detailC.find(".text-container").find(".fa").toggleClass("fa-pause").toggleClass("fa-play");
                jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('slickPause');

                if (header.find(".btn-buy").hasClass("hide")) {
                  header.find(".btn-buy").removeClass("hide");
                }
              }

              jquery__WEBPACK_IMPORTED_MODULE_1___default()(fatherSli.find(".gallery.container").removeClass("child-hide-pre"));

              if (bPresent.find(".btnPresentation").hasClass("on")) {
                bPresent.find(".btnPresentation").removeClass("on");
                modalMenu.find(".gallery-slider").off("mousemove");
                console.log(fatherSli.find(".gallery-container").hasClass("child-hide-pre")); // ahora que D:!
              }
            });
            header.find(".btn-share").click(function () {
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(".social-networks-share").css("display", "table");
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal").append('<div class="fade" style="opacity: 0.7;"></div>');
              event.stopImmediatePropagation();
            });
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(document).click(function (e) {
              var container = jquery__WEBPACK_IMPORTED_MODULE_1___default()(".social-networks-share");

              if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.slideUp();
                jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal").find(".fade").remove();
              }
            });
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(".social-networks-share").find(".button").click(function () {
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(".social-networks-share").slideUp();
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal").find(".fade").remove();
            });

            if (splitedUrl.length > 1) {
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('slickGoTo', splitedUrl[1] - 1);
            }

            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).on('afterChange', function (event, slick, currentSlide, nextSlide) {
              if (currentSlide !== index || flag) {
                flag = true;
                var currentSlide = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('slickCurrentSlide'); // $('.img-index').text(currentSlide+1);

                var imgItem = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).find(".slick-current").text();
                jquery__WEBPACK_IMPORTED_MODULE_1___default()('.img-detail').text(imgItem); // ga('gtm1.send', { 'hitType': 'pageview', 'page': location.pathname+"?image="+(currentSlide+1) });
                // window.history.replaceState({}, imgItem, '?image='+(currentSlide+1));
                // window.pSUPERFLY.virtualPage({
                //   path: window.location.protocol+'//'+window.location.host+window.location.pathname+'#'+(currentSlide+1)
                // });
                // dataLayer.push({
                //   "varPage": (currentSlide+1)
                // });
                //udm_(comscoreUrl+comscoreSection+'.'+comscorePath+'.'+(currentSlide+1));

                var socialSpan = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parent().parent().parent().parent().find("[data-social-link]")[0];
                var oldLink = jquery__WEBPACK_IMPORTED_MODULE_1___default()(socialSpan).attr('data-social-link');
                var splitedLink = oldLink.split("?image=");

                if (splitedLink.length > 1) {
                  splitedLink[1] = currentSlide + 1;
                  oldLink = splitedLink.join("?image=");
                } else {
                  splitedLink[1] = currentSlide + 1;
                  oldLink = splitedLink.join("?image=");
                }

                jquery__WEBPACK_IMPORTED_MODULE_1___default()(socialSpan).attr('data-social-link', oldLink);
                var newImage = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).find('.slick-current').find('img').attr('src');
                jquery__WEBPACK_IMPORTED_MODULE_1___default()(socialSpan).attr('data-social-picture', newImage);
                jquery__WEBPACK_IMPORTED_MODULE_1___default()("body").trigger("slick-opening-change", {
                  target: that.props
                });
              }
            });
            break;

          case "sli-child":
            var startSlider = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).find(".item-start").index();

            if (startSlider < 0) {
              startSlider = 0;
            }

            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick({
              infinite: true,
              initialSlide: startSlider,
              slidesToShow: 1,
              slidesToScroll: 1,
              swipeToSlide: true,
              focusOnSelect: true,
              variableWidth: true,
              prevArrow: arrowLeft,
              nextArrow: arrowRight,
              asNavFor: '.father-sli'
            }); // $("body, html").css({"height":"100%","overflow":"hidden"});

            var detailC = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parent().parent().find(".detail-container");
            var bPresent = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parents().parents().parents().parents().parents().parents().parents().find(".buttons-top-content");
            var header = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parents().parents().find(".header-cartoon");
            detailC.find(".hide-slider").click(function () {
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parent().slideToggle(500);
              var fatherSli = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parent().parent().parent().parent().find(".sli-modal");
              fatherSli.find(".gallery-container").toggleClass("child-Hide");
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).find(".fa").toggleClass("fa-angle-double-down").toggleClass("fa-angle-double-up");
            });
            bPresent.find(".btnPresentation").on("click", function () {
              bPresent.find(".btnPresentation").toggleClass("on");

              if (!jquery__WEBPACK_IMPORTED_MODULE_1___default()(".bottom-selected-container").length) {
                jquery__WEBPACK_IMPORTED_MODULE_1___default()("body, html").css({
                  "overflow": "hidden"
                });
                jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal").toggleClass("hide");
                var fatherSli = jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal").find(".sli-modal").find(".gallery-slider").find(".father-sli"),
                    childSli = jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal").find(".sli-child").find(".gallery-slider").find(".child-sli"),
                    autoSlider = jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal").find(".sli-child").find(".media-container").find(".detail-container"),
                    fatherSlik = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parent().parent().parent().parent().find(".sli-modal"),
                    header = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parents().parents().find(".header-cartoon"),
                    modalMenu = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parents().parents().parents().parents().find(".modal-carruseles-container");
                fatherSli.slick('slickGoTo', 0);
                childSli.slick('slickGoTo', 0);
                fatherSli.slick('refresh');
                fatherSli.slick('slickPause');
                detailC.find(".auto-start").toggleClass("start");
                detailC.find(".text-container").find(".fa").toggleClass("fa-play").toggleClass("fa-pause");

                if (detailC.find(".auto-start").hasClass("start")) {
                  fatherSlik.find(".slick-initialized").slick('slickPlay');
                  header.find(".btn-buy").addClass("hide");
                  var i = null;

                  if (bPresent.find(".btnPresentation").hasClass("on")) {
                    modalMenu.find(".gallery-slider").on("mousemove", function () {
                      var fatherSli = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parent().parent().parent().parent().find(".sli-modal");
                      clearTimeout(i);
                      modalMenu.find(".sli-child").stop().slideDown(500);
                      header.stop().slideDown(500);
                      modalMenu.find(".sli-child").stop().removeClass("hide");
                      fatherSli.find(".gallery-container").stop().removeClass("child-hide-pre");
                      fatherSli.find(".left").stop().removeClass("fade");
                      fatherSli.find(".right").stop().removeClass("fade");
                      i = setTimeout(function () {
                        modalMenu.find(".sli-child").stop().slideUp(500);
                        header.stop().slideUp();
                        modalMenu.find(".sli-child").stop().addClass("hide");
                        fatherSli.find(".gallery-container").stop().addClass("child-hide-pre");
                        fatherSli.find(".left").stop().addClass("fade");
                        fatherSli.find(".right").stop().addClass("fade");
                      }, 5000);
                    });

                    if (modalMenu.hasClass("menu-active")) {
                      jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal-left-menu, .modal-carruseles-container").toggleClass("menu-active");
                      jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('refresh');
                      jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('slickPause');
                    }
                  }
                } else {
                  fatherSlik.find(".slick-initialized").slick('slickPause');
                  header.find(".btn-buy").removeClass("hide");
                }
              }
            });
            detailC.find(".auto-start").click(function () {
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).toggleClass("start");
              jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).find(".text-container").find(".fa").toggleClass("fa-play").toggleClass("fa-pause");
              var fatherSli = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parent().parent().parent().parent().find(".sli-modal"),
                  header = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parents().parents().find(".header-cartoon"),
                  modalMenu = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parents().parents().parents().parents().find(".modal-carruseles-container");
              console.log(jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).hasClass("start"));

              if (jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).hasClass("start")) {
                fatherSli.find(".slick-initialized").slick('slickPlay');
                header.find(".btn-buy").addClass("hide");
                console.log(modalMenu.hasClass("menu-active")); // setTimeout(function(){
                //   $(slickElement).parent().slideToggle(500);
                //   var fatherSli= $(slickElement).parent().parent().parent().parent().find(".sli-modal");
                //   fatherSli.find(".gallery-container").toggleClass("child-Hide");
                // }, 3000);

                if (modalMenu.hasClass("menu-active")) {
                  jquery__WEBPACK_IMPORTED_MODULE_1___default()(".modal-left-menu, .modal-carruseles-container").toggleClass("menu-active");
                  jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('refresh');
                  jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('slickPause');
                }
              } else {
                fatherSli.find(".slick-initialized").slick('slickPause');
                header.find(".btn-buy").removeClass("hide");
              }
            });
            break;

          case "sli-videos":
            jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick({
              infinite: true,
              slidesToShow: 1,
              lazyLoad: 'ondemand',
              swipeToSlide: true,
              centerMode: true,
              centerPadding: '20%',
              responsive: [{
                breakpoint: threeColumn,
                settings: 'unslick'
              }, {
                breakpoint: twoColumn,
                settings: 'unslick'
              }, {
                breakpoint: oneColumn,
                settings: {
                  infinite: true,
                  lazyLoad: 'ondemand',
                  dots: true,
                  arrows: false
                }
              }],
              arrows: false,
              dots: true
            });

          default:
            break;
        }

        that.layoutDots(slickElement);
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(window).resize(function () {
          var module = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).parent().parent();

          if (jquery__WEBPACK_IMPORTED_MODULE_1___default()(module).attr("class") == "sli-large") {
            if (module.find(".slick-dots").hasClass("personalizado") == false) {
              that.layoutDots(slickElement);
            }
          }
        });
      });
    }
  }, {
    key: "removeSlick",
    value: function removeSlick() {
      var slickFatherContainer = this.props;
      var slickElement = slickFatherContainer.querySelectorAll(".firms, .thin-data, .gallery-container");
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('unslick');
    }
  }, {
    key: "layoutDots",
    value: function layoutDots(slickElement) {
      var contenedorTop = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement),
          lengthFotos = jquery__WEBPACK_IMPORTED_MODULE_1___default()(slickElement).slick('getSlick').slideCount - 1,
          limiteDots = 5,
          segmento = 1,
          arraySegmento = {};

      if (lengthFotos > 5) {
        contenedorTop.find('.slick-dots').addClass('personalizado');
        contenedorTop.each(function (i, v) {
          var dots = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).find(".slick-dots li");
          dots.first().addClass("personalizado");
          dots.filter(function () {
            return jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).index() > 4;
          }).hide();
        });

        for (var j = 1; j <= lengthFotos; j++) {
          if (j === 1) {
            arraySegmento[segmento] = [];
            arraySegmento[segmento].push(j);
          } else {
            var nPos = j * (limiteDots / lengthFotos);

            if (nPos < 1) {
              segmento = 2;

              if (typeof arraySegmento[segmento] !== 'undefined') {
                arraySegmento[segmento].push(j);
              } else {
                arraySegmento[segmento] = [];
                arraySegmento[segmento].push(j);
              }
            } else if (nPos >= limiteDots) {
              segmento = limiteDots;

              if (typeof arraySegmento[segmento] !== 'undefined') {
                arraySegmento[segmento].push(j);
              } else {
                arraySegmento[segmento] = [];
                arraySegmento[segmento].push(j);
              }
            } else {
              segmento = parseInt(nPos) + 1;

              if (typeof arraySegmento[segmento] !== 'undefined') {
                arraySegmento[segmento].push(j);
              } else {
                arraySegmento[segmento] = [];
                arraySegmento[segmento].push(j);
              }
            }
          }
        }

        contenedorTop.on("afterChange", function () {
          var indiceSlick = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).slick("slickCurrentSlide");
          jquery__WEBPACK_IMPORTED_MODULE_1___default.a.each(arraySegmento, function (key, value) {
            jquery__WEBPACK_IMPORTED_MODULE_1___default.a.each(value, function (indice, valueIndice) {
              if (indiceSlick == valueIndice) {
                contenedorTop.find(".slick-dots li").removeAttr("class");
                contenedorTop.find(".slick-dots li:nth-child(" + key + ")").attr("class", "slick-active personalizado");
                return false;
              } else if (indiceSlick == 0) {
                contenedorTop.find(".slick-dots li").first().attr("class", "slick-active personalizado");
                return false;
              }
            });
          });
        });
        contenedorTop.find('.slick-dots li').unbind();
        contenedorTop.find('.slick-dots li').on("click", function () {
          var indiceButton = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).index() + 1;
          contenedorTop.slick("slickGoTo", arraySegmento[indiceButton][0]);
          contenedorTop.find(".slick-dots li").removeAttr("class");
          contenedorTop.find(".slick-dots li:nth-child(" + indiceButton + ")").attr("class", "slick-active personalizado");
        });
      }
    }
  }]);

  return Slider;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Slider);

/***/ })

}]);