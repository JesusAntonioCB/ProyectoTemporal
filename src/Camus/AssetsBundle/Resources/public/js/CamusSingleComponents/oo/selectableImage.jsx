import $ from "jquery";
import Selectable from 'selectable.js';
import React from 'react';
import ReactDOM from 'react-dom';
// var selectable = require('selectable');
//import ModuleShareButtons from "./../../CamusGlobalComponents/ModuleShareButtons.jsx";

class SelectableImage{
  constructor() {
    this.selected();
  }

  selected(){
    var oThis=this;
    if ($(".menu-control-gallery").length) {
      console.log("prueba");
      oThis.appendMenuControl();
    }
    $('body').on('click', '.oo-top-text',function(e) {
      if ($(".bottom-selected-container").length) {
        e.preventDefault();
      }
    });
    $('body').on('click', '.btnSelectable',function() {
      console.log(this);
      var contenedor= $(".contenedor-notas-block");
      const selectable = new Selectable({
         filter: ".oo-top-text",
         toggle: true,
         lasso: {
        		border: "1px dashed rgba(98, 2, 2, 1)",
        		backgroundColor: "rgba(255, 255, 255, 0.4)"
          }

      });
      selectable.on("init", function() {
        var items= $(".oo-top-text");
        items.find(".headline-top-container-gradient").css("display","none");
        items.find(".media-container").append('<div class="bottom-selected-container"></div>');
        oThis.appendCheked(items.find(".bottom-selected-container"));
      });
      selectable.on("selecteditem", function(item) {
        $(this).find(".bottom-selected-container").find(".circleCheck").addClass("active");
        console.log("seleccione uno");
      });
    });
    console.log("hola mundo");
  }

  appendMenuControl(){
    let _this=this;
    const element = (
      <div className="top-content">
        <div className="buttons-top-content">
          <div className="subbuttons btnSelectable">
            <div className="letras">SELECCIONAR FOTOS</div>
          </div>
          <div className="subbuttons">
            <div className="letras">
              <span className="fa fa-shopping-cart"></span>COMPRAR<span className="downbutton">&#9660;</span>
            </div>
            <div className="div-top-content">
              <div className="div-top-buy">
                <a href="#">Seleccionar fotos que comprar</a>
              </div>
              <div className="div-top-separator"></div>
              <div className="div-top-buy">
                <a href="#">Comprar todas las fotos</a>
              </div>
              <div className="div-top-buy">
                <a href="#">Ver cesta</a>
              </div>
            </div>
          </div>
          <div className="subbuttons">
            <div className="letras"><span className="fa fa-book"></span>CREAR ÁLBUM</div>
          </div>
          <div className="subbuttons">
            <div className="letras">COMPARTIR</div>
          </div>
          <div className="subbuttons">
            <div className="letras"><span className="leftButton">&#9658;</span>PASE DE DIAPOSITIVAS</div>
          </div>
        </div>
      </div>
    );
    ReactDOM.render(element, $(".menu-control-gallery")[0]);
  }

  appendCheked(item){
    let _this=this;
    const element = (
      <div className="button-selected">
        <div className="circleCheck">
        </div>
        <div className="zoombtn">
          <span className="fa fa-search-plus"></span>
        </div>
      </div>
    );
    item.each(function(index){
      dump(this);
      ReactDOM.render(element, this);
    });
  }

}

new SelectableImage;
