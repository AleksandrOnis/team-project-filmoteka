import filmCard from '../templates/filmСard.hbs';
import ApiService from './apiService.js';
import openModalfilm from './modal.js';
import pagination from './pagination.js';
import { showSpiner, hideSpiner } from './spiner.js';
// import filmCardLib from '../templates/filmcard-lib.hbs';
const galleryEl = document.querySelector('.gallery');
let newQuery = 1;
const apiService = new ApiService();
///по данным из запроса  создаем галерею

export default async function loadTrendFilms(page = 1) {
  const { results, totalResults } = await apiService.getTrendFilms(page);
  const genres = await apiService.getGenreList(page);
  // let imgUrl = `https://image.tmdb.org/t/p/original${data.results[1].poster_path}`;
  if (totalResults === 0) {
    clearGallery();
    return;
  }
  if (newQuery === 1) {
    pagination(totalResults, loadTrendFilms);
    newQuery = 0;
  }
  showSpiner();
  const filmCard = createFilmCard(results, genres, page);
  renderFilmCard(filmCard);
  hideSpiner();
  return;
}

////добавляем разметку  на страницу
function renderFilmCard(cards) {
  clearGallery();
  galleryEl.insertAdjacentHTML('beforeend', filmCard(cards));
  return;
}

/////обновляем год и название в массиве из бека

export function createFilmCard(trendFilm, filmGenres, page = 1) {
  return trendFilm.map(film => {
    film.year = film.release_date ? film.release_date.slice(0,4): 'N/A';
    if (film.genre_ids.length > 0 && film.genre_ids.length <= 3) {
      film.genres = film.genre_ids.map(id => filmGenres.filter(el => el.id === id)).flat();
    }
    if (film.genre_ids.length > 3) {
      film.genres = film.genre_ids
        .map(id => filmGenres.filter(el => el.id === id))
        .slice(0, 2)
        .flat()
        .concat({ name: 'Other' });
    }
    if (film.genre_ids.length === 0) {
      film.genres = [{ name: 'N/A' }];
    }
    return film;
  });
}
function clearGallery() {
  galleryEl.innerHTML = '';
}

loadTrendFilms();
galleryEl.addEventListener('click', openModalfilm);
// function getGenreById(genreId) {
//   genreList.getGenreList().then(res => {
//     const data = res.list;
//     data.forEach(el => {
//       console.log(el);
//       if (el.id === genreId) {
//         genreId = el.name;
//         console.log(genreId);
//       }
//     });
//   });
