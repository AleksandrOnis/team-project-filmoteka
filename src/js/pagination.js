import Pagination from 'tui-pagination';
import ApiService from './apiService.js';
import loadTrendFilms from './renderHome';
import renderFoundFilms from './renderSearchMovie';

const apiService = new ApiService();
let totalPages = null;
const options = {
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      // (type-first, previous, next, last)
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      // (type-first, previous, next, last)
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

// if (flag===1) {} // search
// if (flag===2) {} // library
// else {} // home (default)

// home (default)
// apiService.totalResults().then(totalResults => {
//   totalPages = totalResults;
//   console.log(`totalPages=${totalPages} передаем в tui-pagination`);
//   const pagination = new Pagination('pagination', { totalItems: totalPages, ...options });

//   pagination.on('beforeMove', event => {
//     loadTrendFilms(event.page);
//   });

//   document.querySelector('.tui-last').textContent = `${totalPages / 20}`;
//   document.querySelector('.tui-first').textContent = `1`;
// });

export default function pagination(totalPages) {
  console.log(`totalPages=${totalPages} передаем в tui-pagination`);
  const pagination = new Pagination('pagination', { totalItems: totalPages, ...options });

  pagination.on('beforeMove', event => {
    loadTrendFilms(event.page);
  });

  document.querySelector('.tui-last').textContent = `${totalPages / 20}`;
  document.querySelector('.tui-first').textContent = `1`;
}
