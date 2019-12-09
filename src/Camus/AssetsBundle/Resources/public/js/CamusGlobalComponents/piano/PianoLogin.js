import $ from "jquery";

var MDPianoLogin = function(){
  this.pianoEventLogout = 1;
  this.pianoEventRegister = 3;
  this.Login();
}

$.extend(MDPianoLogin.prototype,{
  Login: function(){
    var btnLogin = $(".btn-login"),
        btnCloseLogin = $(".camus_mobile"),
        contentLogin = $("#piano-user"),
        socialLogin = $('#social-login'),
        _this = this;
    tp.push(["init", function() {
      tp.enableGACrossDomainLinking(); //For Analytics to work inside piano iframe
      _this.chartbeatSendData(tp);
    }]);
    btnLogin.click(function(){
      if (document.documentElement.clientWidth < 968) {
        var width = "450px";
      } else {
        var width = "900px";
      }
      if ( $(".container-right").is(":visible") ) {
        var displayMode = 'modal',
            widthFinal = width,
            containerSelector = '';
      } else {
        var displayMode = 'inline',
            widthFinal = '100%',
            containerSelector = '#piano-user';
        btnCloseLogin.show();
        socialLogin.hide();
      }
      tp.push(["init", function() {
        tp.pianoId.show({
          disableSignUp: false,
          displayMode: displayMode,
          containerSelector: containerSelector,
          width: widthFinal,
          screen: 'login',
          loggedIn: function(data) {
            _this.chartbeatSendData(tp);
            var checkExist = setInterval(function() {
              if ($('body.tp-modal-close').length == 1 || $('#sidebar').is(':visible') && $('#piano-user').is(':empty')) {
                location.reload();
                clearInterval(checkExist);
              }
            }, 100); // check every 100ms
          },
          loggedOut: function() {
            _this.chartbeatSendData(tp, _this.pianoEventLogout);
          }
        });
      }]);
    });
    btnCloseLogin.click(function(){
      contentLogin.hide().removeAttr("style").empty();
      btnCloseLogin.removeAttr("style");
      socialLogin.removeAttr("style");
    });
  },
  chartbeatSendData: function(tp, event = null) {
    var _cbq = window._cbq = (window._cbq || []);
    if(!event) {
      var authStatus = tp.user.isUserValid();
      // if (authStatus) {
      //     _cbq.push(['md_acct', 'lgdin']);
      // } else {
      //     _cbq.push(['md_acct', 'anon']);
      // }
    }else if(event == this.pianoEventLogout) {
      //     _cbq.push(['md_acct', 'lgdout']);
    }
  }
});

new MDPianoLogin();
