import React from 'react';
import $ from "jquery";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.initialize();
    }

    initialize() {
        var btnSend = $("#cSend");
        var oThis = this;
        btnSend.on("click", function () {
            oThis.loadEvents();
        });
    }

    loadEvents() {
        var oThis = this;
        oThis.validate();
    }

    validate() {
        var userName = $("#cName").val().replace(/\s\s+/g, ' ').trim(),
            email = $("#cEmail").val().replace(/\s\s+/g, ' ').trim(),
            departament = $("#cDepartament").val(),
            place = $("#cPlace").val(),
            message = $("#cMessage").val(),
            flag = true,
            oThis = this;

        if (userName == "") {
            flag = false;
            return $("#cName").placeholderWarn("Ingresa tu nombre");
        } else if (userName.length < 3) {
            flag = false;
            return $("#cName").placeholderWarn("El nombre debe contener al menos 3 caracteres");
        }

        if (email == "") {
            flag = false;
            return $("#cEmail").placeholderWarn("Ingresa tu correo");
        } else {
            if (flag == false) {
                return $("#cEmail").placeholderWarn("Ingresa un correo válido");
            }
        }

        if (departament == "") {
            flag = false;
            return $("#cDepartament").placeholderWarn("Selecciona un departamento");
        }

        if (place == "") {
            flag = false;
            return $("#cPlace").placeholderWarn("Selecciona una plaza");
        }

        if (message == "") {
            flag = false;
            return $("#cMessage").placeholderWarn("Ingresa tu mensaje");
        }

        if (flag == true) {
            var contactForm = $("#contact-form");
            //We set our own custom submit function
            contactForm.on("submit", function (e) {
                //Prevent the default behavior of a form
                e.preventDefault();
                //Get the values from the form
                var name = $("#cName").val();
                var email = $("#cEmail").val();
                var message = $("#cMessage").val();
                var departament = $("#cDepartament").val();
                var place = $("#cPlace").val();
                //Our AJAX POST
                $.ajax({
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
                    success: function (data) {
                        $(".alert-contact").show();
                        $(".mask").show();
                        if (data == "False") {
                            $(".alert-contact").find(".advice").text("Incorrecto, resuelva el CAPTCHA e inténtelo nuevamente.");
                            $('#cAccept, .closebtn').on("click", function () {
                                location.reload();
                            });
                        } else {
                            $('#cAccept, .closebtn').on("click", function () {
                                $(this).parents(".alert-contact").hide();
                                $(".mask").hide();
                            });
                        }
                    }
                })
            });
        }
    }
}

export default Contact;
