import React from "react";
import css from "./Overview.module.css";
import StarRoundedIcon from "@material-ui/icons/StarRounded/";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import shortid from "shortid";

const Overview = ({
  id,
  poster_path,
  original_title,
  title,
  name,
  overview,
  genres,
  production_countries,
  release_date,
  runtime,
  vote_average,
}) => (
  <div className={css.container}>
    <p key={shortid.generate()} className={css.genres}>
      Genres:
      {genres &&
        genres.map((genre) => (
          <span key={genre.name}>{` ${genre.name},`}</span>
        ))}
    </p>
    <p
      key={shortid.generate()}
      className={css.releaseDate}
    >{`Release: ${release_date}`}</p>
    <p key={shortid.generate()} className={css.productionCountries}>
      Production countries:
      {production_countries &&
        production_countries.map((country) => (
          <span key={country.name}>{` ${country.name},`}</span>
        ))}
    </p>
    <p key={shortid.generate()} className={css.runtime}>
      <SlowMotionVideoIcon /> {`${runtime} min`}
    </p>
    <p key={shortid.generate()} className={css.voteAverage}>
      <StarRoundedIcon />
      {`${vote_average} / 10`}
    </p>

    <p key={shortid.generate()} className={css.overview}>
      <p>Overview:</p> {overview}
    </p>
  </div>
);

export default Overview;
