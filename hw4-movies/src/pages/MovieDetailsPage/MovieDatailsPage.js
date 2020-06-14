import React, { Component, lazy, Suspense } from "react";
import * as fetchAPI from "../../services/fetchAPI";
import MovieDetailsNav from "../../components/Nav/MovieDetailsNav";
import { Route, Switch } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import Loader from "../../components/Loader/Loader";

const AsyncOverview = lazy(() =>
  import("../Overview/Overview" /*webpackChankName: "overview" */)
);

const AsyncCast = lazy(() =>
  import("../Cast/Cast" /*webpackChankName: "cast" */)
);

const AsyncReviews = lazy(() =>
  import("../Reviews/Reviews" /*webpackChankName: "reviews" */)
);

const AsyncNotFound = lazy(() =>
  import("../NotFound/NotFound" /*webpackChankName: "not-found" */)
);

export default class MovieDatailsPage extends Component {
  state = { movieGeneralData: {}, isLoading: false };

  componentDidMount() {
    const { match } = this.props;
    this.setState({ isLoading: true });
    fetchAPI.getInfoAboutFilmByID(match.params.id).then(({ data }) => {
      this.setState({ movieGeneralData: data, isLoading: false });
    });
  }

  handleGoBack = (e) => {
    const { history, location } = this.props;
    if (location.state) {
      return history.push(location.state.from);
    }

    // history.push(history.location.state);
  };

  render() {
    const { match } = this.props;
    const {
      isLoading,
      movieGeneralData: { poster_path, original_title, title, name },
    } = this.state;
    return (
      <div className={css.container}>
        {isLoading && <Loader />}
        <h2 className={css.title}>{original_title || title || name}</h2>
        <div className={css.navContainer}>
          <GoBackButton {...this.props} onGoBack={this.handleGoBack} />
          <MovieDetailsNav {...this.props} className={css.nav} />
        </div>
        <div className={css.movieDetailsWrapper}>
          <div className={css.imgWrapper}>
            <img
              className={css.img}
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w400${poster_path}`
                  : "https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-inspirational-college-entrance-examination-struggle-blood-image_24742.jpg"
              }
              alt={`Poster to film ${original_title || title || name}`}
            />
          </div>
          <div className={css.routs}>
            <Suspense fallback={<h3>Loading...</h3>}>
              <Switch>
                <Route
                  path={`/movies/${match.params.id}`}
                  exact
                  render={(props) => (
                    <AsyncOverview
                      {...this.state.movieGeneralData}
                      {...this.props}
                      extraPropName="value"
                    />
                  )}
                />
                <Route
                  path={`/movies/${match.params.id}/cast`}
                  component={AsyncCast}
                />
                <Route
                  path={`/movies/${match.params.id}/reviews`}
                  component={AsyncReviews}
                />
                <Route component={AsyncNotFound} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}
