import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const apiKey = `97183b54cab806dd382058e86706ceb2`;

export const filmsApiService = {
  popularMovie() {
    return axios
      .get(`trending/movie/day?api_key=${apiKey}`)
      .then(response =>
        console.log({ results: response.data.results, total: response.data.total_results }),
      );
  },
};

filmsApiService.popularMovie();



export const searchFilmsApiService = {
  searchQuery: 'people',
  page: 1,

    searchMovie() {
        return axios
            .get(`search/movie?query=${this.searchQuery}&api_key=${apiKey}&page=${this.page}`)
            .then(response => {
                this.incrementPage(),
                { results: response.data.results, total: response.data.total_results}});
  },

  incrementPage() {
    this.page += 1;
  },

  incrementPage() {
    this.page += 1;
  },

  getQuery() {
    return this.searchQuery;
  },

  setQuery() {
    this.searchQuery = newQuery;
  },
};

searchFilmsApiService.searchMovie();

//const PIC_URL = `https://image.tmdb.org/t/p/w500`;