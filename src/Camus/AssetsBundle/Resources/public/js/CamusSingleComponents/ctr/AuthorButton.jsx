import React from 'react';
import $ from "jquery";
import ReactDOM from 'react-dom';
import Letter from "./Letter.jsx";
import Author from "./Author.jsx";

class AuthorButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 'none',
      currentLetter: '',
      loaded: false,
      color: "red",
      authors: {}
    };
  }

  handleLetterClick(letter, loaded) {
    if(this.state.authors.hasOwnProperty(letter)){
      if(this.state.authors[letter].length > 0){
        this.setState({
          color: "red",
          currentLetter: letter
        });
      }else{
        this.setState({
          color: "gray",
          currentLetter: letter
        });
      }
    }else{
      $.ajax({
        method: "GET",
        url: "/authors/list",
        data: {
          letter: letter,
          isCartoon: $(this.props.parent).data("cartoon")
        },
        success: (data) => {
          var tempAuth = this.state.authors;
          tempAuth[letter] = data;
          if (data.length > 0) {
            this.setState({
              currentLetter: letter,
              authors: tempAuth,
              color: "red"
            });
          }
          else{
            this.setState({
              currentLetter: letter,
              authors: tempAuth,
              color: "gray"
            });
          }
        }
      });
    }
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
    var _this = this;
    var letter = this.state.currentLetter;
    var authors = this.state.authors;
    var list = (authors[letter] !== undefined) ? authors[letter]: [];
    var color = this.state.color;
    return(
      <div className="button-container" onClick={this.clickedButton.bind(this)}>
        <span className="hint" data-camus-author-button="data-camus-author-button">A-Z ELEGIR AUTOR</span>
        <div className={this.state.visible + " author-modal"} onClick={this.handleClickList}>
          <div className="close-modal" onClick={this.clickedButton.bind(this)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
          <div className="alphabet-container">
            <div className="title-container text-with-open-serif-color-pencil-gray">Índice de Autores</div>
            {letters.map(function(name){
              return  <Letter key={name} letter={name} current={ letter == name ? "current" : "" } handleLetterClick={_this.handleLetterClick.bind(_this)} color={color} />
            })}
          </div>
          <div className="authors-container">
            {list.length > 0 ?
              list.map(function(name){
                return <Author author={name} />
              })
              :
              <div className="noAuthorsFound"> LO SENTIMOS, PARECE QUE NO ENCONTRAMOS NINGÚN AUTOR CON ESTA LETRA </div>
            }
          </div>
        </div>
      </div>
    );
  }

  clickedButton() {
    var view = (this.state.visible == 'none' || this.state.visible == undefined) ? 'block' : 'none';
    if(this.state.loaded == false){
      this.setState({'loaded': true});
      var letter = 'A';
      $.ajax({
        method: "GET",
        url: "/authors/list",
        data: {
          letter: letter,
          isCartoon: $(this.props.parent).data("cartoon")
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
    this.setState({'visible': view});
  }

  handleClickList(e) {
    e.stopPropagation();
  }
}

export default AuthorButton;
