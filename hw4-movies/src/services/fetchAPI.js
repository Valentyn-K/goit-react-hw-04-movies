import axios from "axios";

export const mostPopularMoviesRequest = () => {
  return axios.get(
    "https://api.themoviedb.org/3/trending/all/week?api_key=00e822c3614d323c49d84fabf49592d4"
  );
};

export const MoviesRequestByUsersQuery = (query = "most popular", page = 1) => {
  return axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=00e822c3614d323c49d84fabf49592d4&language=en-US&query=${query}&page=${page}&include_adult=false`
  );
};

export const getInfoAboutFilmByID = (id = null) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=00e822c3614d323c49d84fabf49592d4`
  );
};


export const getCast = (id = null) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=00e822c3614d323c49d84fabf49592d4`
  );
};

export const getReviews = (id = null) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=00e822c3614d323c49d84fabf49592d4`
  );
};

