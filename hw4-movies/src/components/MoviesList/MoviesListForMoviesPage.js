import React from "react";
import css from "./MoviesListForMoviesPage.module.css";
import { Link, withRouter } from "react-router-dom";

const MoviesListForMoviesPage = ({ movies = [], location }) => (
  <>
    <ul className={css.moviesList}>
      {movies.map(({ id, poster_path, original_title, title, name }) => (
        <li key={id} className={css.moviesListItem}>
          <Link
            to={{
              pathname: `/movies/${id}`,
              state: { from: location },
            }}
          >
            <img
              className={css.moviesListItemImage}
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w400${poster_path}`
                  : "https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-inspirational-college-entrance-examination-struggle-blood-image_24742.jpg"
              }
              alt={`poster to film ${original_title}`}
            />
            {!poster_path && (
              <h2 className={css.withoutPoster}>
                {original_title || title || name}
              </h2>
            )}
            <h2 className={css.movieTitle}>
              {original_title || title || name}
            </h2>
          </Link>
        </li>
      ))}
    </ul>
  </>
);

export default withRouter(MoviesListForMoviesPage);
