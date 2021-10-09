import LangArr from './data-lang.js';

//нужно добавить в верстку header
//<select class="change-lang">
//  <option value="ua">EN</option>
//  <option value="ua">RU</option>
//  <option value="ru">UA</option>
//</select>
// тексту который певеодим нужно добавить class "lang-"+"ключевое слово соответвующее тексту"


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
    hash = hash.substring([hash.length - 2]);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
    }
  select.value = hash;
  
  for (let key in LangArr) {
    document.querySelector(`.lng-${key}`).innerHTML = LangArr[key][hash];
  }
}

changeLanguage()

