import Pagination from 'tui-pagination';

const options = {
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn tui-page-btn-{{page}}">{{page}}</a>',
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

export default function pagination(totalResults, onCreateCards) {
  const pagination = new Pagination('pagination', { totalItems: totalResults, ...options });
  const Refs = {
    paginationConteiner: document.querySelector('#pagination'),
    tuiFirst: document.querySelector('.tui-first'),
    tuiLast: document.querySelector('.tui-last'),
    tuiPrev: document.querySelector('.tui-prev'),
    tuiNext: document.querySelector('.tui-next'),
    tuiMorePrev: document.querySelector('.tui-prev-is-ellip'),
    tuiMoreNext: document.querySelector('.tui-next-is-ellip'),
  };
  Refs.tuiLast.insertAdjacentElement('afterend', Refs.tuiNext);
  Refs.tuiFirst.insertAdjacentElement('beforebegin', Refs.tuiPrev);
  Refs.tuiLast.textContent = `${Math.ceil(totalResults / 20)}`;
  Refs.tuiFirst.textContent = `1`;

  pagination.on('afterMove', event => {
    onCreateCards(event.page);
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}
