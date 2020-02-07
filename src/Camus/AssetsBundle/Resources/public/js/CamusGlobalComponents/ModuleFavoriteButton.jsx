import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

function addFavorite(item){
  $(item.target).toggleClass('active');
  $(item.target).toggleClass('is_animating');
  $(item.target).parent().css("opacity","1");
}

function FavButton(props){
  return(
    <div className="fav-btn">
      <span className="favme fa fa-heart" onClick={ addFavorite.bind(this) } ></span>
    </div>
  );
}

class ModuleFavoriteButton extends React.Component{
  render(){
    return (
      <FavButton />
    );
  }
}

export default ModuleFavoriteButton;
