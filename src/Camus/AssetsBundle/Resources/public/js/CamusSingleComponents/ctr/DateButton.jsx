import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import Calendar from "react-calendar-pane";
import moment from 'moment';
import ModuleShareButtons from "./../../CamusGlobalComponents/ModuleShareButtons.jsx";
import slick from "slick-carousel";
import Slider from "./../../CamusSingleComponents/sli/Slider.jsx";

class DateButton extends React.Component {
  constructor(props) {
    super(props);
    var date = this.getQuery('date') != null ? new Date(this.getQuery('date')) : new Date();
    date.setMinutes(date.getMinutes() +  date.getTimezoneOffset());
    this.state = {
      visible: 'none',
      date: date
    };
  }

  render(){
    var formattedDate = this.state.date.getDate()+'.'+(this.state.date.getMonth() + 1)+'.'+this.state.date.getFullYear();
    return(
      <div className="button-container" onClick={this.clickedButton.bind(this)}>
        <span className="hint" data-camus-author-button="data-camus-author-button">ELEGIR</span>
        <span className="fa fa-calendar hint"></span>
        <span className="date-container hint">{formattedDate}</span>
        <div className={this.state.visible + " date-modal"} onClick={this.handleClickCalendar} >
          <div className="close-modal" onClick={this.clickedButton.bind(this)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
          <Calendar
            locale="es"
            onSelect={this.onSelect.bind(this)}
            date={moment(this.state.date, "YYYY-MM-DD")} />
        </div>
      </div>
    );
  }

  clickedButton() {
    var view = (this.state.visible == 'none' || this.state.visible == undefined) ? 'block' : 'none';
    this.setState({'visible': view});
  }

  handleClickCalendar(e) {
    e.stopPropagation();
  }

  onSelect(date, previousDate, currentMonth) {
    this.setState({date: new Date(date)});
    var parentModule = $(this.props.parent).parent().parent().parent();
    var idModule = parentModule.attr('data-id');
    var oThis = this;
    this.setState({'visible': 'none'});
    var domain = document.location.pathname;
    var splitDomain = domain.split("/");
    var place = "nacional";
    if(splitDomain[1].indexOf("app") >= 0){
      if(splitDomain.length <= 4){
        if(splitDomain[2] == "opinion"){
          if(splitDomain[3] !== undefined){
            place = splitDomain[3];
          }
        }
      }
    }else if(splitDomain[1].indexOf("opinion") >= 0){
      if(splitDomain.length <= 3){
        if(splitDomain[2] !== undefined){
          place = splitDomain[2];
        }
      }
    }
    $.ajax({
      method: "GET",
      url: "/authors/date",
      data: {
        date: date.format('YYYY-MM-DD'),
        place: place
      },
      success: (data) => {
        if(data.length > 2){
          if (parentModule.find('.slick-track').length == 0) {
            var parentElem = "";
            if($(parentModule).has('.sn-opinion').length) {
              $(parentModule).find(".list").append('<div class="temporal-data" style="display:none;">'+data+'</div>');
              parentElem = $(parentModule).find(".sn-opinion").first();
            } else {
              $(parentModule).parent().append('<div class="temporal-data" style="display:none;">'+data+'</div>');
              parentElem = parentModule.next();
            }
            var i = -1;
            oThis.findModulesOpinionRecursive(parentElem,$(".temporal-data").children(),i);
            $(".temporal-data").remove();
          }else {
            var slidesContainer = parentModule.find('.firms');
            slidesContainer.slick('unslick');
            slidesContainer.empty();
            var jData = $('<div></div>').html(data);
            slidesContainer.append(jData.html());
            var moduleContainer = parentModule[0];
            var slider = new Slider(moduleContainer);
          }
          $(".social-media, .social-media-large").each(function(){
            var socialUrl = $(this).siblings("span[data-social-link]");
            if(socialUrl.length){
              var socialTitle = $(socialUrl[0]).attr('data-social-title');
              socialUrl = $(socialUrl[0]).attr('data-social-link');
              ReactDOM.render(<ModuleShareButtons url={socialUrl}  title={socialTitle} parent={this.className} />, this);
            }
          });
          this.props.blazy.revalidate();
        }else{
          alert("No se encontraron resultados para esta fecha");
        }
      }
    });
    return true;
  }

  findModulesOpinionRecursive(brotherModule /* elementDOM */ ,newModules /* array of elementsDOM */, count){
    count = count + 1;
    if($(brotherModule).attr('data-camus-template') == 'sn_opinion_base'){
      if(typeof newModules[count] === 'undefined'){
        brotherModule.find('.firms-note').empty();
        this.findModulesOpinionRecursive(brotherModule.next(),newModules,count);
      }else{
        var refOldModule = brotherModule.next();
        brotherModule.replaceWith(newModules[count]);
        this.findModulesOpinionRecursive(refOldModule,newModules,count);
      }
    }else if($(brotherModule).attr('data-camus-module-type') == 'ad'){
      count = count - 1;
      this.findModulesOpinionRecursive(brotherModule.next(),newModules,count);
    }else if(typeof newModules[count] !== 'undefined'){
      var leftModules = newModules.slice(count,newModules.length);
      brotherModule.before(leftModules);
    }
  }

  getQuery(q) {
   return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
  }
}



export default DateButton;
