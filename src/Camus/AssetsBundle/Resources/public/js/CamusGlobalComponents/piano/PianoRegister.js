import $ from "jquery";

var MDPianoRegister = function(){
  this.pianoEventRegisterFail = 1;
  this.Register();
}

$.extend(MDPianoRegister.prototype,{
	Register: function(){
    var btnRegister = $(".btn-register"),
        btnCloseLogin = $(".camus_mobile"),
        contentLogin = $("#piano-user"),
        socialLogin = $('#social-login'),
        width = "400px",
        _this = this;
    btnRegister.on("click",function(){
      btnCloseLogin.show();
      socialLogin.hide();
      if ( $(".container-right").is(":visible") ) {
        var displayMode = 'modal',
            widthFinal = width,
            containerSelector = '';
      } else {
        var displayMode = 'inline',
            widthFinal = '100%',
            containerSelector = '#piano-user';
      }
      tp.push(["init", function() {
        tp.enableGACrossDomainLinking(); //For Analytics to work inside piano iframe
        tp.pianoId.show({
          displayMode: displayMode,
          containerSelector: containerSelector,
          width: widthFinal,
          screen: 'register',
          registrationSuccess: function() {
            contentLogin.hide().removeAttr("style").empty();
            btnCloseLogin.removeAttr("style");
            _this.chartbeatSendData(tp);
          },
          registrationFailed: function() {
            _this.chartbeatSendData(tp, _this.pianoEventRegisterFail);
          }
        });
      }]);
    });
    btnCloseLogin.on("click",function(){
      contentLogin.hide().removeAttr("style").empty();
      btnCloseLogin.removeAttr("style");
      socialLogin.removeAttr("style");
    });
  },
  chartbeatSendData: function(tp, event = null) {
    var _cbq = window._cbq = (window._cbq || []);
    if(!event) {
      //     _cbq.push(['md_acct', 'sgndup']);
    }else if(this.pianoEventRegisterFail == event) {
      //     _cbq.push(['md_acct', 'sgndupfail']);
    }
  }
});

new MDPianoRegister();
