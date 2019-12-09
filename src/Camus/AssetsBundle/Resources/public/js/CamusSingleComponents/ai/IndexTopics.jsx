import React from 'react';
import $ from "jquery";
import ReactDOM from 'react-dom';
import Letter from "./../ctr/Letter.jsx";

class IndexTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'clicked': true,
      currentLetter: '',
      topics: {}
    }
  }

  initialize() {
    var _this = this;
    // $(alphabetContainer).click(function(){
    //   _this.changeState();
    // })
    var arrow = $(alphabetContainer).siblings(".head").find('.black-bar .arrow');
    arrow.click(function(){
      var lettersContainer = $(this).parent().parent().parent().find('.letters');
      lettersContainer.toggleClass('hideit');
      $(this).toggleClass('turned');
    })

    // if($(elAuthorButton).length > 0){
    //   var authorButton = ReactDOM.render(<AuthorButton /> , document.getElementById('sort-author-container'));
    // }
  }

  render(){
    var letters = [
      'A', 'B', 'C', 'D', 'E',
      'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O',
      'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y',
      'Z'
    ];
    var letter = this.state.currentLetter;
    var _this = this;
    var topics = this.state.topics;
    var list = (topics[letter] !== undefined) ? topics[letter]: [];
    return (
      <div>
        <div className="letters">
          {letters.map(function(name, index){
            return (
              <div className="letter-container">
                <Letter letter={name} current="current" handleLetterClick={_this.handleLetterClick.bind(_this)}/>
                <div className="tail">
                </div>
              </div>
            )
          })}
        </div>
        <div className="result">
          <ul>
            {list.map(function(topic, index){
              var textNormalized = topic.nameNormalized;
              return (<li><a href={'/temas/'+textNormalized}> {topic.name} </a></li>)
            })}
          </ul>
        </div>
      </div>
    )
  }

  handleLetterClick(letter, loaded){
    if(this.state.topics.hasOwnProperty(letter)){
      this.setState({
        currentLetter: letter
      });
    }else{
      $.ajax({
        method: "POST",
        url: "/topics/list",
        data: {
          letter: letter,
        },
        success: (data) => {
          var tempAuth = this.state.topics;
          tempAuth[letter] = data;
          this.setState({
            currentLetter: letter,
            topics: tempAuth
          });
        }
      });
    }
    if(!$(".media-container > .result").hasClass("hidden")){
      $(".media-container > .result").addClass("hidden");
    }
    $(".black-bar .letter span").text(letter);
  }

  changeState(){
    this.setState({
      'clicked' : !this.state.visible
    });
  }
}

var alphabetContainer = ".alphabet-topic #alphabet-container";
if($(alphabetContainer).length > 0){
  ReactDOM.render(<IndexTopics />, $(alphabetContainer)[0]);
}

export default IndexTopics;
