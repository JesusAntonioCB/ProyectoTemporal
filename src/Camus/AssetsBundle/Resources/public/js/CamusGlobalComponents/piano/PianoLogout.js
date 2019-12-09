import $ from "jquery";

var MDPianoLogout = function(){
  this.Logout();
}

$.extend(MDPianoLogout.prototype,{
	Logout: function(){
    var btnLogout = $(".btn-exit");
    btnLogout.on("click",function(){
      tp = window.tp || [];
      tp.pianoId.logout({
        loggedOut: function() {
          alert("Has cerrado sesión");
          location.reload();
        }
      });
    });
  }
});

new MDPianoLogout();
