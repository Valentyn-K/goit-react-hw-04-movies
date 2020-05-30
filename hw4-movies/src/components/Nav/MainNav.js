import React from "react";
import { NavLink } from "react-router-dom";
import css from "./MainNav.module.css";

const MainNav = ({ location }) => (
  <ul className={css.NavList}>
    <li className={css.NavListItem}>
      <NavLink
        to={{
          pathname: "/",
          state: { from: location },
        }}
        exact
        activeClassName={css.selected}
      >
        Home
      </NavLink>
    </li>
    <li className={css.NavListItem}>
      <NavLink
        to={{
          pathname: "/movies",
          state: { from: location },
        }}
        activeClassName={css.selected}
      >
        Movies
      </NavLink>
    </li>
  </ul>
);

export default MainNav;
