import * as basicLightbox from 'basiclightbox';
import refs from './refs';
const { footerAccess, footerCloseBtn, footerModalAccess } = refs;
console.log(footerCloseBtn);
footerAccess.addEventListener('click', modalFooter);

function modalFooter(e) {
  console.log(e.target.nodeName);
  if (!e.target.nodeName === 'A') {
    return;
  }
  footerModalAccess.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscapeClose);
  // window.addEventListener('click', onClickClose);
  footerCloseBtn.addEventListener('click', closeFooterModal);
}

function removeListener() {
  window.removeEventListener('keydown', onEscapeClose);
  // window.removeEventListener('click', onClickClose);
}

function onEscapeClose(e) {
  console.log(e);
  if (e.code === 'Escape') {
    console.log(e.code);
    closeFooterModal();
    removeListener();
  }
}

function closeFooterModal() {
  footerModalAccess.classList.add('is-hidden');
}