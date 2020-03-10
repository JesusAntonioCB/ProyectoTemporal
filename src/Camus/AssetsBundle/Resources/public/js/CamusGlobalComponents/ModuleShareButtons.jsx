import React from 'react';
import ReactDOM from 'react-dom';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';

import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

function SocialMedia(props){
  var shareUrl = window.location.protocol+'//'+window.location.host+props.url,
      whatsappUrl = 'whatsapp://send?text='+encodeURIComponent(shareUrl);
      if(shareUrl.indexOf('_fragment?') >= 0){
        shareUrl = window.location.href;
      }
  switch(props.parent){
    case "social-media":
    return(
    <div className="share-social-media">
      <TwitterShareButton
        url={shareUrl}
        title= {props.title}
        //via="fama_revista"
        className="twitter-share-modules">
        <i className="fa fa-twitter" aria-hidden="true"></i>
      </TwitterShareButton>
      <FacebookShareButton
        url={shareUrl}
        quote= {props.title}
        className="facebook-share-modules">
          <i className="fa fa-facebook" aria-hidden="true"></i>
      </FacebookShareButton>
      <WhatsappShareButton
        url={shareUrl}
        title={props.title}
        separator= " - "
        className="whatsapp-share-modules">
          <i className="fa fa-whatsapp" aria-hidden="true"></i>
      </WhatsappShareButton>
    </div>
    );
    break;
    case "social-media-large":
    //Button see more
    // <div role="button" id="share-icons-more" className="more share-container"></div>
    return (
    <div className="share-social-media-large">
      <FacebookShareButton
        url={shareUrl}
        quote= {props.title}
        className="facebook-share-modules share-container">
          <i className="fa fa-facebook" aria-hidden="true"></i>
          <span>Comparte en Facebook</span>
      </FacebookShareButton>
      <TwitterShareButton
        url={shareUrl}
        title= {props.title}
        via="fama_revista"
        className="twitter-share-modules share-container">
          <i className="fa fa-twitter" aria-hidden="true"></i>
          <span>Comparte en Twitter</span>
      </TwitterShareButton>
      <WhatsappShareButton
        url={shareUrl}
        title={props.title}
        separator= " - "
        className="whatsapp-share-modules share-container">
          <i className="fa fa-whatsapp" aria-hidden="true"></i>
          <span>Comparte en Whatsapp</span>
      </WhatsappShareButton>
    </div>
    );
    break;
    case "share-body-down":
    return (
      <div className="sf-share">
        <div className="sfs-container">
          <FacebookShareButton
            url={shareUrl}
            quote= {props.title}
            className="ShareButton">
            <div className="sfs-icon"> <i className="fa fa-facebook-official"> </i></div>
              <span> Facebook </span>
          </FacebookShareButton>
          <TwitterShareButton
            url={window.location.href}
            title={props.title}
            via="fama_revista"
            className="ShareButton">
            <div className="sfs-icon"> <i className="fa fa-twitter"> </i></div>
              <span> Twitter </span>
          </TwitterShareButton>
          <WhatsappShareButton
            url={shareUrl}
            title={props.title}
            separator= " - "
            className="ShareButton">
            <div className="sfs-icon"> <i className="fa fa-whatsapp"> </i></div>
            <span> Whatsapp </span>
          </WhatsappShareButton>
        </div>
      </div>
    );
      break;
    case "social-media-buttons":
    return (
      <div className="share-social-media-buttons">
        <FacebookShareButton
          url={props.url}
          quote= {props.title}
          className="facebook-share-modules share-container">
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={props.url}
          title= {props.title}
          className="twitter-share-modules share-container">
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={props.title}
          separator= " - "
          className="whatsapp-share-modules share-container">
            <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>
    );
    break;
  }
}

class ModuleShareButtons extends React.Component{
  constructor(container) {
    super();
    this.state = {
      container: container
    };
  }

  render(props){
    return (
      <SocialMedia title={this.props.title} url={this.props.url} parent={this.props.parent} />
    );
  }
}

export default ModuleShareButtons;
