// import refs
import refs from './refs';
// import hbs
import mylibrary from '../templates/mylibrary.hbs';
import libHeader from '../templates/libheader.hbs';
import slideshow from '../templates/slideshow.hbs';
import { renderGalleryLib } from './renderGalleryLib';
import filmCard from '../templates/filmСard.hbs';

import { addListenersForModals } from './handle-authentication-modals';
import { addListenersForButtons } from './handle-authentication-modals';
import { signupFormListener } from './firebase-auth';
import { loginFormListener } from './firebase-auth';

///
import { changeLanguageLibBtn } from '../js/multyLang.js';
// get access to the My Library button, main

const { mainHTML, myLibraryLink, homeLink, headerHTML, inputHTML } = refs;

// add event listener on My Library
myLibraryLink.addEventListener('click', renderLibrary, { once: true });

// by click on the button:
function renderLibrary() {
  // 1. hide main content
  mainHTML.innerHTML = '';

  // 2. change background-image

  headerHTML.classList.remove('home-header');
  headerHTML.classList.add('library-header');

  // 3. delete input and add btns
  inputHTML.innerHTML = '';
  const libHeaderMarkup = libHeader();
  headerHTML.insertAdjacentHTML('beforeend', libHeaderMarkup);

  // 4. render slideshow
  const slideshowMarkup = slideshow();
  mainHTML.insertAdjacentHTML('beforeend', slideshowMarkup);
  // 5. render content from mylibrary.hbs
  const libraryMarkup = mylibrary();
  mainHTML.insertAdjacentHTML('beforeend', libraryMarkup);

  // 6. handle modals
  addListenersForButtons();
  addListenersForModals();
  // 7. switch current page style
  homeLink.classList.remove('current');
  myLibraryLink.classList.add('current');
  // 8. add the 21st-line function from firebase and proceed with chaining functions one to another
  signupFormListener();
  loginFormListener();
  changeLanguageLibBtn();
  renderGalleryLib();
import { handleLoggedUser } from './handle-logged-in-user';
import { addListenersForModals, removeBackdrop } from './handle-authentication-modals';
import { addListenersForButtons } from './handle-authentication-modals';
import { signupFormListener } from './firebase-auth';
import { loginFormListener } from './firebase-auth';
import renderProfile from './renderProfile';
import { logOutListener } from './handle-logged-in-user';
// get access to the My Library button, main

const { mainHTML, myLibraryLink, homeLink, headerHTML } = refs;
// add event listener on My Library
myLibraryLink.addEventListener('click', renderLibrary);
// myLibraryLink.addEventListener('click', renderLibrary);
// by click on the button:
handleLoggedUser();
export function renderLibrary() {
  // 1. render header
  headerHTML.innerHTML = '';
  const libHeaderMarkup = libHeader();
  headerHTML.insertAdjacentHTML('beforeend', libHeaderMarkup);
  // 2. hide main content
  mainHTML.innerHTML = '';
  if (handleLoggedUser() != null) {
    renderProfile();
    console.log('logged in');
    logOutListener();
  } else {
    // 3. render slideshow
    const slideshowMarkup = slideshow();
    mainHTML.insertAdjacentHTML('beforeend', slideshowMarkup);
    // 4. render content from mylibrary.hbs
    const libraryMarkup = mylibrary();
    mainHTML.insertAdjacentHTML('beforeend', libraryMarkup);
    // 5. handle modals
    addListenersForButtons();
    addListenersForModals();
    // 6. switch current page style
    homeLink.classList.remove('current');
    myLibraryLink.classList.add('current');
    // 7. add the 21st-line function from firebase and proceed with chaining functions one to another
    signupFormListener();
    loginFormListener();
  }
}
