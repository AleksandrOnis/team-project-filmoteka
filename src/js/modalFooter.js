import * as basicLightbox from 'basiclightbox';

const footerAccess = document.querySelector('.footer');
const linkAccess = document.querySelector('.footer__link');
const modalAccess = document.querySelector('.footer__modal');
const closeFooterModal = document.querySelector('.footer__button');

const instance = basicLightbox.create(document.querySelector('.footer__template'));


function modalFooter(e) {
  console.log(e.target.nodeName);
  if (!e.target.nodeName === 'A') {
    return;
  }
    // const instance = basicLightbox.create(document.querySelector('.footer__template'));

  instance.show();
  window.addEventListener('keydown', onEscapeClose);

    // window.addEventListener('keydown', function closeModal(e){
    //   if (e.code === 'Escape') {
    //     console.log(e.code);
    //     instance.close()
    //   }
    // })
  } 


// window.removeEventListener('keydown', (e) => {
//   if (e.code === 'Escape') {
//     console.log(e.code);
//     instance.close()
//   }
// })
function removeListener() {
  window.removeEventListener('keydown', closeModal);
}
// window.addEventListener('keydown', closeModal);
function onEscapeClose(e) {
  console.log(e);
   if (e.code === 'Escape') {
    console.log(e.code);
     instance.close()
     removeListener()
  }
}
// function onBtnClose() {
//    instance.close()
//      removeListener()
// }

// footerAccess.addEventListener('click', modalFooter);

// closeFooterModal.addEventListener('click', closeModal);
// window.addEventListener('keydown', instance.close());

// remove event listener
// check blb for creating a proper modal window
