import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const apiKey = `97183b54cab806dd382058e86706ceb2`;
//https://api.themoviedb.org/3/genre/movie/list?api_key=97183b54cab806dd382058e86706ceb2&language=en-US
//Объект со списком жанров
export default class ApiService {
  constructor() {
    this.page = 1;
    this.query = '';
    this.filmId;
  }

  async getTrendFilms(page = 1) {
    const response = await axios.get(`trending/movie/week?api_key=${apiKey}&page=${page}`);
    const { results, total_results } = await response.data;
    const totalResults = total_results;
    this.incrementPage();
    return { results, totalResults };
  }
  async getGenreList(page = 1) {
    const response = await axios.get(
      `genre/movie/list?api_key=${apiKey}&language=en-US&page=${page}`,
    );
    const object = await response.data;
    return await object.genres;
  }

  async totalResults() {
    const response = await axios.get(`trending/movie/day?api_key=${apiKey}`);
    const object = await response;
    return object.data.total_results;
  }

  async getFilmsfromSearch() {
    const response = await axios.get(
      `search/movie?api_key=${apiKey}&language=en-US&query=${this.query}&page=${this.page}`,
    );
    const { results, total_results } = await response.data;
    const totalResults = total_results;
    this.incrementPage();
    return { results, totalResults };
  }

  async getDetailedFilms() {
    const response = await axios.get(`movie/${this.filmId}?api_key=${apiKey}&language=en-US`);
    const obj = await response.data;
    return await obj;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  getQuery() {
    return this.query;
  }

  setQuery(newQuery) {
    this.query = newQuery;
  }
  getFilmID() {
    return this.filmId;
  }
  setFilmID(newFilmId) {
    return (this.filmId = newFilmId);
  }
}
