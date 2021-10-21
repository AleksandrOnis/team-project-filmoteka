// import refs
import refs from './refs';
// import hbs
import mylibrary from '../templates/mylibrary.hbs';
import libHeader from '../templates/libheader.hbs';
import slideshow from '../templates/slideshow.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { renderGalleryLib } from './renderGalleryLib';
import filmCard from '../templates/filmСard.hbs';
import { handleLoggedUser } from './handle-logged-in-user';
import { addListenersForModals, removeBackdrop } from './handle-authentication-modals';
import { addListenersForButtons } from './handle-authentication-modals';
import { signupFormListener } from './firebase-auth';
import { loginFormListener } from './firebase-auth';
import renderProfile from './renderProfile';
import { logOutListener } from './handle-logged-in-user';
import { changeLanguageLibBtn } from '../js/multyLang.js';
import { disableHeaderBtns } from './handle-header-btns';
import { localStorageCurrent } from './localStorageCurrent';
// get access to the My Library button, main
let userUid = null;
const { mainHTML, myLibraryLink, homeLink, headerHTML, inputHTML } = refs;
// add event listener on My Library
myLibraryLink.addEventListener('click', renderLibrary, { once: true });
myLibraryLink.addEventListener('change', localStorageCurrent);

// myLibraryLink.addEventListener('click', renderLibrary);
// by click on the button:
export function renderLibrary() {
  // 1.  change background-image
  headerHTML.classList.remove('home-header');
  headerHTML.classList.add('library-header');

  // 2. delete input and add btns
  inputHTML.innerHTML = '';
  const libHeaderMarkup = libHeader();
  headerHTML.insertAdjacentHTML('beforeend', libHeaderMarkup);
  // 3. hide main content
  mainHTML.innerHTML = '';
  handleLoggedUser();
  if (handleLoggedUser() == true) {
    renderProfile();
    console.log('logged in');
    logOutListener();
  } else {
    disableHeaderBtns();
    renderLoggedOutLibrary();
  }
  // 7. switch current page style
  homeLink.classList.remove('current');
  myLibraryLink.classList.add('current');
  changeLanguageLibBtn();
  // btnWatchedRef.disabled = true;
  // btnQueueRef.disabled = true;
  // console.log('🚀 ~ renderLibrary ~ btn-OFF');
}
// export function showNoti() {
//   Notify.warning('Please log in');
// }

export function renderLoggedOutLibrary() {
  mainHTML.innerHTML = '';

  // render slideshow
  const slideshowMarkup = slideshow();
  mainHTML.insertAdjacentHTML('beforeend', slideshowMarkup);
  // render content from mylibrary.hbs
  const libraryMarkup = mylibrary();
  mainHTML.insertAdjacentHTML('beforeend', libraryMarkup);
  // handle modals
  addListenersForButtons();
  addListenersForModals();
  // add the 21st-line function from firebase and proceed with chaining functions one to another
  signupFormListener();
  loginFormListener();
  const btnsLibRef = document.querySelector('.library-header__buttons__wrapper');
  const btnWatchedRef = btnsLibRef.querySelector('.btn__watch');
  const btnQueueRef = btnsLibRef.querySelector('.btn__queue');
  // btnWatchedRef.addEventListener('click', showNoti);
  // btnQueueRef.addEventListener('click', showNoti);
}

export default function getUserUid(uid) {
  userUid = uid;
  console.log(':rocket: ~ getUserUid ~ userUid', userUid);
}
