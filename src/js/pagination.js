import Pagination from 'tui-pagination';
import ApiService from './apiService.js';
import loadTrendFilms from './renderHome';
import renderFoundFilms from './renderSearchMovie';
console.log('🚀 ~ renderFoundFilms', renderFoundFilms);

let isNewPagination = null;
const apiService = new ApiService();

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
// else {} // home (default)

// home (default)
////////////////
// try {
//   apiService.totalResults().then(totalResults => {
//     totalPages = totalResults;
//     console.log('🚀 ~ apiService.totalResults ~ totalPages', totalPages);
//     console.log(`totalPages=${totalPages} передаем в tui-pagination`);
//     const pagination = new Pagination('pagination', { totalItems: totalPages, ...options });

//     pagination.on('beforeMove', event => {
//       loadTrendFilms(event.page);
//     });

//     document.querySelector('.tui-last').textContent = `${totalPages / 20}`;
//     document.querySelector('.tui-first').textContent = `1`;
//   });
// } catch (error) {
//   console.log('🚀 ~ error', error);
// }
export default function pagination(totalResults, fn) {
  console.log(`totalPages=${totalResults} передаем в tui-pagination`);
  const pagination = new Pagination('pagination', { totalItems: totalResults, ...options });

  document.querySelector('.tui-last').textContent = `${Math.ceil(totalResults / 20)}`;
  document.querySelector('.tui-first').textContent = `1`;

  pagination.on('beforeMove', event => {
    fn(event.page);
  });
}

// const pagination = new Pagination('pagination', { totalItems: totalResults, ...options });
// document.querySelector('.tui-last').textContent = `${totalPages / 20}`;
// document.querySelector('.tui-first').textContent = `1`;
// pagination.on('beforeMove', event => {
//   loadTrendFilms(event.page);
// });

// try {
//   const pagination = new Pagination('pagination', { totalItems: totalResults, ...options });
//   document.querySelector('.tui-last').textContent = `${totalPages / 20}`;
//   document.querySelector('.tui-first').textContent = `1`;
//   pagination.on('beforeMove', event => {
//     loadTrendFilms(event.page);
//   });
// } catch (error) {
//   console.log('🚀 ~ error', error);
// }
