import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const apiKey = `97183b54cab806dd382058e86706ceb2`;

//https://api.themoviedb.org/3/genre/movie/list?api_key=97183b54cab806dd382058e86706ceb2&language=en-US


//Объект со списком жанров
 export const genreList = {
    getGenreList() {
        return axios.get(`genre/movie/list?api_key=${apiKey}&language=en-US`).then(response=>({list: response.data.genres}))
    }
};
genreList.getGenreList();
//-//

export const filmsApiService = {
  popularMovie() {
    return axios
      .get(`trending/movie/day?api_key=${apiKey}`)
      .then(response =>
        ({ results: response.data.results, total: response.data.total_results }),
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

  resetPage() {
    this.page = 1;
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