import refs from './refs';
import { renderLibrary } from './renderLibrary';
const { CURRENT_HOME, CURRENT_LIB, bodyAccess } = refs;

export function localStorageCurrent() {
  if (bodyAccess.classList.contains(CURRENT_LIB)) {
    renderLibrary();
  } else {
    console.log('home');
    return;
  }
}

export function setUpSavedMode() {}
