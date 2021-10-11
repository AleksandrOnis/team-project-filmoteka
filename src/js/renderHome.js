import filmCard from '../templates/filmСard.hbs';
// import filmCardLib from '../templates/filmcard-lib.hbs';
import { popularMovie, getGenreList } from './apiService.js';

const galleryEl = document.querySelector('.gallery');
console.log(galleryEl);

///по данным из запроса  создаем галерею
async function createMovieCard() {
  const results = await popularMovie();
  const genres = await getGenreList();
  // let imgUrl = `https://image.tmdb.org/t/p/original${data.results[1].poster_path}`;
  const newResults = getData(results, genres);
  console.log(newResults);
  renderImageCard(newResults);
}

////добавляем разметку  на страницу
function renderImageCard(cards) {
  galleryEl.insertAdjacentHTML('beforeend', filmCard(cards));
}

/////обновляем год и название в массиве из бека

function getData(trendFilm, filmGenres) {
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
createMovieCard();

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