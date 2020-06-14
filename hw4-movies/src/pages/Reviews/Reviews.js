import React, { Component } from "react";
import * as fetchAPI from "../../services/fetchAPI";

export default class Reviews extends Component {
  state = { reviews: [] };

  componentDidMount() {
    const { match } = this.props;
    const str = match.path;
    const id = parseInt(str.match(/\d+/));
    fetchAPI.getReviews(id).then(({ data }) => {
      this.setState({ reviews: data.results });
    });
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
        <h1>Reviews</h1>
{    reviews.length>0 ?
        <ul>
          {reviews.map(({ author, content, id }) => (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul> : <p>There are no reviews to this movie</p>
}      </>
    );
  }
}
