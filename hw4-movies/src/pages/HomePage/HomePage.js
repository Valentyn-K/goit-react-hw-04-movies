import React, { Component } from "react";
import * as fetchAPI from "../../services/fetchAPI";
import MoviesListOnHomePage from "../../components/MoviesList/MoviesListOnHomePage";
import css from "./HomePage.module.css";
import Loader from "../../components/Loader/Loader";

export default class HomePage extends Component {
  state = { trendingMovies: [], isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetchAPI
      .mostPopularMoviesRequest()
      .then(({ data }) => {
        this.setState({ trendingMovies: data.results, isLoading: false });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { trendingMovies, isLoading } = this.state;
    return (
      <div className={css.homePageWraper}>
        {isLoading && <Loader />}
        {trendingMovies.length > 0 && (
          <MoviesListOnHomePage trendingMovies={trendingMovies} />
        )}
      </div>
    );
  }
}
