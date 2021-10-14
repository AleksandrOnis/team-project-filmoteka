import refs from './refs';
const { mainHTML } = refs;

export default function handleAuthModals() {
  // buttons access
  const signupBtn = document.querySelector('#signup-button');
  const loginBtn = document.querySelector('#login-button');

  const signupModalCloseBtn = document.getElementById('signup-close');
  const loginModalCloseBtn = document.getElementById('login-close');
  // modals access
  const signupModal = document.querySelector('#modal-signup');
  const loginModal = document.querySelector('#modal-login');
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');
  // input access
  const inputEmail = signupForm.querySelector('#signup-email');
  const inputPassword = signupForm.querySelector('#signup-password');
  const inputEmailLogin = loginForm.querySelector('#login-email');
  const inputPasswordLogin = loginForm.querySelector('#login-password');

  // event listeners
  signupBtn.addEventListener('click', openSignup);
  loginBtn.addEventListener('click', openLogin);

  signupModalCloseBtn.addEventListener('click', closeModal);
  loginModalCloseBtn.addEventListener('click', closeModal);
  function addListenersForModals() {
    window.addEventListener('keydown', closeModalByKey);
    // window.addEventListener('click', closeByClick);
  }

  // functions
  function openSignup() {
    // console.log(signupBtn);
    signupModal.classList.remove('is-hidden');
    addBackdrop();
    addListenersForModals();
  }

  function openLogin() {
    // console.log(loginBtn);
    loginModal.classList.remove('is-hidden');
    addBackdrop();
    addListenersForModals();
  }

  function addBackdrop() {
    mainHTML.classList.add('backdrop');
  }

  function removeBackdrop() {
    mainHTML.classList.remove('backdrop');
  }

  function closeModal() {
    signupModal.classList.add('is-hidden');
    loginModal.classList.add('is-hidden');
    inputEmail.value = '';
    inputPassword.value = '';
    inputEmailLogin.value = '';
    inputPasswordLogin.value = '';
    removeBackdrop();
    window.removeEventListener('keydown', closeModalByKey);

    window.removeEventListener('click', closeByClick);
  }

  function closeModalByKey(e) {
    if (e.code === 'Escape') {
      closeModal();
    }
  }

  function closeByClick(e) {
    if (e.target !== signupModal || e.target !== loginModal) {
      closeModal();
    }
  }
}
