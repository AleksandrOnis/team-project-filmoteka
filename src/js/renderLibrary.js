// arrange library.html as hbs file
// done

// import refs
import refs from './refs';
// import hbs
import mylibrary from '../templates/mylibrary.hbs';
import libHeader from '../templates/libheader.hbs';
import slideshow from '../templates/slideshow.hbs';

import handleAuthModals from './handle-authentication-modals';
import { signupFormListener } from './firebase-auth';
import { loginFormListener } from './firebase-auth';

// get access to the My Library button, main

const { mainHTML, myLibraryLink, homeLink, headerHTML } = refs;

// add event listener on My Library
myLibraryLink.addEventListener('click', renderLibrary);
// myLibraryLink.addEventListener('click', renderLibrary);

// by click on the button:
function renderLibrary() {
  // 1. hide main content
  mainHTML.innerHTML = '';

  headerHTML.innerHTML = '';

  // 2. render header
  const libHeaderMarkup = libHeader();
  // 3. render slideshow
  const slideshowMarkup = slideshow();
  // 4. render content from mylibrary.hbs
  const libraryMarkup = mylibrary();

  headerHTML.insertAdjacentHTML('beforeend', libHeaderMarkup);
  mainHTML.insertAdjacentHTML('beforeend', slideshowMarkup);

  mainHTML.insertAdjacentHTML('beforeend', libraryMarkup);
  // 3. handle modals
  handleAuthModals();
  // 4. switch current page style
  homeLink.classList.remove('current');
  myLibraryLink.classList.add('current');
  // 5. add the 21st-line function from firebase and proceed with chaining functions one to another
  signupFormListener();
  loginFormListener();
}
