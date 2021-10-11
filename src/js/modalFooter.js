import * as basicLightbox from 'basiclightbox';

const footerAccess = document.querySelector('.footer');
const linkAccess = document.querySelector('.footer__link');
const modalAccess = document.querySelector('.footer__modal');
const closeFooterModal = document.querySelector('.footer__button');

function modalFooter(e) {
  console.log(e.target.nodeName);
  if (e.target.nodeName === 'A') {
    const instance = basicLightbox.create(document.querySelector('.footer__template'));

    instance.show();
  } else {
    return;
  }
}
footerAccess.addEventListener('click', modalFooter);

// closeFooterModal.addEventListener('click', closeModal);
// window.addEventListener('keydown', instance.close());

// remove event listener
// check blb for creating a proper modal window
