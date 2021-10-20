import filmCard from '../templates/filmcard-lib.hbs';
import { showSpiner, hideSpiner } from './spiner.js';
import { createFilmCard } from './renderHome';
import { Request } from './firebase-database';

export function renderGalleryLib() {
  const btnsLibRef = document.querySelector('.library-header__buttons__wrapper');
  const btnWatchedRef = btnsLibRef.querySelector('.btn__watch');
  const btnQueueRef = btnsLibRef.querySelector('.btn__queue');
  btnWatchedRef.removeEventListener('click', showNoti);
  btnQueueRef.removeEventListener('click', showNoti);
  btnWatchedRef.addEventListener('click', renderWatched);
  btnQueueRef.addEventListener('click', renderQueue);

  const galleryLib = document.querySelector('#galleryLib');

  function renderWatched() {
    showSpiner();
    Request.getCardsFromWatched().then(films => {
      renderFilmCard(films);
      if (galleryLib.classList.contains('is-hidden')) {
        galleryLib.classList.remove('is-hidden');
      }
      hideSpiner();
    });
  }

  function renderQueue() {
    showSpiner();
    Request.getCardsFromQueue().then(films => {
      renderFilmCard(films);
      if (galleryLib.classList.contains('is-hidden')) {
        galleryLib.classList.remove('is-hidden');
      }
      hideSpiner();
    });
  }

  function renderFilmCard(films = 0) {
    galleryLib.innerHTML = '';
    galleryLib.insertAdjacentHTML('beforeend', filmCard(films));
  }

  function showNoti() {}
}
