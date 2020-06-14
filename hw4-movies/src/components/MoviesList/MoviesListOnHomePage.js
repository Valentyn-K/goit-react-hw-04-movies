import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import StarRoundedIcon from "@material-ui/icons/StarRounded/";
import Button from "@material-ui/core/Button/";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import css from "./MoviesListOnHomePage.module.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const settings = {
  slidesToShow: 4,
  slidesToScroll: 3,
};

const MoviesListOnHomePage = ({ trendingMovies = [], match, location }) => {
  return (
    <div className={css.container}>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={6000}
        bullets={false}
        className={css.AwesomeSliderBody}
      >
        {trendingMovies.map(
          ({ id, original_title, name, vote_average, backdrop_path }) => (
            <div key={id} className={css.slideWraper}>
              <div className={css.filmInfo}>
                <div className={css.imgOverlay}>
                  <div className={css.filmAbout}>
                    <h2 className={css.filmTitle}>{original_title || name}</h2>
                    <div className={css.ratingWraper}>
                      <StarRoundedIcon className={css.icon} />
                      <span
                        className={css.ratingStats}
                      >{`${vote_average}/10`}</span>
                    </div>
                    <Link
                      to={{
                        pathname: `/movies/${id}`,
                        state: { from: location.state },
                      }}
                    >
                      <Button variant="outlined" color="secondary">
                        Click to watch
                      </Button>
                    </Link>
                  </div>
                </div>

                <img
                  className={css.imgBackdrop}
                  src={`https://image.tmdb.org/t/p/w400${backdrop_path}`}
                  alt={`poster to film ${original_title}`}
                />
              </div>
            </div>
          )
        )}
      </AutoplaySlider>

      <h2>Recommend you review</h2>

      <Slider {...settings} className={css.slickCarousel}>
        {trendingMovies.map(({ poster_path, original_title, id, name }) => (
          <div key={id} className={css.slickCarouselItem}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: { from: location },
              }}
            >
              <img
                className={css.imgPoster}
                src={`https://image.tmdb.org/t/p/w400${poster_path}`}
                alt={`poster to film ${original_title}`}
              />
              <h3 className={css.slickCarouselFilmTitle}>
                {original_title || name}
              </h3>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default withRouter(MoviesListOnHomePage);

MoviesListOnHomePage.propTypes = {
  trendingMovies: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string,
      original_title: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
};

MoviesListOnHomePage.defaultProps = {
  trendingMovies: [],
  poster_path: "",
  original_title: "",
  id: Date.now,
  name: "",
};
