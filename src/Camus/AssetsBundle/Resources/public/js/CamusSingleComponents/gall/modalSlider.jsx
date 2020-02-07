import $ from "jquery";

class modalSlider{
  constructor(){
    this.init();
  }
  init(){
    $('body').on('click', '.sn-bottom-text-gallery .img-container, .sn-bottom-text-gallery .headline-bottom-container-gradient .title a',function(e) {
      e.preventDefault();
      if (!$(".bottom-selected-container").length) {
        $("body, html").css({
          "overflow":"hidden",
        });
        $(".modal").toggleClass("hide");
        var fatherSli= $(".modal").find(".sli-modal").find(".gallery-slider").find(".father-sli"),
            childSli= $(".modal").find(".sli-child").find(".gallery-slider").find(".child-sli");
        if (typeof $(this).attr("data-index") !== typeof undefined && $(this).attr("data-index") !== false) {
          fatherSli.slick('slickGoTo', $(this).attr("data-index"));
          childSli.slick('slickGoTo', $(this).attr("data-index"));
          fatherSli.slick('refresh');
          fatherSli.slick('slickPause');
        }
      }
    });
  }
}
new modalSlider();
export default modalSlider;
