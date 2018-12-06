var slideItem = document.getElementById('slide-item').innerHTML;
Mustache.parse(slideItem);
var listItems = '';

for (var i = 0; i < mySlides.length; i++) {

    listItems += Mustache.render(slideItem, mySlides[i]);
};

myCarousel.insertAdjacentHTML('beforeend', listItems);





var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    hash: true,
    
});

// element argument can be a selector string
//   for an individual element
var flkty = new Flickity('.main-carousel', {
    // options
});

document.querySelector("#btnStart").addEventListener('click', function () {
    flkty.select(0);
})
var progressBar = document.querySelector('.progress-bar')

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});