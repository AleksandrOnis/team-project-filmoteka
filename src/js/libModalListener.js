import * as basicLightbox from 'basiclightbox';

import filmDescription from '../templates/filmDescription.hbs';
export function libModalListener() {
  document.querySelector('#galleryLib').addEventListener('click', handleLibModal);
}

export function handleLibModal(e) {
  if (e.target.nodeName === 'IMG') {
    console.log(e);
    openLibModal();
  } else {
    console.log(e.target.nodeName);
    return;
  }
}

function openLibModal() {
  const libModalMarkup = filmDescription();
  const instance = basicLightbox.create(libModalMarkup);

  instance.show();
  hideIrrBtns();
}

function hideIrrBtns() {
  document.querySelector('.modal-film__button__wrapper').classList.add('visually-hidden');
}
