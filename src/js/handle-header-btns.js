export function enableHeaderBtns() {
  const btnsLibRef = document.querySelector('.library-header__buttons__wrapper');

  btnsLibRef.querySelector('.btn__watch').disabled = false;
  btnsLibRef.querySelector('.btn__queue').disabled = false;
}
export function disableHeaderBtns() {
  const btnsLibRef = document.querySelector('.library-header__buttons__wrapper');

  btnsLibRef.querySelector('.btn__watch').disabled = true;
  btnsLibRef.querySelector('.btn__queue').disabled = true;
}
