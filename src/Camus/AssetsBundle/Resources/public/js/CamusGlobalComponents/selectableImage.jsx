import $ from "jquery";
import Selectable from 'selectable.js';
import React from 'react';
import ReactDOM from 'react-dom';
import slick from "slick-carousel";

class SelectableImage{
  constructor() {
    this.state = {
      selectable: ""
    };
    this.selected();
  }

  selected(){
    let oThis=this;
    if ($(".menu-control-gallery").length) {
      oThis.appendpre();
    }
  }

  selectall(){
    let _this=this;
    _this.state.selectable.selectAll();
  }

  deselected(object){
    let oThis=this;
    oThis.state.selectable.clear();
  }

  // presentation(){
  //   let _this=this;
  //   if (!$(".bottom-selected-container").length){
  //     $("body, html").css({
  //       "overflow":"hidden",
  //     });
  //     $(".modal").toggleClass("hide");
  //     var fatherSli= $(".modal").find(".sli-modal").find(".gallery-slider").find(".father-sli"),
  //         fatherHead= $(".modal").find(".sli-modal").find(".media-container").find(".header-cartoon"),
  //         childSli= $(".modal").find(".sli-child").find(".gallery-slider").find(".child-sli"),
  //         modalMenu= $(".modal"),
  //         autoSlider= $(".modal").find(".sli-child").find(".media-container").find(".detail-container");
  //
  //     fatherSli.slick('slickGoTo', 0);
  //     childSli.slick('slickGoTo', 0);
  //     fatherSli.slick('refresh');
  //     fatherSli.slick('slickPause');
  //
  //     autoSlider.find(".auto-start").toggleClass("start");
  //     autoSlider.find(".text-container").find(".fa").toggleClass("fa-play").toggleClass("fa-pause");
  //
  //     if (autoSlider.find(".auto-start").hasClass("start")) {
  //       fatherSli.find(".slick-initialized").slick('slickPlay');
  //       fatherHead.find(".btn-buy").addClass("hide");
  //
  //       modalMenu.find(".gallery-slider").mousemove(function(){
  //         var i = null;
  //         clearTimeout(i);
  //         modalMenu.find(".sli-child").stop().slideDown(500);
  //         fatherHead.stop().slideDown(500);
  //         modalMenu.find(".sli-child").stop().removeClass("hide");
  //         modalMenu.find(".gallery-container").stop().removeClass("child-hide-pre");
  //         modalMenu.find(".left").stop().removeClass("fade");
  //         modalMenu.find(".right").stop().removeClass("fade");
  //
  //         i = setTimeout(function(){
  //           modalMenu.find(".sli-child").stop().slideUp(500);
  //           fatherHead.stop().slideUp(500);
  //           modalMenu.find(".sli-child").stop().addClass("hide");
  //           modalMenu.find(".gallery-container").stop().addClass("child-hide-pre");
  //           modalMenu.find(".left").stop().addClass("fade");
  //           modalMenu.find(".right").stop().addClass("fade");
  //         }, 5000);
  //       });
  //
  //       if (modalMenu.find(".modal-carruseles-container").hasClass("menu-active")) {
  //         $(".modal-left-menu, modal-carruseles-container").toggleClass("menu-active");
  //         $(".firms, .thin-data, .gallery-container").slick('refresh');
  //         $(".firms, .thin-data, .gallery-container").slick('slickPause');
  //       }
  //     }else {
  //       fatherSli.find(".slick-initialized").slick('slickPause');
  //       fatherHead.find(".btn-buy").removeClass("hide");
  //     }
  //   }
  // }

  appendpre(type=""){
    let _this=this;
    switch (type) {
        case "CancelMenu":
          var element = (
          <div className="top-content">
            <div className="buttons-top-content">
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
              <div className="subbuttons btnCancel" onClick={ _this.appendpre.bind(this,"") }>
                <div className="letras">CANCELAR</div>
              </div>
            </div>
          </div>
        );
        var it=$(".selectable-info-conotainer");
        it.find(".menu-selected-content").removeClass("hide");
        ReactDOM.render(element, $(".menu-control-gallery")[0]);
        // Selectable.destroy();
        // ReactDOM.unmountComponentAtNode($(".selectable-info-conotainer")[0]);
      break;
      case "sel-photos":
        var element = (
          <div className="top-content">
            <div className="buttons-top-content">
            <div className="subbuttons">
              <div className="letras"><span className="fa fa-book"></span>CREAR ÁLBUM</div>
            </div>
            <div className="subbuttons">
              <div className="letras"><span className="fa fa-shopping-cart"></span>COMPRAR SELECCION</div>
            </div>
              <div className="subbuttons">
                <div className="letras">GUARDAR PARA MAS TARDE</div>
              </div>
              <div className="subbuttons hide" id="Share">
                <div className="letras">COMPARTIR</div>
              </div>
              <div className="subbuttons btnCancel" onClick={ _this.appendpre.bind(this,"") }>
                <div className="letras">CANCELAR</div>
              </div>
            </div>
          </div>
        );
        var it=$(".selectable-info-conotainer");
        it.find(".menu-selected-content").removeClass("hide");
        ReactDOM.render(element, $(".menu-control-gallery")[0]);

        break;
      case "":
        var element = (
        <div className="top-content">
          <div className="buttons-top-content">
            <div className="subbuttons btnSelectable" onClick={ _this.initSelectable.bind(this) }>
              <div className="letras">SELECCIONAR FOTOS</div>
            </div>
            <div className="subbuttons buy">
              <div className="letras">
                <span className="fa fa-shopping-cart"></span>COMPRAR <span className="downbutton">&#9660;</span>
              </div>
              <div className="div-top-content">
                <div className="div-top-buy" onClick={ _this.appendpre.bind(this,"sel-photos"), _this.initSelectable.bind(this) }>
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
            <div className="subbuttons" id="Share">
              <div className="letras">COMPARTIR</div>
            </div>
            <div className="subbuttons btnPresentation">
              <div className="letras" ><span className="leftButton">&#9658;</span>PASE DE DIAPOSITIVAS</div>
            </div>
          </div>
        </div>
        );
        var items= $(".sn-bottom-text-gallery");
        var it=$(".selectable-info-conotainer");
        it.find(".menu-selected-content").addClass("hide");
        items.find(".bottom-selected-container").remove();
        items.find(".headline-bottom-container-gradient").removeClass("hide");
        if (typeof(selectable)== "object") {
          console.log(selectable);
        }
        if (typeof(_this.state.selectable)== "object") {
          _this.state.selectable.destroy();
        }
        ReactDOM.render(element, $(".menu-control-gallery")[0]);
        // ReactDOM.unmountComponentAtNode($(".sn-bottom-text-gallery")[0]);
      break;
    }
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
      // console.log(element, this);
    });
  }

  appendMenuSelected(item,galleryCount,gallerySelected){
    let _this=this;
    const element = (
      <div className="menu-selected-content">
        <div className="selected-buttons">
          <div className="buttons-container">
            Seleccionar: <a className="btn-all" href="#" onClick={_this.selectall.bind(this)}>Todo</a> | <a className="btn-nothing" href="#" onClick={_this.deselected.bind(this)}>Ninguno</a>
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
    var type= "";
    const selectable = new Selectable({
       filter: ".sn-bottom-text-gallery",
       ignore: [".headline-bottom-container-gradient", ".fav-container",".bottom-selected-container"],
       toggle: true,
       lasso: {
          border: "1px dashed rgba(98, 2, 2, 1)",
          backgroundColor: "rgba(255, 255, 255, 0.4)"
        }
    });
    oThis.state.selectable = selectable;
    selectable.on("init", function() {
      if ($(".selectable-info-conotainer").length) {
        // console.log("init dentro del ico container");
        // console.log(selectable.getItems());
        // console.log(selectable.getItems().length);
        oThis.appendMenuSelected($(".selectable-info-conotainer")[0],selectable.getItems().length,selectable.getSelectedItems().length);
      }
      var items= $(".sn-bottom-text-gallery");
      items.find(".headline-bottom-container-gradient").addClass("hide");
      // items.find(".fav-container").addClass("hide");
      items.find(".media-container").append('<div class="bottom-selected-container"></div>');
      oThis.appendCheked(items.find(".bottom-selected-container"));
    });
    selectable.on("selecteditem", function(item) {
      oThis.appendMenuSelected($(".selectable-info-conotainer")[0],selectable.getItems().length,selectable.getSelectedItems().length);
      $(item.node).find(".bottom-selected-container").find(".circleCheck").addClass("active");
      console.log("seleccione uno");
    });
    selectable.on("deselecteditem", function(item) {
      console.log(item);
      // console.log(selectable.getSelectedItems().length);
      oThis.appendMenuSelected($(".selectable-info-conotainer")[0],selectable.getItems().length,selectable.getSelectedItems().length);
      $(item.node).find(".bottom-selected-container").find(".circleCheck").removeClass("active");
      console.log("deseleccione uno");
    });
    if ($(".buttons-top-content").find(".buySelectable")) {
      type = "sel-photos"
    }else {
      type = "CancelMenu"
    }
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
    zoomImage.addClass("hide");
    $(".zoomImage_layer").addClass("hide");
  }
}

new SelectableImage;
