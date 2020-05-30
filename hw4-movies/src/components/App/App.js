import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import MainNav from "../Nav/MainNav";

const AsyncHomePage = lazy(() =>
  import("../../pages/HomePage/HomePage" /*webpackChankName: "home-page" */)
);

const AsyncMoviesPage = lazy(() =>
  import(
    "../../pages/MoviesPage/MoviesPage" /*webpackChankName: "movies-page" */
  )
);

const AsyncMovieDatailsPage = lazy(() =>
  import(
    "../../pages/MovieDetailsPage/MovieDatailsPage" /*webpackChankName: "movie-details-page" */
  )
);

const AsyncNotFoundPage = lazy(() =>
  import(
    "../../pages/NotFound/NotFound" /*webpackChankName: "not-found-page" */
  )
);

const App = () => (
  <>
    <Suspense fallback={<h1>loading...</h1>}>
      <MainNav />
      <Switch>
        <Route path="/" exact component={AsyncHomePage} />
        <Route path="/movies/:id" component={AsyncMovieDatailsPage} />
        <Route path="/movies" component={AsyncMoviesPage} />
        <Route component={AsyncNotFoundPage} />
      </Switch>
    </Suspense>
  </>
);

export default App;
