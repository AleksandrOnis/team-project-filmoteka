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
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#en';
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


