export default function signupValidation() {
  const signupForm = document.getElementById('signup-form');

  const submitBtn = signupForm.querySelector('#submit-button');
  const inputPassword = signupForm.querySelector('#signup-password');
  submitBtn.disabled = true;

  inputPassword.addEventListener('input', () => {
    submitBtn.disabled = !isValid(inputPassword.value);
  });

  if (isValid(inputPassword.value)) {
    submitBtn.disabled = false;
  }
}

function isValid(value) {
  return value.length >= 10;
}
