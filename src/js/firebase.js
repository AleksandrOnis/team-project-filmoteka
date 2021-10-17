// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { auth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAczp-nt7EkuvejJNmht7Ysicz6S69NMLY',
  authDomain: 'filmoteka-81e54.firebaseapp.com',
  databaseURL: 'https://filmoteka-81e54-default-rtdb.firebaseio.com',
  projectId: 'filmoteka-81e54',
  storageBucket: 'filmoteka-81e54.appspot.com',
  messagingSenderId: '752495719578',
  appId: '1:752495719578:web:f7d0fca959d497d2871b23',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// доделать или почистить позже
import { Request } from './firebase-database';

// const signupForm = document.getElementById('signup-form');
// const inputEmail = signupForm.querySelector('#signup-email');
// const inputPassword = signupForm.querySelector('#signup-password');
// const submitBtn = signupForm.querySelector('#submit-button');
// const loginForm = document.getElementById('login-form');

// const inputEmailLogin = loginForm.querySelector('#login-email');

// const inputPasswordLogin = loginForm.querySelector('#login-password');

// console.log(signupForm);
// console.log(inputEmail);
// console.log(inputPassword);
// console.log(loginForm);
// console.log(inputEmailLogin);
// console.log(inputPasswordLogin);
// console.log(submitBtn);

// inputPassword.addEventListener('input', () => {
//   submitBtn.disabled = !isValid(inputPassword.value);
// });
// function signupHandler(e) {
//   e.preventDefault();
//   console.log(inputPassword.value);
//   console.log(inputEmail.value);
//   const inputEmail = e.target.querySelector('#signup-email');
//   const inputPassword = e.target.querySelector('#signup-password');
//   if (isValid(inputPassword.value)) {
//     const password = {
//       textEmail: inputEmail.value.trim(),
//       textPassword: inputPassword.value.trim(),
//     };
//     submitBtn.disabled = true;
//     console.log('Password', password);
//     Request.create(password).then(() => {
//       inputEmail.value = '';
//       inputPassword.value = '';
//       submitBtn.disabled = false;
//     });
//   }
// }

// function isValid(value) {
//   return value.length >= 10;
// }
