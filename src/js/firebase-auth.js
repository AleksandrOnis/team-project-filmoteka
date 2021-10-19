import renderProfile from './renderProfile';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-report-aio';

export function signupFormListener() {
  document.getElementById('signup-form').addEventListener('submit', signupHandler);
}
const auth = getAuth();
function warningNotification() {
  Notiflix.Notify.init({
    fontFamily: 'Roboto',
    useGoogleFont: true,
    distance: '50px',
    rtl: true,
    width: '270px',
    fontSize: '12px',
    warning: {
      background: '#eb8223',
      textColor: '#000000',
    },
  });
  Notiflix.Notify.warning('THIS E-MAIL IS ALREADY IN USE');
}

function signupHandler(e) {
  e.preventDefault();
  const inputEmail = e.target.querySelector('#signup-email').value;
  const inputPassword = e.target.querySelector('#signup-password').value.trim();
  console.log(inputPassword);
  console.log(inputEmail);
  createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch(error => {
      // add notiflix
      const errorCode = error.code;
      const errorMessage = error.message;
      warningNotification(); // ..
    });
  //   renderProfile();

  //   getUserInfo();
  // if (isValid(inputPassword.value)) {
  //   const password = {
  //     textEmail: inputEmail.value.trim(),
  //     textPassword: inputPassword.value.trim(),
  //   };
  //   submitBtn.disabled = true;
  //   console.log('Password', password);
  //   Request.create(password).then(() => {
  //     inputEmail.value = '';
  //     inputPassword.value = '';
  //     submitBtn.disabled = false;
  //   });
  // }
}

export function loginFormListener() {
  document.getElementById('login-form').addEventListener('submit', loginHandler);
}

function loginHandler(e) {
  e.preventDefault();
  const inputEmail = e.target.querySelector('#login-email').value;
  const inputPassword = e.target.querySelector('#login-password').value;
  console.log(inputEmail);
  //   signInWithEmailAndPassword(auth, inputEmail, inputPassword)
  //     .then(userCredential => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // ...
  //       console.log(user);
  //     })

  //     .catch(error => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     })
  //     .then(user => console.log(user));
  //   getUserInfo();

  authWithEmailAndPassword(inputEmail, inputPassword).then(token => console.log(token));

  renderProfile();
}

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