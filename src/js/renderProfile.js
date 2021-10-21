import libraryprofile from '../templates/libraryprofile.hbs';
import stopSlideshow from '../templates/stop-slideshow.hbs';

import refs from './refs';
import slideshow from '../templates/slideshow.hbs';
import { closeModal } from './handle-authentication-modals';
import { hideBtns } from './handle-modal-btns';
import { logOutListener } from './handle-logged-in-user';
import { renderGalleryLib } from './renderGalleryLib';
import { removeBackdrop } from './handle-authentication-modals';
const { mainHTML } = refs;

export default function renderProfile() {
  // closeModal();
  mainHTML.innerHTML = '';
  const profileMarkup = libraryprofile();

  mainHTML.insertAdjacentHTML('beforeend', profileMarkup);
  const slideshowMarkup = slideshow();
  mainHTML.insertAdjacentHTML('beforeend', slideshowMarkup);
  removeBackdrop();
  const stopSlideshowMarkup = stopSlideshow();
  mainHTML.insertAdjacentHTML('beforeend', stopSlideshowMarkup);
  renderGalleryLib();
  // document.querySelector('#account-button').addEventListener('click', openAccountModal);
}

function openAccountModal() {
  hideBtns();
}
