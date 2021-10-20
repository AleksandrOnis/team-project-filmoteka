import ApiService from './apiService';
import { Request } from './firebase-database';
import modalCardTpl from '../templates/filmDescription';

import { changeLanguageFilmCard } from '../js/multyLang.js';

const apiService = new ApiService();
const basicLightbox = require('basiclightbox');

let detailOfFilm;
let instance;
let closeBtn;
let filmDescriptionRef = null;
let btnAddToWatchedRef = null;
let btnAddToQueueRef = null;
export default function openModalfilm(event) {
  if (event.target.nodeName !== 'IMG' && event.target.nodeName !== 'P') {
    return;
  }
  apiService.filmId = event.target.dataset.id;
  async function showModal() {
    await createFilmCard();
    const modalCardMarkUp = modalCardTpl(detailOfFilm);
    instance = basicLightbox.create(modalCardMarkUp);
    instance.show();
    //
    changeLanguageFilmCard();
    //
    closeBtn = document.querySelector('.js-modal-close-btn');
    closeBtn.addEventListener('click', closeModalFilmCard);
    document.querySelector('body').classList.add('modal-open');
  }

  showModal().then(response => {
    console.log(response);
    filmDescriptionRef = document.querySelector('.modal-film__description');
    btnAddToWatchedRef = filmDescriptionRef.querySelector('.btn__watch');
    btnAddToQueueRef = filmDescriptionRef.querySelector('.btn__queue');
    btnAddToWatchedRef.addEventListener('click', addCardToWatchedHandle);
    console.log(btnAddToWatchedRef);
    btnAddToWatchedRef.addEventListener('click', () => {
      btnAddToWatchedRef.textContent = 'ADDED TO WATCHED';
    });
    btnAddToQueueRef.addEventListener('click', addCardToQueueHandle);
    btnAddToQueueRef.addEventListener('click', () => {
      btnAddToQueueRef.textContent = 'ADDED TO QUEUE';
    });

    function addCardToWatchedHandle() {
      Request.addCardToWatched(detailOfFilm);
    }
    function addCardToQueueHandle() {
      Request.addCardToQueue(detailOfFilm);
    }
  });
  window.addEventListener('keydown', closeModalFilmCard);
}

async function createFilmCard() {
  detailOfFilm = await apiService.getDetailedFilms();

  detailOfFilm.year = detailOfFilm.release_date.split('-')[0];

  if (detailOfFilm.genres.length > 3) {
    detailOfFilm.genres = detailOfFilm.genres.slice(0, 2).flat().concat({ name: 'Other' });
  }
  return detailOfFilm;
}

function closeModalFilmCard(e) {
  if (e.code !== 'Escape' && !e.target.classList.contains('close')) {
    return;
    // }
  }
  document.querySelector('body').classList.remove('modal-open');
  instance.close();
}
