import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Calendar from "react-calendar-pane";

class DateModal extends React.Component{
  constructor(props) {
    super(props)
    var date = this.props.date == '' ? null : this.props.date;
    this.state = {
      date: date,
      visible: 'none'
    };
  }

  render(){
    var formattedDate = moment(this.state.date).format('YYYY.MM.DD') == 'Invalid date' ? '' : moment(this.state.date).format('YYYY.MM.DD');
    var scoredDate = moment(this.state.date).format('YYYY-MM-DD') == 'Invalid date' ? '' : moment(this.state.date).format('YYYY-MM-DD');
    var calendarDate = scoredDate == '' ? moment().format('YYYY/MM/DD') : moment(scoredDate).format('YYYY/MM/DD');
    var period = this.props.period + "-date";
    return(
      <div className="button-container" onClick={this.clickedButton.bind(this)}>
        <span className="date-container hint">{formattedDate}</span>
        <span className="fa fa-calendar hint"></span>
        <div className={this.state.visible + " date-modal"} onClick={this.handleClickCalendar} >
          <div className="close-modal" onClick={this.clickedButton.bind(this)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
          <Calendar
            locale="es"
            onSelect={this.onSelect.bind(this)}
            date={moment(calendarDate, 'YYYY-MM-DD')} />
        </div>
        <input type="date" name={period} className="filter-input" disabled value={scoredDate} />
      </div>
    );
  }

  clickedButton() {
    var view = (this.state.visible == 'none' || this.state.visible == undefined) ? 'block' : 'none';
    this.setState({'visible': view});    ;
  }

  handleClickCalendar(e) {
    e.stopPropagation();
  }

  onSelect(date, previousDate, currentMonth) {
    this.setState({date: moment(date, 'YYYY-MM-DD')});
    this.clickedButton();

    return true;
  }
}

export default DateModal;
