import LangArr from './data-lang.js';

const select = document.querySelector('select');
const allLang = ['ru', 'ua', 'en'];

select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
  let lang = select.value;
  location.href = window.location.pathname + '#' + lang;
  location.reload();
}

function changeLanguage() {
  let hash = window.location.hash;
  hash = hash.substr(1);
  let selectedLang = localStorage.setItem('language', hash);

  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + `#en`;
    location.reload();
  }
  select.value = hash;

  document.querySelector('.lng-home').innerHTML = LangArr['home'][hash];
  document.querySelector('.lng-library').innerHTML = LangArr['library'][hash];
  document.querySelector('.lng-placeholder').placeholder = LangArr['placeholder'][hash];
  document.querySelector('.lng-rights').innerHTML = LangArr['rights'][hash];
  document.querySelector('.lng-developer').innerHTML = LangArr['developer'][hash];
  document.querySelector('.lng-by').innerHTML = LangArr['by'][hash];
  document.querySelector('.lng-students').innerHTML = LangArr['students'][hash];
}

changeLanguage();

export function changeLanguageLibBtn() {
  let hash = localStorage.getItem('language');

  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + `#en`;
    location.reload();
  }
  select.value = hash;

  document.querySelector('.lng-watchedLib').innerHTML = LangArr['watchedLib'][hash];
  document.querySelector('.lng-queueLib').innerHTML = LangArr['queueLib'][hash];

  document.querySelector('.lng-login').innerHTML = LangArr['login'][hash];
  document.querySelector('.lng-signUp').innerHTML = LangArr['signUp'][hash];
}

export function changeLanguageFilmCard() {
  let hash = localStorage.getItem('language');
  console.log(hash);

  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + `#en`;
    location.reload();
  }
  select.value = hash;

  document.querySelector('.lng-vote').innerHTML = LangArr['vote'][hash];
  document.querySelector('.lng-popularity').innerHTML = LangArr['popularity'][hash];
  document.querySelector('.lng-title').innerHTML = LangArr['title'][hash];
  document.querySelector('.lng-genre').innerHTML = LangArr['genre'][hash];
  document.querySelector('.lng-about').innerHTML = LangArr['about'][hash];
  document.querySelector('.lng-watch').innerHTML = LangArr['watch'][hash];
  document.querySelector('.lng-queue').innerHTML = LangArr['queue'][hash];
}

export function changeLanguageModalFooter() {
  let hash = localStorage.getItem('language');
  console.log(hash);

  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + `#en`;
    location.reload();
  }
  select.value = hash;

  document.querySelector('.lng-team').innerHTML = LangArr['team'][hash];
  document.querySelector('.lng-olha').innerHTML = LangArr['olha'][hash];
  document.querySelector('.lng-oleksandr').innerHTML = LangArr['oleksandr'][hash];
  document.querySelector('.lng-anastasiia').innerHTML = LangArr['anastasiia'][hash];
  document.querySelector('.lng-margarita').innerHTML = LangArr['margarita'][hash];
  document.querySelector('.lng-evgeniy').innerHTML = LangArr['evgeniy'][hash];
  document.querySelector('.lng-andrew').innerHTML = LangArr['andrew'][hash];
}
