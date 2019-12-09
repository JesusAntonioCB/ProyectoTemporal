import React from 'react';
import $ from "jquery";
import ReactDOM from 'react-dom';
import Letter from "./../ctr/Letter.jsx";

class IndexAuthors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'clicked': true,
      currentLetter: '',
      authors: {}
    }
  }

  initialize() {

    var _this = this;
    $(alphabetContainer).click(function(){
      _this.changeState();
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
    var authors = this.state.authors;
    var list = (authors[letter] !== undefined) ? authors[letter]: [];
    return (
      <div>
        <div className="letters">
          <div className="text">
            <span>Selecciona una letra</span>
          </div>
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
            {list.map(function(name, index){
              return (<li><a href={name.slug}> {name.authorName} </a></li>)
            })}
          </ul>
        </div>
      </div>
    )
  }

  handleLetterClick(letter, loaded){
    if(this.state.authors.hasOwnProperty(letter)){
      this.setState({
        currentLetter: letter
      });
    }else{
      $.ajax({
        method: "POST",
        url: "/authors/list",
        data: {
          letter: letter,
        },
        success: (data) => {
          var tempAuth = this.state.authors;
          tempAuth[letter] = data;
          this.setState({
            currentLetter: letter,
            authors: tempAuth
          });
        }
      });
    }
    if(!$(".media-container > .result").hasClass("hidden")){
      $(".media-container > .result").addClass("hidden");
    }
  }

  changeState(){
    this.setState({
      'clicked' : !this.state.visible
    });
  }
}

var alphabetContainer = ".alphabet-autor #alphabet-container";
if($(alphabetContainer).length > 0){
  ReactDOM.render(<IndexAuthors />, $(alphabetContainer)[0]);
}
export default IndexAuthors;
