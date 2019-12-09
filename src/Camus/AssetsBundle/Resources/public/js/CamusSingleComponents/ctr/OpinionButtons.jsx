import React from 'react';
import $ from "jquery";
import ReactDOM from 'react-dom';
import DateButton from "./DateButton.jsx";
import AuthorButton from "./AuthorButton.jsx"

class OpinionButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  initialize(blazy) {
    var elAuthorButton = "#sort-author-container";
    var elDateButton = "#sort-date-container";

    var losAuthorButton = ".sort-button";
    var losDateButton = ".date-button";

    $(losAuthorButton).each(function(){
      var authorButton = ReactDOM.render(<AuthorButton parent= {this}/> , this);
    });
    $(losDateButton).each(function(){
      var dateButton = ReactDOM.render(<DateButton parent= {this} blazy={blazy}/>, this);
    });

    // if($(elAuthorButton).length > 0){
    //   var authorButton = ReactDOM.render(<AuthorButton /> , document.getElementById('sort-author-container'));
    // }
    // if($(elDateButton).length > 0){
    //   var dateButton = ReactDOM.render(<DateButton />, document.getElementById('sort-date-container'));
    // }
  }
}

export default OpinionButtons;
