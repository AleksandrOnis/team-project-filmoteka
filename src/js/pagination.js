import Pagination from 'tui-pagination';
import ApiService from './apiService.js';
import loadTrendFilms from './renderHome';
const apiService = new ApiService();

apiService.totalResults().then(totalPages => {
  console.log(`totalPages=${totalPages} передаем в tui-pagination`);
  const options = {
    totalItems: totalPages,
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
  const pagination = new Pagination('pagination', options);

  pagination.on('beforeMove', event => {
    const currentPage = event.page;
    console.log('🚀 ~ currentPage', currentPage);
    try {
      console.log('🚀 ~ loadTrendFilms', loadTrendFilms);
      loadTrendFilms(currentPage);

      // const { results, totalResults } = apiService.getTrendFilms();
      // results = await apiService.popularMovie(currentPage); //???????????????????????????????????????
      // genres = await apiService.getGenreList(currentPage);
      // createMovieCard(results, genres, currentPage);
    } catch (error) {
      console.log('🚀 ~ Pagination.js 41-43 ~ error2', error);
    }
  });

  document.querySelector('.tui-last').textContent = `${totalPages / 20}`;
  document.querySelector('.tui-first').textContent = `1`;
});
