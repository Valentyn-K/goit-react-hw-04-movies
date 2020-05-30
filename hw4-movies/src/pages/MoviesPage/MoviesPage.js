import React, { Component } from "react";
import SearchFilmsInput from "../../components/SearchFilmsInput/SearchFilmsInput";
import Pagination from "@material-ui/lab/Pagination";
import MoviesListForMoviesPage from "../../components/MoviesList/MoviesListForMoviesPage";
import * as fetchAPI from "../../services/fetchAPI";
import queryString from "query-string";
import css from "./MoviesPage.module.css";

const getQueryFromProps = (props) => queryString.parse(props.location.search);

export default class MoviesPage extends Component {
  state = { query: "", requestOfResult: [], page: 1, totalPages: null };

  componentDidMount() {
    const { query, page } = this.state;
    const { location } = this.props;
    if (location.search) {
      const inputedQuery = getQueryFromProps(this.props);
      this.setState({ query: inputedQuery.query, page: inputedQuery.page });

      fetchAPI
        .MoviesRequestByUsersQuery(inputedQuery.query, inputedQuery.page)
        .then(({ data }) => {
          this.setState({
            requestOfResult: data.results,
            totalPages: data.total_pages,
          });
        });
    }
    if (query && page) {
      fetchAPI.MoviesRequestByUsersQuery(query, page).then(({ data }) => {
        this.setState({
          requestOfResult: data.results,
          totalPages: data.total_pages,
        });
      });
    }
  }

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
    const { page } = this.state;

    if (e.target.value.length !== 0) {
      return this.props.history.push({
        ...this.props.location,
        search: `query=${e.target.value}&page=${page}`,
      });
    }
    this.props.history.push({
      ...this.props.location,
      search: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { query, page } = this.state;

    query.length > 0 &&
      fetchAPI.MoviesRequestByUsersQuery(query, page).then(({ data }) => {
        this.setState({
          requestOfResult: data.results,
          page: data.page,
          totalPages: data.total_pages,
        });
      });
  };
  handlePaginationClick = (e) => {
    this.setState({ page: Number(e.target.textContent) });

    return this.props.history.push({
      ...this.props.location,
      search: `query=${this.state.query}&page=${e.target.textContent}`,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    const nextPage = getQueryFromProps(this.props).page;
    const prevPage = getQueryFromProps(prevProps).page;

    if (this.props.location.search && nextPage !== prevPage) {
      fetchAPI.MoviesRequestByUsersQuery(query, nextPage).then(({ data }) => {
        this.setState({
          requestOfResult: data.results,
          page: nextPage,
          totalPages: data.total_pages,
        });
      });
    }
  }

  render() {
    const { requestOfResult, page, totalPages, query } = this.state;
    return (
      <div className={css.container}>
        <h1 className={css.pageTitle}>MoviesPage</h1>
        <SearchFilmsInput
          className={css.input}
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
          value={query}
        />
        {requestOfResult.length > 0 && (
          <>
            <MoviesListForMoviesPage movies={requestOfResult} />
            <Pagination
              className={css.pagination}
              color="secondary"
              count={totalPages}
              defaultPage={page}
              boundaryCount={2}
              onClick={this.handlePaginationClick}
            />
          </>
        )}
      </div>
    );
  }
}
