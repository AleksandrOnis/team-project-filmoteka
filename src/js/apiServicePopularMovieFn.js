import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const apiKey = `97183b54cab806dd382058e86706ceb2`;
//https://api.themoviedb.org/3/genre/movie/list?api_key=97183b54cab806dd382058e86706ceb2&language=en-US
//Объект со списком жанров
async function getGenreList(page = 1) {
  console.log('🚀 ~ page', page);
  const response = await axios.get(
    `genre/movie/list?api_key=${apiKey}&language=en-US&page=${page}`,
  );
  const object = await response;
  return await object.data.genres;
}
// getGenreList();
async function popularMovie(page = 1) {
  console.log('🚀 ~ page', page);
  const response = await axios.get(`trending/movie/day?api_key=${apiKey}&page=${page}`);
  const object = await response;
  return await object.data.results;
}
async function totalResults() {
  const response = await axios.get(`trending/movie/day?api_key=${apiKey}`);
  const object = await response;
  return object.data.total_results;
}
export const searchFilmsApiService = {
  searchQuery: 'people',
  page: 1,
  searchMovie() {
    return axios
      .get(`search/movie?query=${this.searchQuery}&api_key=${apiKey}&page=${this.page}`)
      .then(response => {
        this.incrementPage(),
          { results: response.data.results, total: response.data.total_results };
      });
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
searchFilmsApiService.searchMovie(); //const PIC_URL = `https://image.tmdb.org/t/p/w500`;
export { totalResults, popularMovie, getGenreList };
