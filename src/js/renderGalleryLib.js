import filmCard from '../templates/filmcard-lib.hbs';
import { createFilmCard } from './renderHome';
import { showSpiner, hideSpiner } from './spiner.js';

export function renderGalleryLib() {
  const btnsLibRef = document.querySelector('.library-header__buttons__wrapper');
  const btnWatchedRef = btnsLibRef.querySelector('.btn__watch');
  const btnQueueRef = btnsLibRef.querySelector('.btn__queue');
  btnWatchedRef.addEventListener('click', renderWatched);
  btnQueueRef.addEventListener('click', renderQueue);

  const galleryLib = document.querySelector('.watched-list');
  
  function renderWatched() {
    showSpiner();
    const films = getWatchedFromLocalStorage();
    console.log(films)
    if (films.length === 0) {
      return
    }
    const genres = films.flatMap(film => film.genres); //.filter(); //unik
    // console.log('🚀 ~ renderWatched ~ genres', genres);
    // const filmCard = createFilmCard(films, genres); //ошибка по жанрам
    renderFilmCard(films);
    if (galleryLib.classList.contains('is-hidden')) {
      galleryLib.classList.remove('is-hidden')
    }
  hideSpiner();
  }

  function renderQueue() {
     showSpiner();
    //  galleryLib.classList.toggle('is-hidden')
    const films = getQueueFromLocalStorage();
     if (films.length === 0) {
      return
    }
    console.log(films)
    const genres = films.flatMap(film => film.genres); //.filter(); //unik
    // console.log('🚀 ~ renderWatched ~ genres', genres);
    // const filmCard = createFilmCard(films, genres); //ошибка по жанрам
    renderFilmCard(films);
     if (galleryLib.classList.contains('is-hidden')) {
      galleryLib.classList.remove('is-hidden')
     }
    hideSpiner();
  }

  function renderFilmCard(films = 0) {
    const galleryLib = document.querySelector('.watched-list');
    galleryLib.innerHTML = '';
    galleryLib.insertAdjacentHTML('beforeend', filmCard(films));
  }

  function getWatchedFromLocalStorage() {
    return JSON.parse(localStorage.getItem('Watched') || '[]');
  }

  function getQueueFromLocalStorage() {
    return JSON.parse(localStorage.getItem('Queue') || '[]');
  }
}
