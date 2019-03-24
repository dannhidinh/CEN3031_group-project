mapboxgl.accessToken = 'pk.eyJ1IjoiZGFubmhpOTkiLCJhIjoiY2p0ZXJ0eTFjMWxlcjQ0bDZndm1nMHk5eSJ9.nwDTlVR1P1LZEyRKMW4o9g';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center:[-82.332681, 29.650244],
  zoom: 12.5
});


// navigation control
map.addControl(new mapboxgl.NavigationControl());

// load location of Bodega
map.on("load", function () {
  map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
    if (error) throw error;
    map.addImage("custom-marker", image);
    map.addLayer({
      id: "markers",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: 'Feature',
              properties: {
                "title": "Bodega at the Hub",
              },
              geometry: {
                type: "Point",
                coordinates: [ -82.3327, 29.6502]
              }
            }
          ]
        }
      },
      layout: {
        "icon-image": "custom-marker",
        "icon-size": 0.75,
        "text-field": "{title}",
        "text-font": ["Arial Unicode MS Bold"],
        "text-anchor": "top"
      }
    });
  });
});

// geolocate control - locate user
map.addControl(new mapboxgl.GeolocateControl ({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
}));

// distance
