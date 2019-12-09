import React from 'react';
import $ from "jquery";

class Letter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'selected': false,
      'loaded': false
    };
  }

  render() {
    return (
      <span className={"letter " + this.props.current+" "+this.props.color} onClick={this.handleLetterClick.bind(this)}>{this.props.letter}</span>
    );
  }

  handleLetterClick() {
    if(this.state.loaded){
      this.props.handleLetterClick(this.props.letter, false);
      return false
    }else{
      this.setState({
        'selected': this.state.selected,
        'loaded': true
      });
      this.props.handleLetterClick(this.props.letter, true);
    }
  }
}

export default Letter;
