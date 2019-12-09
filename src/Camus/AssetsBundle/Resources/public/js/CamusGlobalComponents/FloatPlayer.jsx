import $ from "jquery";

export default function FloatPlayer(father, element, keyword = null){
  try {
    if(father.find(".video-item").length === 0) throw false;
  } catch (e) {
    return e;
  }

  var floatElem = "",
  $window = $(window),
  videoTop = father.position().top,
  videoOffset = Math.floor(videoTop + father.outerHeight());

  if(keyword == "slick"){
    $window.on('scroll', function(){
      floatElem = father.find(element);
      if(floatElem.find(".video-item").length){
        if($window.scrollTop() > videoOffset){
          floatElem.parent().addClass("carousel-lock");
          floatElem.addClass("floated");
        }else{
          floatElem.parent().removeClass("carousel-lock");
          floatElem.removeClass("floated");
        }
      }
    });
  } else {
    $window.on('scroll', function(){
      floatElem = father.find(element);
      if($window.scrollTop() > videoOffset){
        floatElem.addClass("floated");
      }else{
        floatElem.removeClass("floated");
      }
    });
  }

  $(".btn-remove-floated").click(function() {
    if(keyword == "slick"){
      floatElem.parent().removeClass("carousel-lock");
    }
    floatElem.removeClass("floated");
    $window.off("scroll");
  });
}
