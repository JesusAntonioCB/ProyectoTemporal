import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import Calendar from "react-calendar-pane";
import moment from 'moment';
//import ModuleShareButtons from "./../../CamusGlobalComponents/ModuleShareButtons.jsx";

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
        <div className={this.state.visible + " date-modal"} onClick={this.handleClickCalendar}>
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
    var parentModule = $(this.props.parent).parent().parent();
    var idModule = parentModule.attr('data-id');
    var oThis = this;
    this.setState({'visible': 'none'});
    var newLocation = window.location.href.replace(/\?date=[0-9-]+/, '');

    if(date.format('DD') <= moment().format('DD') ){
      window.location = newLocation += '?date=' + date.format('YYYY-MM-DD');
    } else{
      alert("No se encontraron resultados para esta fecha");
    }

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
