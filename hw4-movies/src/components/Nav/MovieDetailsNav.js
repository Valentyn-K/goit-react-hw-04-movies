import React from "react";
import { NavLink } from "react-router-dom";
import css from "./MovieDetailsNav.module.css";

const MovieDetailsNav = ({ params }) => (
  <ul className={css.list}>
    <li className={css.listItem}>
      <NavLink to={`/movies/${params.id}`} exact activeClassName={css.selected}>
        Overview
      </NavLink>
    </li>
    <li className={css.listItem}>
      <NavLink to={`/movies/${params.id}/cast`} activeClassName={css.selected}>
        Cast
      </NavLink>
    </li>
    <li className={css.listItem}>
      <NavLink
        to={`/movies/${params.id}/reviews`}
        activeClassName={css.selected}
      >
        Reviews
      </NavLink>
    </li>
  </ul>
);

export default MovieDetailsNav;
