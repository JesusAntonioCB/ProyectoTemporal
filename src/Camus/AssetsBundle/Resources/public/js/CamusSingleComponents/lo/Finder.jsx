import React from 'react';
import $ from "jquery";
import ReactDOM from 'react-dom';
import DateModal from './DateModal.jsx';

class Finder extends React.Component{
  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize() {
    var startDateContainer = $('#start-date-container');
    var endDateContainer = $('#end-date-container');
    if (startDateContainer.length > 0) {
      var valueDate = startDateContainer.attr('value');
      var startDate = ReactDOM.render(<DateModal parent= {startDateContainer[0]} period="start" date={valueDate} /> , startDateContainer[0]);
    }
    if (endDateContainer.length > 0) {
      var valueDate = endDateContainer.attr('value');      
      var endDate = ReactDOM.render(<DateModal parent= {endDateContainer[0]} period="end" date={valueDate} />, endDateContainer[0]);
    }
  }
}

export default Finder;
