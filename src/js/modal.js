import ApiService from './apiService';
// import { Request } from './firebase-database';
import modalCardTpl from '../templates/filmDescription';
import  refs from './refs'
import { changeLanguageFilmCard } from '../js/multyLang.js';

const apiService = new ApiService();
const basicLightbox = require('basiclightbox');

let detailOfFilm;
let instance;
let closeBtn;
let modalFilm;
let btnAddToWatchedRef;
let btnAddToQueueRef;
const watchedFilms = JSON.parse(localStorage.getItem('watchedFilms')) || [];
const queueFilms = JSON.parse(localStorage.getItem('queueFilms')) || [];
const arrWatchedFilms = JSON.parse(localStorage.getItem('arrWatchedFilms')) || [];
const arrQueueFilms = JSON.parse(localStorage.getItem('arrQueueFilms')) || [];

export default function openModalfilm(event) {
  if (event.target.nodeName !== 'IMG' && event.target.nodeName !== 'P') {
    return;
  }
  apiService.filmId = event.target.dataset.id;
  (async () => {
    await createFilmCard();
    const modalCardMarkUp = modalCardTpl(detailOfFilm);
    instance = basicLightbox.create(modalCardMarkUp);
    instance.show();
    //
    changeLanguageFilmCard();
    //
    closeBtn = document.querySelector('.js-modal-close-btn');
    modalFilm = document.querySelector('.modal-film__container')
    btnAddToWatchedRef = document.querySelector('.js-btn__watch ');
    btnAddToQueueRef = document.querySelector('.js-btn__queue');
    document.querySelector('body').classList.add('modal-open');

    if (arrWatchedFilms.includes(Number(event.target.dataset.id))) {
      btnAddToWatchedRef.textContent = 'remove from watched'
    }

    if (arrQueueFilms.includes(Number(event.target.dataset.id))) {
      btnAddToQueueRef.textContent = 'remove from queue'
    }

    closeBtn.addEventListener('click', closeModalFilmCard);
    modalFilm.addEventListener('click', addOrRemoveMovieFromLocalStorage)
  })();

    
   

  //   btnAddToWatchedRef.addEventListener('click', addCardToWatchedHandle);
  //   console.log(btnAddToWatchedRef);
  //   btnAddToWatchedRef.addEventListener('click', () => {
  //     btnAddToWatchedRef.textContent = 'ADDED TO WATCHED';
  //   });
  //   btnAddToQueueRef.addEventListener('click', addCardToQueueHandle);
  //   btnAddToQueueRef.addEventListener('click', () => {
  //     btnAddToQueueRef.textContent = 'ADDED TO QUEUE';
  //   });

  //   function addCardToWatchedHandle() {
  //     Request.addCardToWatched(detailOfFilm);
  //   }
  //   function addCardToQueueHandle() {
  //     Request.addCardToQueue(detailOfFilm);
  //   }
  // });
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
  }
  document.querySelector('body').classList.remove('modal-open');
  instance.close();
  window.removeEventListener('keydown', closeModalFilmCard);
  if (refs.myLibraryLink.classList.contains('current')) {
    if (refs.libBtnWatch.classList.contains('focus')) {
      parseWatchedFilmsMarkup()
    }
    else {
       parseQueueFilmsMarkup();
    }
  }
}


function addOrRemoveMovieFromLocalStorage(e) {

  if (e.target.classList.contains('js-btn__watch')) {

    if (!arrWatchedFilms.includes(Number(e.currentTarget.id))) {
      arrWatchedFilms.push(detailOfFilm.id);
      watchedFilms.push(detailOfFilm);
      localStorage.setItem('arrWatchedFilms', JSON.stringify(arrWatchedFilms))
      localStorage.setItem('watchedFilms', JSON.stringify(watchedFilms));
      e.target.textContent = "remove from watched";
    } else {
      watchedFilms.forEach((el, ind) => {
        if (el.id === Number(e.currentTarget.id)) {
          watchedFilms.splice(ind, 1);
        }
      });

      arrWatchedFilms.splice(arrWatchedFilms.indexOf(Number(e.currentTarget.id)), 1);
      localStorage.setItem('arrWatchedFilms', JSON.stringify(arrWatchedFilms))
      localStorage.setItem('watchedFilms', JSON.stringify(watchedFilms));
      e.target.textContent = "add to watched";
    }
  }

  if (e.target.classList.contains('js-btn__queue')) {

    if (!arrQueueFilms.includes(Number(e.currentTarget.id))) {
      arrQueueFilms.push(detailOfFilm.id);
      queueFilms.push(detailOfFilm);
      localStorage.setItem('arrQueueFilms', JSON.stringify(arrQueueFilms));
      localStorage.setItem('queueFilms', JSON.stringify(queueFilms));
      e.target.textContent = "remove from queue";
    } else {
      queueFilms.forEach((el, ind) => {
        if (el.id === Number(e.currentTarget.id)) {
          queueFilms.splice(ind, 1)
        }
      });

      arrQueueFilms.splice(arrQueueFilms.indexOf(Number(e.currentTarget.id)), 1);
      localStorage.setItem('arrQueueFilms', JSON.stringify(arrQueueFilms));
      localStorage.setItem('queueFilms', JSON.stringify(queueFilms));
      e.target.textContent = "add to queue";
    }
  }
}