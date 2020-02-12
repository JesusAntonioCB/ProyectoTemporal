import $ from "jquery";
import Selectable from 'selectable.js';
import React from 'react';
import ReactDOM from 'react-dom';

class SelectableImage{
  constructor() {
    this.selected();
  }

  selected(){
    let oThis=this;
    if ($(".menu-control-gallery").length) {
      console.log("prueba");
      oThis.appendpre();
    }
  }

  appendpre(type=""){
    let _this=this;
    switch (type) {
        case "CancelMenu":
          var element = (
          <div className="top-content">
            <div className="buttons-top-content">
              <div className="subbuttons letras">
                <span className="fa fa-shopping-cart"></span>COMPRAR <span className="downbutton">&#9660;</span>
              </div>
              <div className="subbuttons">
                <div className="letras">
                  <span className="fa fa-shopping-cart"></span>COMPRAR <span className="downbutton">&#9660;</span>
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
                <div className="letras">AGREGAR A FAVORITOS</div>
              </div>
              <div className="subbuttons btnCancel" onClick={ _this.openAgain }>
                <div className="letras">CANCELAR</div>
              </div>
            </div>
          </div>
        );
        ReactDOM.render(element, $(".menu-control-gallery")[0]);
      break;
      case "":
        var element = (
        <div className="top-content">
          <div className="buttons-top-content">
            <div className="subbuttons btnSelectable" onClick={ _this.initSelectable.bind(this) }>
              <div className="letras">SELECCIONAR FOTOS</div>
            </div>
            <div className="subbuttons">
              <div className="letras">
                <span className="fa fa-shopping-cart"></span>COMPRAR <span className="downbutton">&#9660;</span>
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
      break;

    }

  }
  openAgain(){
    let _this=this;
    const element = (
      <div className="top-content">
        <div className="buttons-top-content">
          <div className="subbuttons btnSelectable" onClick={ _this.selected }>
            <div className="letras">SELECCIONAR FOTOS</div>
          </div>
          <div className="subbuttons">
            <div className="letras">
              <span className="fa fa-shopping-cart"></span>COMPRAR <span className="downbutton">&#9660;</span>
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

  appendMenuControl(){
    let _this=this;
    const element = (
      <div className="top-content">
        <div className="buttons-top-content">
          <div className="subbuttons btnSelectable" onClick={ _this.initSelectable.bind(this) }>
            <div className="letras">SELECCIONAR FOTOS</div>
          </div>
          <div className="subbuttons">
            <div className="letras">
              <span className="fa fa-shopping-cart"></span>COMPRAR <span className="downbutton">&#9660;</span>
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
        <div className="zoombtn" onClick={ _this.imageZoom.bind(this) }>
          <span className="fa fa-search-plus"></span>
        </div>
      </div>
    );
    item.each(function(index){
      // dump(this);
      ReactDOM.render(element, this);
    });
  }

  appendMenuSelected(item,galleryCount,gallerySelected){
    let _this=this;
    const element = (
      <div className="menu-selected-content">
        <div className="selected-buttons">
          <div className="buttons-container">
            Seleccionar: <span className="btn-all">Todo</span> | <span className="btn-nothing">Ninguno</span>
          </div>
        </div>
        <div className="selected-text">
          <span className="text">Hacer clic en fotos para seleccionarlas</span>
        </div>
        <div className="selected-number">
          <div className="selected-dinamic-number">
            <span className="btn-all">{gallerySelected}</span> de <span className="btn-nothing">{galleryCount}</span> seleccionados/as
          </div>
        </div>
      </div>
    );
    ReactDOM.render(element, item);
  }

  initSelectable(object){
    let oThis=this;
    var contenedor= $(".contenedor-notas-block");
    var type= "CancelMenu";
    const selectable = new Selectable({
       filter: ".sn-bottom-text-gallery",
       ignore: [".headline-bottom-container-gradient", ".fav-container",".bottom-selected-container"],
       toggle: true,
       lasso: {
          border: "1px dashed rgba(98, 2, 2, 1)",
          backgroundColor: "rgba(255, 255, 255, 0.4)"
        }

    });
    selectable.on("init", function() {
      if ($(".selectable-info-conotainer").length) {
        console.log("init dentro del ico container");
        console.log(selectable.getItems());
        console.log(selectable.getItems().length);
        oThis.appendMenuSelected($(".selectable-info-conotainer")[0],selectable.getItems().length,selectable.getSelectedItems().length);
      }
      var items= $(".sn-bottom-text-gallery");
      items.find(".headline-bottom-container-gradient").addClass("hide");
      // items.find(".fav-container").addClass("hide");
      items.find(".media-container").append('<div class="bottom-selected-container"></div>');
      oThis.appendCheked(items.find(".bottom-selected-container"));
    });
    selectable.on("selecteditem", function(item) {
      // console.log(item);
      console.log();
      oThis.appendMenuSelected($(".selectable-info-conotainer")[0],selectable.getItems().length,selectable.getSelectedItems().length);
      $(item.node).find(".bottom-selected-container").find(".circleCheck").addClass("active");
      console.log("seleccione uno");
    });
    selectable.on("deselecteditem", function(item) {
      // console.log(item);
      console.log(selectable.getSelectedItems().length);
      oThis.appendMenuSelected($(".selectable-info-conotainer")[0],selectable.getItems().length,selectable.getSelectedItems().length);
      $(item.node).find(".bottom-selected-container").find(".circleCheck").removeClass("active");
      console.log("deseleccione uno");
    });

    oThis.appendpre(type);
  }

  imageZoom(object){
    // console.log(object.target);
    // console.log($(object.target).parents(':eq(4)'));
    let _this=this,
        zoomImage=$(".firms").find(".zoomImage"),
        container= $(object.target).parents(':eq(4)'),
        image= container.find(".img-container").find("img"),
        multiplo= 1.4,
        size= {
          width:container.width()*multiplo,
          height:container.height()+20
        },
        position= container.position(),
        x= Math.sign((position.top-((size.width-container.width())/2))) != -1 ? position.top-((size.width-container.width())/2) : 0,
        y= Math.sign((position.left-((size.width-container.width())/2))) != -1 ? position.left-((size.width-container.width())/2) : 0;
    let relativePotition= container[0].getBoundingClientRect();
    console.log(relativePotition);
    console.log(position);
    // zoomImage.find(".zoomImage-content").attr("src",image.attr("src")).css({"top":x,"left":y});
    const element = (
      <div className="zoomImage-content" style={{top: x, left:y, width: size.width}}>
        <span className="close" onClick={ _this.closeModal.bind(this,zoomImage) }>&times;</span>
        <img className="image-content" src={image.attr("src").replace("-2.", "-4.")}/>
        <div className="buttons-modal-image">
          <div className="circle-check-container"><div className="circle-check"></div></div>
          <div className="text-check-container"><span className="text">Seleccionar</span></div>
        </div>
      </div>
    );
    ReactDOM.render(element, zoomImage[0]);
    zoomImage.removeClass("hide");
    $(".zoomImage_layer").removeClass("hide");
  }

  closeModal(zoomImage,object){
    console.log("holasss");
    console.log(zoomImage);
    zoomImage.addClass("hide");
    $(".zoomImage_layer").addClass("hide");
  }
}

new SelectableImage;
