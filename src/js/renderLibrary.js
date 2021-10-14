// arrange library.html as hbs file
// done

// import refs
import refs from './refs';
// import hbs
import mylibrary from '../templates/mylibrary.hbs';
import handleAuthModals from './handle-authentication-modals';
// get access to the My Library button, main

const { mainHTML, myLibraryLink, homeLink } = refs;
console.log(mainHTML, myLibraryLink, homeLink);

// add event listener on My Library
myLibraryLink.addEventListener('click', renderLibrary);

// by click on the button:
function renderLibrary() {
  // 1. hide main content
  mainHTML.innerHTML = '';
  // 2. render content from mylibrary.hbs
  const libraryMarkup = mylibrary();
  mainHTML.insertAdjacentHTML('beforeend', libraryMarkup);
  // 3. handle modals
  handleAuthModals();
  // 4. switch current page style
  homeLink.classList.remove('current');
  myLibraryLink.classList.add('current');
}
