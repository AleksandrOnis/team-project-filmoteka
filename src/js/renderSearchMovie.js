import filmCard from '../templates/filmСard.hbs';
// import filmCardLib from '../templates/filmcard-lib.hbs';
import ApiService from '../js/apiService';
import { createFilmCard, loadTrendFilms } from './renderHome';
import _ from 'lodash';
import pagination from './pagination.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let isNewQuery = null;
let isPaginationHidden = null;

import { showSpiner, hideSpiner } from './spiner.js';

const searchForm = document.querySelector('.search-film');
const galleryEl = document.querySelector('.gallery');
const paginationRef = document.querySelector('#pagination');

searchForm.addEventListener('input', _.debounce(onSearch, 500));
const apiService = new ApiService();

function onSearch(e) {
  e.preventDefault();
  const newSearch = e.target.value.trim();
  apiService.setQuery(newSearch);
  if (newSearch === '') {
    clearGallery();
    apiService.resetPage();
    Notify.warning('Please enter your query');
    // showSpiner();
    paginationHidden();
    loadTrendFilms();
    hideSpiner();
    return;
  }
  isNewQuery = 1;
  showSpiner();
  apiService.resetPage();
  renderFoundFilms();
  hideSpiner();
}

export default async function renderFoundFilms(page = 1) {
  const findedFilms = await apiService.getFilmsfromSearch();
  const genres = await apiService.getGenreList();
  const { results, totalResults } = findedFilms;
  clearGallery();
  if (isNewQuery === 1) {
    pagination(totalResults, renderFoundFilms);
    isNewQuery = 0;
    if ((isPaginationHidden = 1)) paginationRef.classList.remove('visually-hidden');
  }
  if (totalResults === 0) {
    Notify.failure('Unfortunately no movies found');
    clearGallery();
    paginationHidden();
    return;
  }

  const renderedFilms = createFilmCard(results, genres, page);
  renderImageCard(renderedFilms);

  return renderedFilms;
}

function renderImageCard(cards) {
  galleryEl.insertAdjacentHTML('beforeend', filmCard(cards));
}

function clearGallery() {
  galleryEl.innerHTML = '';
}

function paginationHidden() {
  paginationRef.classList.add('visually-hidden');
  isPaginationHidden = 1;
}

/* const replaceFilmId = array => {
    array.forEach(object => {
        if (object.genre_ids) {
            object.genre_ids.forEach((idGenre, indexGenre) => {
                genresList.forEach(objectNames => {
                    if (objectNames.id === idGenre) {
                        object.genre_ids.splice(indexGenre, 1, objectNames['name']);
                    }
                });
            });
        } else {
            object.genre_ids = '';
        }
    });
} */
