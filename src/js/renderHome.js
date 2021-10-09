import filmCard from "../templates/filmСard.hbs";
// import filmCardLib from '../templates/filmcard-lib.hbs';

import axios from 'axios';
import { filmsApiService } from '../js/apiService';
console.log(filmsApiService);
import { genreList } from '../js/apiService';
console.log(genreList.getGenreList());

let list = [];

const galleryEl = document.querySelector('.gallery');
console.log(galleryEl);

///по данным из запроса  создаем галерею

filmsApiService.popularMovie().then((data) => {
    const { results } = data;
        // let imgUrl = `https://image.tmdb.org/t/p/original${data.results[1].poster_path}`;
    const newResults = getData(results)
    console.log(newResults);
    renderImageCard(newResults)
});

////добавляем разметку  на страницу
function renderImageCard(cards) {
    galleryEl.insertAdjacentHTML('beforeend', filmCard(cards))
}
  

/////обновляем год и название в массиве из бека 


function getData(arr) {
    return arr.map(el => {
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
        console.log(el.vote_average);
 
        
console.log(el);
        return el;
    }
    )
}
     
