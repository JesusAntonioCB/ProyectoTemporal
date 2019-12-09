import React from 'react';
import $ from "jquery";

class Author extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var authorImage = (this.props.author.authorThumb == null) ? '/bundles/applicationcamusassets/images/placeholder.jpg' : this.props.author.authorThumb;
    return (
      <div className="author">
        <a href={this.props.author.slug}>
          <img className="author-image" src={authorImage} />
          <div className="author-info">
            <div className="title-container">{ this.props.author.authorName }</div>
            <div className="column-container">{ this.props.author.columName }</div>
          </div>
        </a>
      </div>
    );
  }
}

export default Author;
