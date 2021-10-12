import * as basicLightbox from 'basiclightbox';

const footerAccess = document.querySelector('.footer');
const linkAccess = document.querySelector('.footer__link');
const modalAccess = document.querySelector('.footer__modal');

footerAccess.addEventListener('click', modalFooter);

const instance = basicLightbox.create(document.querySelector('.footer__template'));

function modalFooter(e) {
  console.log(e.target.nodeName);
  if (!e.target.nodeName === 'A') {
    return;
  }
  instance.show();
  window.addEventListener('keydown', onEscapeClose);
}

function removeListener() {
  window.removeEventListener('keydown', onEscapeClose);
}

function onEscapeClose(e) {
  console.log(e);
   if (e.code === 'Escape') {
    console.log(e.code);
     instance.close()
     removeListener()
  }
}



