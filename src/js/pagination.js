import Pagination from 'tui-pagination';

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

export default function pagination(totalResults, fn) {
  const pagination = new Pagination('pagination', { totalItems: totalResults, ...options });

  document.querySelector('.tui-last').textContent = `${Math.ceil(totalResults / 20)}`;
  document.querySelector('.tui-first').textContent = `1`;

  pagination.on('beforeMove', event => {
    fn(event.page);
  });
}
