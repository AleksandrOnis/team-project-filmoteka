import filmCard from "../templates/filmСard.hbs";
// import filmCardLib from '../templates/filmcard-lib.hbs';

import axios from 'axios';
import { filmsApiService } from '../js/apiService';
console.log(filmsApiService);
import { genreList } from '../js/apiService';
import genres from "../data/genres.json";
console.log(genres);

// console.log(genreList.getGenreList());

// genreList.getGenreList().then(({ list }) => {
//     console.log(list);
//     return list;
// })


const galleryEl = document.querySelector('.gallery');
console.log(galleryEl);

///по данным из запроса  создаем галерею

// function replaceFilmId(array) {
//     array.forEach(object => {
//     if (object.genre_ids) {
//       object.genre_ids.forEach((idGenre, indexGenre) => {
//         genres.forEach(objectNames => {
//           if (objectNames.id === idGenre) {
//               object.genre_ids.splice(indexGenre, 1, objectNames['name']);
//                console.log(object.genre_ids);
//           }
//         });
//       });
//     } else {
//       object.genre_ids = '';
//     }
       
//    });
//     // console.log(arrayId);
//     // return arrayId;
// }

filmsApiService.popularMovie().then((data) => {
  
          const { results } = data;
        // let imgUrl = `https://image.tmdb.org/t/p/original${data.results[1].poster_path}`;

    const newResults = getData(results)
        console.log(newResults);
    renderImageCard(newResults);

  
});

////добавляем разметку  на страницу
function renderImageCard(cards) {
    galleryEl.insertAdjacentHTML('beforeend', filmCard(cards))
}
  

/////обновляем год и название в массиве из бека 


function getData(arr) {
    
 return arr.map(el => {
    const filteredGenres = genres.filter(genre => el.genre_ids.includes(genre.id));
    console.log('filteredGenres: ', filteredGenres);

    const mapedGenres = filteredGenres.map(({ name }) => name);
    console.log('mapedGenres: ', mapedGenres);

    let slicedMapedGenres = [];

    if (mapedGenres.length < 3) {
      el.genre_ids = mapedGenres;
    } else {
      el.genre_ids = mapedGenres.slice(0, 2);
    }
console.log(el.genre_ids);
 
        // год корректируем из  даты 
        if (el.release_date) {
            el.release_date = el.release_date.slice(0, 4)
        }
        if (el.first_air_date) {
            el.release_date = el.first_air_date.slice(0, 4)
        }

        //название корректируем если нет title
        if (!el.title) {
            el.title = el.name;
        }
        //рейтінг корректируем с точкой
        el.vote_average = String(el.vote_average).padEnd(3, '.0');
        // console.log(el.vote_average);
        
                console.log(el);
                return el;
            }
            )
    }

