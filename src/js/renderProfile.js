import libraryprofile from '../templates/libraryprofile.hbs';
import refs from './refs';
import slideshow from '../templates/slideshow.hbs';
import { closeModal } from './handle-authentication-modals';
const { mainHTML } = refs;
export default function renderProfile() {
  closeModal();
  mainHTML.innerHTML = '';
  const profileMarkup = libraryprofile();

  mainHTML.insertAdjacentHTML('beforeend', profileMarkup);
  const slideshowMarkup = slideshow();
  mainHTML.insertAdjacentHTML('beforeend', slideshowMarkup);
}