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
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user);
      console.log(user.uid);
      return user.uid;
    } else {
      console.log(user);
      return user;
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
        renderLoggedOutLibrary();
        // document.querySelector('.library-header__buttons__wrapper').innerHTML = '';
      })
      .catch(error => {
        console.log(error);
      });
  });
}
