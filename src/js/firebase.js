import { Request } from './firebase-database';
const signupForm = document.getElementById('signup-form');
console.log(signupForm);

const inputEmail = signupForm.querySelector('#signup-email');
const inputPassword = signupForm.querySelector('#signup-password');
const submitBtn = signupForm.querySelector('#submit-button');

const loginForm = document.getElementById('login-form');

const inputEmailLogin = loginForm.querySelector('#login-email');

const inputPasswordLogin = loginForm.querySelector('#login-password');

// console.log(signupForm);
// console.log(inputEmail);
// console.log(inputPassword);
// console.log(loginForm);
// console.log(inputEmailLogin);
// console.log(inputPasswordLogin);
// console.log(submitBtn);

signupForm.addEventListener('submit', signupHandler);
inputPassword.addEventListener('input', () => {
  submitBtn.disabled = !isValid(inputPassword.value);
});
function signupHandler(e) {
  e.preventDefault();
  console.log(inputPassword.value);
  console.log(inputEmail.value);
  if (isValid(inputPassword.value)) {
    const password = {
      textEmail: inputEmail.value.trim(),
      textPassword: inputPassword.value.trim(),
    };
    submitBtn.disabled = true;
    console.log('Password', password);
    Request.create(password).then(() => {
      inputEmail.value = '';
      inputPassword.value = '';
      submitBtn.disabled = false;
    });
  }
}

function isValid(value) {
  return value.length >= 10;
}
