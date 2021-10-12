const spiner = document.querySelector('.spiner')
console.log(spiner);
  
export function showSpiner() {
    const spiner = document.querySelector('.spiner')
// const spiner = document.querySelector('.spiner');
console.log(spiner);
    console.log(`вкл  спин`);
    spiner.classList.remove('hidden')
}

export function hideSpiner() {
     console.log(`ВЫКЛ  спин`);
    setTimeout(function () {
        if (!spiner.classList.contains('hidden')) {
            spiner.classList.add('hidden')
        }
    }, 500)
}

document.body.onload = hideSpiner()
