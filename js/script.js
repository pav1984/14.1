//JS MUSTACHE
var slideItem = document.getElementById('slide-item').innerHTML;
Mustache.parse(slideItem);
var listItems = '';
for (var i = 0; i < mySlides.length; i++) {
    listItems += Mustache.render(slideItem, mySlides[i]);
}
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
//RESTART BUTTON
document.querySelector("#btnStart").addEventListener('click', function () {
    flkty.select(0);
})
//PROGRESS BAR
var progressBar = document.querySelector('.progress-bar')

flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});

//MAPS+CAROUSEL

window.initMap = function () {
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 1,
      center: mySlides[0].coords,
  });
    for (var i = 0; i < mySlides.length; i++) {
        var marker = new google.maps.Marker({
            position: mySlides[i].coords,
            map: map,           
        });
          function slide (i) {
              marker.addListener('click', function () {
                  flkty.select(i);
              });
          } 
          slide(i); 
    }
//FLICKITY ONCHANGE

flkty.on('change', function (index) {
   smoothPanAndZoom(map,8,mySlides[index].coords) 
});

//FUNKCJE 

var smoothPanAndZoom = function (map, zoom, coords) {
    var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
    jumpZoom = Math.min(jumpZoom, zoom - 1);
    jumpZoom = Math.max(jumpZoom, 3);
    smoothZoom(map, jumpZoom, function () {
        smoothPan(map, coords, function () {
            smoothZoom(map, zoom);
        });
    });
};
var smoothZoom = function (map, zoom, callback) {
    var startingZoom = map.getZoom();
    var steps = Math.abs(startingZoom - zoom);

    if (!steps) { 
        if (callback) {         
            callback();
        }
        return;
    }
    var stepChange = -(startingZoom - zoom) / steps;
    var i = 0;
    var timer = window.setInterval(function () { 
        if (++i >= steps) {         
            window.clearInterval(timer);        
            if (callback) {              
                callback();
            }
        }      
        map.setZoom(Math.round(startingZoom + stepChange * i));
    }, 80);
};

var smoothPan = function (map, coords, callback) {
var mapCenter = map.getCenter();
coords = new google.maps.LatLng(coords);

var steps = 12;
var panStep = {
    lat: (coords.lat() - mapCenter.lat()) / steps,
    lng: (coords.lng() - mapCenter.lng()) / steps
};

var i = 0;
var timer = window.setInterval(function () {
    if (++i >= steps) {
        window.clearInterval(timer);
        if (callback) callback();
    }
    map.panTo({
        lat: mapCenter.lat() + panStep.lat * i,
        lng: mapCenter.lng() + panStep.lng * i
    });
}, 1000 / 30);
};

}

