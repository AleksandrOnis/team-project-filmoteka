import filmCard from '../templates/filmСard.hbs';
import ApiService from './apiService.js';
import openModalfilm from './modal.js';
// import filmCardLib from '../templates/filmcard-lib.hbs';

///////////////////////////////////OLD

// import { popularMovie, getGenreList } from './apiServicePopularMovieFn.js';

// const galleryEl = document.querySelector('.gallery');
// console.log(galleryEl);

// const apiService = new ApiService();

// ///по данным из запроса  создаем галерею
// async function createMovieCard(page = 1) {
//   console.log('🚀 ~ page', page);
//   galleryEl.innerHTML = '';
//   const results = await apiService.popularMovie(page); //???????????????????????????????????????
//   const genres = await apiService.getGenreList(page);
//   // let imgUrl = `https://image.tmdb.org/t/p/original${data.results[1].poster_path}`;
//   const newResults = getData(results, genres);
//   renderImageCard(newResults);
// }
////////////////////////////////////OLD

const galleryEl = document.querySelector('.gallery');
console.log(galleryEl);

const apiService = new ApiService();
///по данным из запроса  создаем галерею
export default async function loadTrendFilms(page = 1) {
  console.log('🚀 ~ loadTrendFilms ~ page', page);
  const { results, totalResults } = await apiService.getTrendFilms(page);
  const genres = await apiService.getGenreList(page);
  // let imgUrl = `https://image.tmdb.org/t/p/original${data.results[1].poster_path}`;
  if (totalResults === 0) {
    clearGallery();
    return;
  }
  const filmCard = createFilmCard(results, genres, page);
  renderFilmCard(filmCard);
}

////добавляем разметку  на страницу
function renderFilmCard(cards) {
  galleryEl.insertAdjacentHTML('beforeend', filmCard(cards));
}

/////обновляем год и название в массиве из бека

export function createFilmCard(trendFilm, filmGenres, page = 1) {
  console.log('🚀 ~ createFilmCard ~ page', page);
  return trendFilm.map(film => {
    film.year = film.release_date.split('-')[0];
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
      film.genres = [{ name: 'n/a' }];
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
