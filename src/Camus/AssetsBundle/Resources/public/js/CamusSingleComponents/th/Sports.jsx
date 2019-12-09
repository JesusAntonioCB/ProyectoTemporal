define(['jquery', './../boards/view'] , function ($, View) {
    //require("./../../css/penals/penal.css");

    function penal () {
        View.call(this);
        this.overFlowState = "";
    };

    penal.prototype = Object.create(View.prototype);
    penal.prototype.constructor = penal;

    penal.prototype.init = function() {
        View.prototype.init.call(this);
        var _this = this;
        //this.view.addClass("penal-base");
        this.view.on('click', function() {
            _this.remove();
        });
    };

    penal.prototype.show = function() {
        this.view.css("top",this.view.parent().scrollTop());
        this.overFlowState = this.view.parent().css("overflow");
        if(this.overFlowState != "hidden") {
            this.view.parent().css("overflow", "hidden");
        }
    };

    penal.prototype.remove = function() {
        this.view.parent().css("overflow", this.overFlowState);
        View.prototype.remove.call(this);
    };
    return penal;
});
um = parseInt(home) + parseInt(away);
      var min = 10 - sum;
      var numItems = $('.bg').length;

      if(numItems != min){
        alert('Los penales no coinciden');
      }
    });
  }
}

export default Sports;
