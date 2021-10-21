import { Request } from './firebase-database';
import getUserUid from './renderLibrary';
import renderProfile from './renderProfile';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getIdToken,
  getCookie,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import Notiflix, { Notify } from 'notiflix';
import { closeModal } from './handle-authentication-modals';
import { logOutListener } from './handle-logged-in-user';
import { removeBackdrop } from './handle-authentication-modals';
import { hideBtns } from './handle-modal-btns';
import { enableHeaderBtns } from './handle-header-btns';
const auth = getAuth();
Notiflix.Notify.init({
  fontFamily: 'Roboto',
  useGoogleFont: true,
  distance: '25px',
  rtl: true,
  width: '270px',
  fontSize: '12px',
  failure: {
    background: '#eb8223',
    textColor: '#000000',
  },
  success: {
    background: '#007740',
  },
});

export function signupFormListener() {
  document.getElementById('signup-form').addEventListener('submit', signupHandler);
}

export function loginFormListener() {
  document.getElementById('login-form').addEventListener('submit', signInHandler);
}

function signupHandler(e) {
  e.preventDefault();
  firebaseSignupEP(e).then(data => console.log(data));
  Notiflix.Notify.success('WELCOME!', {
    width: '170px',
    rtl: false,
  });
  hideBtns();
  closeModal();
  enableHeaderBtns();
  logOutListener();
}

function signInHandler(e) {
  e.preventDefault();
  firebaseSignInEP(e)
    .then(renderProfile())
    .catch(error => {
      const errorCode = error.code;
      console.log(errorCode);
    });
  removeBackdrop();
  enableHeaderBtns();
  logOutListener();
}

function errorNotification(errorCode, errorMessage) {
  if (errorCode === 'auth/email-already-in-use') {
    Notiflix.Notify.failure('THIS E-MAIL IS ALREADY IN USE');
  } else if (errorCode === 'auth/wrong-password') {
    Notiflix.Notify.failure('WRONG PASSWORD');
  } else if (errorCode === 'auth/user-not-found') {
    Notiflix.Notify.failure('USER NOT FOUND');
  } else {
    console.log(errorCode, errorMessage);
  }
}

function firebaseSignupEP(e) {
  const inputEmail = e.target.querySelector('#signup-email').value;
  const inputPassword = e.target.querySelector('#signup-password').value.trim();
  console.log(inputEmail);
  console.log(inputPassword);
  return createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
    .then(userCredential => {
      // Signed up
      const user = userCredential.user;
      return user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      errorNotification(errorCode, errorMessage);
    });
}

function firebaseSignInEP(e) {
  const inputEmail = e.target.querySelector('#login-email').value;
  const inputPassword = e.target.querySelector('#login-password').value;
  console.log(inputEmail);
  return setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then(userCredential => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          errorNotification(errorCode);
        });
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

// old methods, should be deleted when everything works okay
function authWithEmailAndPassword(email, password) {
  const apiKey = `AIzaSyAczp-nt7EkuvejJNmht7Ysicz6S69NMLY`;
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => response.json())
    .then(data => data.idToken);
}

//   authWithEmailAndPassword(inputEmail, inputPassword).then(token => console.log(token));
function signupWithEmailAndPassword(email, password) {
  const apiKey = `AIzaSyAczp-nt7EkuvejJNmht7Ysicz6S69NMLY`;
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => console.log(data));
}

export default onAuthStateChanged(auth, user => {
  if (user) {
    const uid = user.uid;
    Request.getUid(uid);
    getUserUid(uid);
    console.log('🚀 ~ uid', uid);
    return uid;
  } else {
    console.log('🚀 ~ else');
  }
});
