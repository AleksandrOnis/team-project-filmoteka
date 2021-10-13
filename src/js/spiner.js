const spiner = document.querySelector('.spiner');

export function showSpiner() {
  const spiner = document.querySelector('.spiner');
  // const spiner = document.querySelector('.spiner');
  spiner.classList.remove('hidden');
}

export function hideSpiner() {
  setTimeout(function () {
    if (!spiner.classList.contains('hidden')) {
      spiner.classList.add('hidden');
    }
  }, 500);
}

document.body.onload = hideSpiner();
