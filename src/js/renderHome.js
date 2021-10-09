import filmCard from "../templates/filmСard.hbs";
import axios from 'axios';
import filmsApiService from '../js/apiService';


const galleryEl = document.querySelector('.gallery');
console.log(galleryEl);

filmsApiService.popularMovie().then((data) => {
    const { results } = data;
    console.log(data);
                console.log(data.results);
                console.log(data.results[0]);
                console.log(data.results[0].poster_path);
                let imgUrl = `https://image.tmdb.org/t/p/original${data.results[1].poster_path}`;
                console.log(imgUrl);

    

    
    const newResults = getData(results)
    console.log(newResults);
    renderImageCard(newResults)
});


function renderImageCard(cards) {
    galleryEl.insertAdjacentHTML('beforeend', filmCard(cards))
  }

function getData(arr) {
    return arr.map(el => {
        if (el.release_date) {
            el.release_date = el.release_date.slice(0, 4)
        }
        if (el.first_air_date) {
            el.release_date = el.first_air_date.slice(0, 4)
        }
        if (!el.title) {
            el.title = el.name;
        }
    
        return el;
    }
     ) }