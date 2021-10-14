import * as basiclightbox from "basiclightbox";
import ApiService from "./apiService";
import modalCardTpl from '../templates/filmDescription'

const apiService = new ApiService;
const basicLightbox = require('basiclightbox')
let detailOfFilm;
let instance;
let closeBtn;


export default function openModalfilm(event) {
    if (event.target.nodeName !== 'IMG' && event.target.nodeName !=='P') {
        return
    }
    apiService.filmId = event.target.dataset.id;
    async function showModal() {
        await createFilmCard()
        const modalCardMarkUp = modalCardTpl(detailOfFilm);
        instance = basicLightbox.create(modalCardMarkUp);
      instance.show()
      closeBtn = document.querySelector('.js-modal-close-btn');
         closeBtn.addEventListener('click',closeModalFilmCard)
    }
  showModal()
   window.addEventListener('keydown',closeModalFilmCard)
}



async function createFilmCard() {
  detailOfFilm = await apiService.getDetailedFilms();
  
    detailOfFilm.year = detailOfFilm.release_date.split('-')[0];

    if ( detailOfFilm.genres.length > 3) {
      detailOfFilm.genres = detailOfFilm.genres.slice(0, 2).flat().concat({ name: 'Other' });
    }
  return detailOfFilm;
}

function closeModalFilmCard(e) {
    if(e.code !=='Escape' && !e.target.classList.contains('close')){
       return
    }
     instance.close();
 }

