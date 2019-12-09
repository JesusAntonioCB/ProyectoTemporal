import $ from "jquery";

var MDPianoProfile = function(){
  this.Profile();
}

$.extend(MDPianoProfile.prototype,{
	Profile: function(){
    window.addEventListener('load', function() {
      if (window.location.href.indexOf("suscripciones/perfil") > -1) {
        tp.push(["init", function() {
          if(tp.user.isUserValid()) {
            var name = 'userName',
                email = 'userEmail',
                displayMode = 'inline',
                containerSelector = '#my-account',
                containerProfile = '#md-profile',
                containerMessage = 'profile-message',
                ifUserValidShow = '.user-data-title',
                onlyOnce = true;
            var userData = tp.pianoId.getUser();
            document.getElementById( name ).innerHTML= userData.firstName+' '+userData.family_name;
            document.getElementById( email ).innerHTML= userData.email;
            if ( userData.confirmed === false ) {
              document.getElementsByClassName(containerMessage)[0].innerHTML= 'Bienvenido, por favor confirma tu cuenta en el correo que recibiste';
              document.getElementsByClassName(containerMessage)[0].style.display = "block";
            }
            $(ifUserValidShow).show();
            function myAccount(callback) {
              tp.push(["init", function() {
                tp.myaccount.show({
                  displayMode: displayMode,
                  containerSelector: containerSelector
                });
                callback();
              }]);
            }
            myAccount(function() {
              $.ajax({
                url:'https://auth.milenio.com/camus_id.php',
                method:'POST',
                dataType: 'json',
                data:{
                  uid: userData.uid,
                  method: 'getCustomFieldsByUID'
                },
                success: function(user){
                  if (user.data) {
                    $.each(user.data, function( i, val ) {
                      if (val.fieldName == 'md_cf_profile_thumbnail_url') {
                        if (typeof val.value !== 'undefined' && val.value) {
                          $(".profile-picture .profile-pic").attr("src",val.value);
                        }
                      }
                    });
                  }
                }
              });
            });
          } else {
            var btnLogin = $(".btn-login"),
                btnSidebar = $(".container-hamburguer");
            if(btnLogin.length) {
              if($("#sidebar").is(":visible")) {
                btnSidebar.click();
                btnLogin.click();
              } else {
                btnLogin.click();
              }
            }
          }
        }]);
      }
    });
  }
});

new MDPianoProfile();
