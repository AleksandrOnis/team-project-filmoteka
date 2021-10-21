import filmCard from '../templates/filmcard-lib.hbs';
import { showSpiner, hideSpiner } from './spiner.js';
import { createFilmCard } from './renderHome';
import { Request } from './firebase-database';
import { showNoti } from './renderLibrary';
import { libModalListener } from './libModalListener.js';

export function renderGalleryLib() {
  const btnsLibRef = document.querySelector('.library-header__buttons__wrapper');
  const btnWatchedRef = btnsLibRef.querySelector('.btn__watch');
  const btnQueueRef = btnsLibRef.querySelector('.btn__queue');

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
    libModalListener();
  }

  function renderQueue() {
    showSpiner();
    Request.getCardsFromQueue().then(films => {
      renderFilmCard(films);
      if (galleryLib.classList.contains('is-hidden')) {
        galleryLib.classList.remove('is-hidden');
        libModalListener();
      }
      hideSpiner();
    });
  }

  function renderFilmCard(films = 0) {
    galleryLib.innerHTML = '';
    galleryLib.insertAdjacentHTML('beforeend', filmCard(films));
  }

  //   btnRef.addEventListener;
}
