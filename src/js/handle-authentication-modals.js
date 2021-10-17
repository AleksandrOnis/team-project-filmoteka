import refs from './refs';
const { mainHTML } = refs;

export function handleAuthModals() {}
// event listeners
export function addListenersForButtons() {
  document.querySelector('#signup-button').addEventListener('click', openSignup);
  document.querySelector('#login-button').addEventListener('click', openLogin);

  document.getElementById('signup-close').addEventListener('click', closeModal);
  document.getElementById('login-close').addEventListener('click', closeModal);
}

export function addListenersForModals() {
  window.addEventListener('keydown', closeModalByKey);
  // window.addEventListener('click', closeByClick);
}

// functions
function openSignup() {
  // console.log(signupBtn);
  document.querySelector('#modal-signup').classList.remove('is-hidden');
  addBackdrop();
  addListenersForModals();
}

function openLogin() {
  // console.log(loginBtn);
  document.querySelector('#modal-login').classList.remove('is-hidden');
  addBackdrop();
  addListenersForModals();
}

function addBackdrop() {
  mainHTML.classList.add('backdrop');
}

function removeBackdrop() {
  mainHTML.classList.remove('backdrop');
}

export function closeModal() {
  document.querySelector('#modal-signup').classList.add('is-hidden');
  document.querySelector('#modal-login').classList.add('is-hidden');
  document.querySelector('#signup-email').value = '';
  document.querySelector('#signup-password').value = '';
  document.querySelector('#login-email').value = '';
  document.querySelector('#login-password').value = '';
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
  const signupModal = document.querySelector('#modal-signup');
  const loginModal = document.querySelector('#modal-login');
  console.log(signupModal, loginModal);
  if (e.target !== signupModal || e.target !== loginModal) {
    closeModal();
  }
}
