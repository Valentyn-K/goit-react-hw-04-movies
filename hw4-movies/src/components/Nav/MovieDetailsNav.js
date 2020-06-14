import React from "react";
import { NavLink } from "react-router-dom";
import css from "./MovieDetailsNav.module.css";

const MovieDetailsNav = ({ history, match, location }) => (
  <ul className={css.list}>
    <li className={css.listItem}>
      <NavLink
        to={{
          pathname: `/movies/${match.params.id}`,
          state: { from: location.state.from },
        }}
        exact
        activeClassName={css.selected}
      >
        Overview
      </NavLink>
    </li>
    <li className={css.listItem}>
      <NavLink
        to={{
          pathname: `/movies/${match.params.id}/cast`,
          state: { from: location.state.from },
        }}
        activeClassName={css.selected}
      >
        Cast
      </NavLink>
    </li>
    <li className={css.listItem}>
      <NavLink
        to={{
          pathname: `/movies/${match.params.id}/reviews`,
          state: { from: location.state.from },
        }}
        activeClassName={css.selected}
      >
        Reviews
      </NavLink>
    </li>
  </ul>
);

export default MovieDetailsNav;
