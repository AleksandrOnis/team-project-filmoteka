import filmCard from '../templates/filmСard.hbs';
// import filmCardLib from '../templates/filmcard-lib.hbs';
import ApiService  from '../js/apiService';
import { createFilmCard,loadTrendFilms} from  './renderHome'
import _ from 'lodash'
console.log(createFilmCard);

const searchForm = document.querySelector('.search-film');
const galleryEl = document.querySelector('.gallery');

console.log(searchForm);

searchForm.addEventListener('input',_.debounce(onSearch,500));
const apiService = new ApiService;


function onSearch(e) {
  e.preventDefault();

  const newSearch = e.target.value.trim();
  apiService.setQuery(newSearch);
  if (newSearch === '') {
    clearGallery()
    apiService.resetPage()
     loadTrendFilms()
return
  }
    clearGallery()
 apiService.resetPage()
    renderFoundFilms()
}

async function renderFoundFilms() {
  const findedFilms = await apiService.getFilmsfromSearch();
  const genres = await apiService.getGenreList();
  const { results, totalResults } = findedFilms;
 
  if (totalResults === 0) {
    clearGallery();
    return;
  }

  const renderedFilms =createFilmCard(results, genres);
  renderImageCard(renderedFilms);

  return renderedFilms;
}

function renderImageCard(cards) {
  galleryEl.insertAdjacentHTML('beforeend', filmCard(cards));
}

function clearGallery() {
  galleryEl.innerHTML = '';
}

/* const replaceFilmId = array => {
    array.forEach(object => {
        if (object.genre_ids) {
            object.genre_ids.forEach((idGenre, indexGenre) => {
                genresList.forEach(objectNames => {
                    if (objectNames.id === idGenre) {
                        object.genre_ids.splice(indexGenre, 1, objectNames['name']);
                    }
                });
            });
        } else {
            object.genre_ids = '';
        }
    });
} */