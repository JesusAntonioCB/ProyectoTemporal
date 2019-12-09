import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import ScrollListener from 'react-scroll-listener';
import { Line } from 'rc-progress';

function ProgressBarRender(props) {
  var containerNewsBlock = $(".contenedor-notas-block, .nd-error404, #md-profile, .block-terms-conditions");

  if(containerNewsBlock.length) {
    return null;
  } else {
    return (
      <Line percent={props.perc} strokeLinecap="square" strokeColor="#E51B3F" style={{width: '100%',height: '5px'}}/>
    );
  }
}

class Scroll extends React.Component {
  constructor() {
    super();
    this.state = {
      perc: 0,
    };
    this.myScrollStartHandler = this.myScrollStartHandler.bind(this);
  }

  myScrollStartHandler(event) {
    var documentDOM = event.target;
    var perc = Math.max(0, Math.min(1, $(window).scrollTop()/($(documentDOM).height() - $(window).height()))) * 100;

    if (perc >= 1) {
      this.setState({ perc });
    } else {
      this.setState({ perc: 0 });
    }
  }

  componentDidMount() {
    var scrollListener = new ScrollListener();
    scrollListener.addScrollHandler('redband', this.myScrollStartHandler);
  }

  render() {
    return(
      <ProgressBarRender perc={this.state.perc} />
    );
  }
}

ReactDOM.render(<Scroll />, document.getElementById("container-redband"));

export default Scroll;
