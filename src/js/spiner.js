document.body.onload = function () {
    
    setTimeout(function () {
        const spiner = document.querySelector('.spiner');
        console.log(spiner);
        if (!spiner.classList.contains('hidden')) {
            spiner.classList.add('hidden')
        }
    }, 500)
}