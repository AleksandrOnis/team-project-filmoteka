import * as basicLightbox from 'basiclightbox';

const modalAccess = document.querySelector('.modal__team');
const footerAccess = document.querySelector('.footer');
const linkAccess = document.querySelector('.footer__link');
const closeFooterModal = document.querySelector('.modal__button');

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
// closeFooterModal.addEventListener('click', e => {
//   console.log(closeFooterModal);
//   modalAccess.style.display = 'none';
// });

// remove event listener
// check blb for creating a proper modal window
