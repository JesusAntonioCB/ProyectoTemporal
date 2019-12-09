import React from 'react';
import $ from "jquery";
import ReactDOM from 'react-dom';
import OpinionDateButton from "../CamusSingleComponents/ctr/DateButton.jsx";
import CartoonDateButton from "../CamusSingleComponents/list/DateButton.jsx";
import AuthorButton from "../CamusSingleComponents/ctr/AuthorButton.jsx";

class FilterButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  initialize(blazy) {
    var losAuthorButton = $(".sort-button, .sort-button-cartoon");
    var losDateButton = $(".date-button, .date-button-cartoon");

    if(losAuthorButton.length || losDateButton.length){
      losAuthorButton.filter(".sort-button-cartoon").data("cartoon", true);
      losAuthorButton.filter(".sort-button").data("cartoon", false);
      losAuthorButton.each(function(){
        var authorButton = ReactDOM.render(<AuthorButton parent={this}/> , this);
      });

      losDateButton.filter(".date-button").each(function(){
        var dateButton = ReactDOM.render(<OpinionDateButton parent={this} blazy={blazy}/>, this);
      });

      losDateButton.filter(".date-button-cartoon").each(function(){
        var dateButton = ReactDOM.render(<CartoonDateButton parent={this} blazy={blazy}/>, this);
      });
    }
  }
}

export default FilterButtons;
