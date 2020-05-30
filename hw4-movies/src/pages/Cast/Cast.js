import React, { Component } from "react";
import * as fetchAPI from "../../services/fetchAPI";
import css from "./Cast.module.css";

export default class Cast extends Component {
  state = { cast: [], isLoading: false };

  componentDidMount() {
    const { match } = this.props;
    const str = match.path;
    const id = parseInt(str.match(/\d+/));
    this.setState({ isLoading: true });
    fetchAPI.getCast(id).then(({ data }) => {
      this.setState({ cast: data.cast, isLoading: false });
    });
  }
  render() {
    const { cast } = this.state;
    return (
      <ul className={css.castList}>
        {cast.map(({ character, id, name, profile_path }) => (
          <li key={id} className={css.castListItem}>
            <img
              className={css.img}
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w400${profile_path}`
                  : "https://tanzolymp.com/images/default-non-user-no-photo-1.jpg"
              }
              alt={`${name}'s foto `}
            />
            <div>
              <p className={css.name}>{name}</p>
              <p className={css.character}>{`as ${character}`}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
