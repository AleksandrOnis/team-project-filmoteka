import * as basicLightbox from 'basiclightbox';

const modalAccess = document.querySelector('.modal__team');
const footerAccess = document.querySelector('.footer');
const linkAccess = document.querySelector('.footer__link');

function modalFooter(e) {
  console.log(e.target.nodeName);
  if (e.target.nodeName === 'A') {
    const instance = basicLightbox.create(`
    <img src="https://images.pexels.com/photos/4241412/pexels-photo-4241412.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" width="200">
`);

    instance.show();
  } else {
    return;
  }
}

footerAccess.addEventListener('click', modalFooter);

// remove event listener
// check blb for creating a proper modal window
