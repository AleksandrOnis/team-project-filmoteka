import ApiService from './apiService';
import { Request } from './firebase-database';
import modalCardTpl from '../templates/filmDescription.hbs';
import { changeLanguageFilmCard } from '../js/multyLang.js';

const apiService = new ApiService();
const basicLightbox = require('basiclightbox');

let detailOfFilm;
let instance;
let closeBtn;

export function libModalListener() {
  document.querySelector('#galleryLib').addEventListener('click', openModalfilmLib);
}
export function openModalfilmLib(event) {
  if (event.target.nodeName !== 'IMG' && event.target.nodeName !== 'P') {
    return;
  }
  apiService.filmId = event.target.dataset.id;
  showModal();
  window.addEventListener('keydown', closeModalFilmCard);
}

async function showModal() {
  await createFilmCard();
  const modalCardMarkUp = modalCardTpl(detailOfFilm);
  instance = basicLightbox.create(modalCardMarkUp);
  instance.show();
  hideIrrBtns();
  
  changeLanguageFilmCard();
  
  closeBtn = document.querySelector('.js-modal-close-btn');
  closeBtn.addEventListener('click', closeModalFilmCard);
  document.querySelector('body').classList.add('modal-open');
}


function closeModalFilmCard(e) {
  if (e.code !== 'Escape' && !e.target.classList.contains('close')) {
    return;
  }
  document.querySelector('body').classList.remove('modal-open');
  instance.close();
}

function hideIrrBtns() {
  document.querySelector('.modal-film__button__wrapper').classList.add('visually-hidden');
}

async function createFilmCard() {
  detailOfFilm = await apiService.getDetailedFilms();

  detailOfFilm.year = detailOfFilm.release_date.split('-')[0];

  if (detailOfFilm.genres.length > 3) {
    detailOfFilm.genres = detailOfFilm.genres.slice(0, 2).flat().concat({ name: 'Other' });
  }
  return detailOfFilm;
}