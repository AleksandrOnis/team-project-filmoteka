import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getIdToken,
  getCookie,
  signOut,
} from 'firebase/auth';
import Notiflix from 'notiflix';
import refs from './refs';
import slideshow from '../templates/slideshow.hbs';
import { renderLibrary } from './renderLibrary';
import mylibrary from '../templates/mylibrary.hbs';
import renderProfile from './renderProfile';
import { hideBtns } from './handle-modal-btns';
import { renderLoggedOutLibrary } from './renderLibrary';
import { removeBackdrop } from './handle-authentication-modals';
import { enableHeaderBtns } from './handle-header-btns';
import { disableHeaderBtns } from './handle-header-btns';
const { mainHTML, myLibraryLink } = refs;

const auth = getAuth();
Notiflix.Notify.init({
  useIcon: false,
  borderRadius: '50px',
  fontFamily: 'Roboto',
  useGoogleFont: true,
  distance: '25px',
  width: '150px',
  rtl: false,
  fontSize: '18px',
  success: { background: '#f2f84e', textColor: '#000000' },
});
export function handleLoggedUser() {
  return onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user);
      console.log(user.uid);
      const uidResult = user.uid;
      return true;
    } else {
      return false;
    }
  });
}

export function logOutListener() {
  document.querySelector('#logout-button').addEventListener('click', e => {
    signOut(auth)
      .then(() => {
        Notiflix.Notify.success('See ya!', {
          background: '#f2f84e',
          textColor: '#000000',
          width: '150px',
          rtl: false,
        });
      })
      .then(data => {
        removeBackdrop();
        disableHeaderBtns();
        renderLoggedOutLibrary();
        // document.querySelector('.library-header__buttons__wrapper').innerHTML = '';
      })
      .catch(error => {
        console.log(error);
      });
  });
}
