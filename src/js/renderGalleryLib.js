import filmCard from '../templates/filmcard-lib.hbs';
import { createFilmCard } from './renderHome';

export function renderGalleryLib() {
  const btnsLibRef = document.querySelector('.library-header__buttons__wrapper');
  const btnWatchedRef = btnsLibRef.querySelector('.btn__watch');
  const btnQueueRef = btnsLibRef.querySelector('.btn__queue');
  btnWatchedRef.addEventListener('click', renderWatched);
  btnQueueRef.addEventListener('click', renderQueue);

  const galleryLib = document.querySelector('.watched-list');
  
  function renderWatched() {
      const films = getWatchedFromLocalStorage();
      const genres = films.flatMap(film => film.genres); //.filter(); //unik
      // console.log('🚀 ~ renderWatched ~ genres', genres);
      // const filmCard = createFilmCard(films, genres); //ошибка по жанрам
    renderFilmCard(films);
      if (galleryLib.classList.contains('is-hidden')) {
      galleryLib.classList.remove('is-hidden')
    }
  
  }

  function renderQueue() {
     galleryLib.classList.toggle('is-hidden')
    const films = getQueueFromLocalStorage();
    const genres = films.flatMap(film => film.genres); //.filter(); //unik
    // console.log('🚀 ~ renderWatched ~ genres', genres);
    // const filmCard = createFilmCard(films, genres); //ошибка по жанрам
    renderFilmCard(films);
     if (galleryLib.classList.contains('is-hidden')) {
      galleryLib.classList.remove('is-hidden')
    }
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
