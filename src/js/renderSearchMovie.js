import filmCard from '../templates/filmСard.hbs';
// import filmCardLib from '../templates/filmcard-lib.hbs';

import axios from 'axios';
import { searchFilmsApiService } from '../js/apiService';
import { genreList } from '../js/apiService';
const debounce = require('lodash.debounce');

console.log();

const searchForm = document.querySelector('.search-film');
const galleryEl = document.querySelector('.gallery');

console.log(searchForm);

searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const newSearch = e.target.value.trim();
  searchFilmsApiService.setQuery(newSearch);

  searchFilmsApiService.searchMovie().then(res => {
     
    console.log(res.results)
    clearGallery();
  
    renderImageCard(res.results);
  });
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