import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import Blazy from 'blazy';
import Columns from 'columns.js';
import Header from "./CamusGlobalComponents/Header.js";
import Menu from "./CamusGlobalComponents/Menu.js";
import { shareSelectedText } from "./CamusGlobalComponents/ShareText.js";
//
import modalSlider from "./CamusSingleComponents/gall/modalSlider.jsx";
// import "./CamusGlobalComponents/piano/PianoLogout.js";
// import "./CamusGlobalComponents/piano/PianoRegister.js";
// import "./CamusGlobalComponents/piano/PianoProfile.js";
import SelectableImage from "./CamusGlobalComponents/selectableImage.jsx";
import ModuleShareButtons from "./CamusGlobalComponents/ModuleShareButtons.jsx";
import ModuleFavoriteButton from "./CamusGlobalComponents/ModuleFavoriteButton.jsx";




$.fn.placeholderWarn = function (textWarn, modal) {
    var settings = $.extend({
        active: false,
        className: ""
    }, modal);

    if (!settings.active) {
        this.val("").css("background-color", "#fcee21").attr("placeholder", textWarn).focus();
        return false;
    } else {
        this.addClass(settings.className).text(textWarn);
    }
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        // this.facebookSDK = $('script[src*="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v4.0"]');
        this.initialize();
    }

    initialize() {
      if ($(".gall-base").find(".firms").length || $(".gall-gallery").find(".firms").length) {
        let container= $(".gall-base").find(".firms").length ? $(".gall-base").find(".firms")[0]:$(".gall-gallery").find(".firms")[0],
            grid = new Columns(container, {
          columns: 1,
          breakpoints: {
            648: 2,
            968: 3,
            1440: 4
          },
        });
      }
        // window.fbAsyncInit = () => {
        //     FB.init({
        //         appId: '604118326773630',
        //         status: false,
        //         cookie: false,
        //         xfbml: true,
        //         version: 'v4.0'
        //     });
        //
        //     FB.Event.subscribe('xfbml.render', function () {
        //         if ($(".nd-comments").length > 0) {
        //             $(".nd-comments.loading-comments").removeClass("loading-comments").addClass("finished");
        //         }
        //     });
        // };

        // $.when($.ajax("https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v4.0"))
        //     .then((data, textStatus, jqXHR) => {
        //         if (jqXHR.status == 200) {
        //             window.fbAsyncInit();
        //         }
        //     });

        // tp.push(["init", function () {
        //     tp = window.tp || [];
        //     if (tp.pianoId.isUserValid()) {
        //         var userData = tp.pianoId.getUser(),
        //             nameContainer = $('.btn-login'),
        //             exitContainer = $('.btn-register');
        //         window.value = true;
        //         nameContainer.removeClass('btn-login').addClass('btn-profileUser').html('<a href="/suscripciones/perfil">Hola, ' + userData.given_name + ' ' + userData.family_name + '</a>').unbind();
        //         exitContainer.removeClass('btn-register').addClass('btn-exit').text('Salir');
        //
        //         tp.pianoId.init({
        //             loggedOut: function () {
        //                 if (window.value === true) {
        //                     alert("Has cerrado sesión");
        //                     window.value = false;
        //                     if (window.location.href.indexOf("suscripciones/perfil") > -1 || window.location.href.indexOf("suscripciones") > -1) {
        //                         document.location.href = "/";
        //                     } else {
        //                         location.reload();
        //                     }
        //                 }
        //             }
        //         });
        //
        //         if (exitContainer.hasClass("btn-exit")) {
        //             exitContainer.on("click", function () {
        //                 tp.user.logout();
        //             });
        //         }
        //     } else if (!tp.user.isUserValid()) {
        //         // If URL has reset_token parameter
        //         var tokenMatch = location.search.match(/reset_token=([A-Za-z0-9]+)/);
        //         if (tokenMatch) {
        //             // Get value of the token
        //             var token = tokenMatch[1];
        //             // Present password reset form with the found token
        //             tp.pianoId.show({
        //                 showCloseButton: false,
        //                 'resetPasswordToken': token, loggedIn: function () {
        //                     // Once user logs in - refresh the page
        //                     location.reload();
        //                 }
        //             });
        //         }
        //     }
        // }]);

        $('body').removeClass('noJs');
        $("[contenteditable=true]").removeAttr("contenteditable");
        $("[contenteditable=false]").removeAttr("contenteditable");

        new Header();
        new Menu();
        shareSelectedText();

        if ($(".contenedor-detail-block.news").length) {
            import(/* webpackChunkName: "Scroll" */ './CamusGlobalComponents/Scroll.jsx');
        }

        if (window.location.pathname === '/contactanos') {
            import(/* webpackChunkName: "Contact" */ './CamusGlobalComponents/ContactForm.jsx').then(module => {
                new module.default();
            });
        }

        $(".social-media, .social-media-large, .social-media-buttons").each(function () {
            if ($(this).attr('class') == 'social-media-buttons') {
                var socialUrl = $('meta[property^="og:url"]').attr("content"),
                    socialTitle = $('meta[property^="og:title"]').attr("content");
            } else {
                var socialUrl = $(this).siblings("span[data-social-link]");
                if (socialUrl.length) {
                    var socialTitle = $(socialUrl[0]).attr('data-social-title');
                    socialUrl = $(socialUrl[0]).attr('data-social-link');
                }
            }
            ReactDOM.render( < ModuleShareButtons
            url = {socialUrl}
            title = {socialTitle}
            parent = {this.className}
            />, this);
        });

        $(".fav-container").each(function () {
            ReactDOM.render( < ModuleFavoriteButton />, this);
        });

        $("body").on('slick-opening-change', function (e, params) {
            var container = params.target;
            var socials = $(container).find(".social-media, .social-media-large")[0];
            var socialUrl = $(socials).siblings("span[data-social-link]");
            if (socialUrl.length) {
                var socialTitle = $(socialUrl[0]).attr('data-social-title');
                socialUrl = $(socialUrl[0]).attr('data-social-link');
                ReactDOM.render( < ModuleShareButtons
                url = {socialUrl}
                title = {socialTitle}
                parent = {socials.className}
                />, socials);
            }
        });

        new Blazy({loadInvisible: true});

        $('.breadcrumbs-container').click(function () {
            $(this).toggleClass("visible");
            $(this).find(".breadcrumbs").toggleClass("visible");
        });

        $(".show-filters").click(function () {
            $(".extra-filters").toggle();
            $('.filter-input').each(function () {
                if ($(this).prop('disabled')) {
                    $(this).removeAttr('disabled');
                } else {
                    $(this).attr('disabled', 'disabled');
                }
            })
        });

        // Components prefixes.
        var componentsFatherContainer = $(".contenedor-detail-block, .contenedor-notas-block, .ctr-modules, .modal-carruseles-container, #content-body > div", ".body-content"),
            prefixDictionary = ["sli", "tabs", "eo", "sn", "nd-md-base", "nd-sd-media"],
            prefixAmount = prefixDictionary.length;
        if (componentsFatherContainer.length) {
            for (var i = 0; i < prefixAmount; i++) {
                var elements = componentsFatherContainer.children().filter(function () {
                    if (this.className.search(prefixDictionary[i]) != -1) {
                        switch (prefixDictionary[i]) {
                            case "sli":
                                import(/* webpackChunkName: "Slider" */ /* webpackPrefetch: true */ './CamusSingleComponents/sli/Slider.jsx')
                                    .then(module => {
                                        new module.default(this);
                                    });
                                break;
                            case "eo":
                                import(/* webpackChunkName: "Extraordinary" */ './CamusSingleComponents/eo/Extraordinary.jsx')
                                    .then(module => {
                                        new module.default(this);
                                    });
                                break;
                            case "nd-md-base":
                            case "nd-sd-media":
                                import(/* webpackChunkName: "Media" */ './CamusSingleComponents/nd/Media.jsx')
                                    .then(module => {
                                        new module.default(this);
                                    });
                                break;
                            default:
                                break;
                        }
                    }
                });
            }
        }
        let camusYoutube = $(".camus-youtube");
        if (camusYoutube.length) {
            let arrayVideosYoutube = [];

            $.each(camusYoutube, function (key, value) {
                let videoId = $(value).attr("video-id"),
                    dynamicId = "youtube-video-" + key;
                $(value).attr("id", dynamicId);

                import(/* webpackChunkName: "YTPlayer" */ 'yt-player').then(module => {
                    let player = new module.default("#" + dynamicId);
                    player.load(videoId);
                    player.setVolume(100);
                    arrayVideosYoutube.push(player);
                })
            });
        }
    }
}

new Main();
