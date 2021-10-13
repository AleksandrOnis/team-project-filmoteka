const signupBtn = document.querySelector('#signup-button');
const loginBtn = document.querySelector('#login-button');
const signupModal = document.querySelector('#modal-signup');
const loginModal = document.querySelector('#modal-login');
const signupModalCloseBtn = document.getElementById('signup-close');
const loginModalCloseBtn = document.getElementById('login-close');

const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

const inputEmail = signupForm.querySelector('#signup-email');
const inputPassword = signupForm.querySelector('#signup-password');
const inputEmailLogin = loginForm.querySelector('#login-email');
const inputPasswordLogin = loginForm.querySelector('#login-password');

console.log(signupModal, loginModal);
signupBtn.addEventListener('click', openSignup);
loginBtn.addEventListener('click', openLogin);

function openSignup() {
  console.log(signupBtn);
  signupModal.classList.remove('is-hidden');
}

function openLogin() {
  console.log(loginBtn);
  loginModal.classList.remove('is-hidden');
}

function closeModal() {
  signupModal.classList.add('is-hidden');
  loginModal.classList.add('is-hidden');
  inputEmail.value = '';
  inputPassword.value = '';
  inputEmailLogin.value = '';
  inputPasswordLogin.value = '';
  //   clearOriginalImage();
  //   window.removeEventListener('keydown', closeModalByKey);
  // console.log(originalImage)
}

signupModalCloseBtn.addEventListener('click', closeModal);
loginModalCloseBtn.addEventListener('click', closeModal);
