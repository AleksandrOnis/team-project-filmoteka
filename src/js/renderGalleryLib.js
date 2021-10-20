import filmCard from "../templates/filmcard-lib.hbs";
import { createFilmCard } from "./renderHome";

export function renderGalleryLib() {
  const btnsLibRef = document.querySelector(
    ".library-header__buttons__wrapper"
  );
  const btnWatchedRef = btnsLibRef.querySelector(".btn__watch");
  const btnQueueRef = btnsLibRef.querySelector(".btn__queue");
  console.log("🚀 ~ renderGalleryLib ~ btnQueueRef", btnQueueRef);
  btnWatchedRef.disabled = false;
  btnQueueRef.disabled = false;
  btnWatchedRef.addEventListener("click", renderWatched);
  btnQueueRef.addEventListener("click", renderQueue);
  console.log("🚀 ~ renderLibrary ~ btn-ON");

  const galleryLib = document.querySelector("#galleryLib");

  function renderWatched() {
    showSpiner();
    const films = getWatchedFromLocalStorage();
    const genres = films.flatMap((film) => film.genres); //.filter(); //unik
    // console.log('🚀 ~ renderWatched ~ genres', genres);
    // const filmCard = createFilmCard(films, genres); //ошибка по жанрам
    renderFilmCard(films);
    if (galleryLib.classList.contains("is-hidden")) {
      galleryLib.classList.remove("is-hidden");
    }
    hideSpiner();
  }

  function renderQueue() {
    showSpiner();
    galleryLib.classList.toggle("is-hidden");
    const films = getQueueFromLocalStorage();
    const genres = films.flatMap((film) => film.genres); //.filter(); //unik
    // console.log('🚀 ~ renderWatched ~ genres', genres);
    // const filmCard = createFilmCard(films, genres); //ошибка по жанрам
    renderFilmCard(films);
    if (galleryLib.classList.contains("is-hidden")) {
      galleryLib.classList.remove("is-hidden");
    }
    hideSpiner();
  }

  function renderFilmCard(films = 0) {
    galleryLib.innerHTML = "";
    galleryLib.insertAdjacentHTML("beforeend", filmCard(films));
  }

  function getWatchedFromLocalStorage() {
    return JSON.parse(localStorage.getItem("Watched") || "[]");
  }

  function getQueueFromLocalStorage() {
    return JSON.parse(localStorage.getItem("Queue") || "[]");
  }
}
