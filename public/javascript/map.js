var NPMap = {
  div: 'map',
   locateControl: true,
   zoom: 7,
  center: {
    lat: 35.7596,
    lng: -79.0193
  },
   baseLayers: [
    'nps-parkTiles3'
  ],
  div: 'map',
  hashControl: true,
  overlays: [{
    preset: 'nps-places-pois',
    unitCodes: [
      'grsm'
    ]
  }]
};

(function () {
  var s = document.createElement('script');
  s.src = 'https://www.nps.gov/lib/npmap.js/4.0.0/npmap-bootstrap.js';
  document.body.appendChild(s);
})();

/* clickable dropdown button that displays navigation of site */
function dropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

