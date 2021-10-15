import * as basicLightbox from 'basiclightbox';
import refs from './refs';
const { footerAccess, footerCloseBtn, footerModalAccess } = refs;
footerAccess.addEventListener('click', modalFooter);

function modalFooter(e) {
  if (!e.target.nodeName === 'A') {
    return;
  }
  footerModalAccess.classList.remove('is-hidden');
   document.body.classList.toggle('modal-open');
  window.addEventListener('keydown', onEscapeClose);
  footerCloseBtn.addEventListener('click', closeFooterModal);
}

function removeListener() {
  window.removeEventListener('keydown', onEscapeClose);
}

function onEscapeClose(e) {
  if (e.code === 'Escape') {
    closeFooterModal();
    removeListener();
  }
}

function closeFooterModal() {
  footerModalAccess.classList.add('is-hidden');
}
