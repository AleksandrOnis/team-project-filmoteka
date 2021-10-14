import * as basicLightbox from 'basiclightbox';
import refs from './refs';
const { footerAccess, footerCloseBtn, footerModalAccess } = refs;
footerAccess.addEventListener('click', modalFooter);

function modalFooter(e) {
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
  if (e.code === 'Escape') {
    closeFooterModal();
    removeListener();
  }
}

function closeFooterModal() {
  footerModalAccess.classList.add('is-hidden');
}
