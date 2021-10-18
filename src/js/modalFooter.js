// import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import {changeLanguageModalFooter} from '../js/multyLang.js';


const { footerAccess, footerCloseBtn, footerModalAccess, bodyAccess } = refs;
footerAccess.addEventListener('click', modalFooter);
console.log(footerModalAccess);

function modalFooter(e) {
  if (!e.target.nodeName === 'A') {
    return;
  }
  footerModalAccess.classList.remove('is-hidden');
  //  document.body.classList.toggle('modal-open');
  window.addEventListener('keydown', onEscapeClose);

  bodyAccess.classList.add('modal-open');
  
  footerCloseBtn.addEventListener('click', closeFooterModal);
  changeLanguageModalFooter();
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
  bodyAccess.classList.remove('modal-open');
}