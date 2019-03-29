mapboxgl.accessToken = 'pk.eyJ1IjoiZGFubmhpOTkiLCJhIjoiY2p0ZXJ0eTFjMWxlcjQ0bDZndm1nMHk5eSJ9.nwDTlVR1P1LZEyRKMW4o9g';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center:[-82.332681, 29.650244],
  zoom: 10
});

// load location of Bodega
map.on('load', function () {
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
              properties: {"title": "Bodega at the Hub",
                           "description": "<p>This be a description lolz.",
                           "icon": "marker"},
              geometry: {type: "Point",coordinates: [ -82.3327, 29.6502]}
            },
            {
              type: 'Feature',
              properties: {"title": "Bodega at Exactech",
                           "description": "<p></p>",
                           "icon": "marker"},
              geometry: {type: "Point", coordinates: [ -82.356005, 29.717539]}
            }
          ]
        },
      },
      layout: {
        "icon-image": "custom-marker",
        "icon-allow-overlap": true,
        "icon-size": 0.75,
        "text-field": "{title}",
        "text-font": ["Arial Unicode MS Bold"],
        "text-offset": [0, 1],
        "text-anchor": "top",
      }
    });
  });
  map.on('click', 'places', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360; }
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
    });
    map.on('mouseenter', 'places', function () {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'places', function () {
      map.getCanvas().style.cursor = '';
    });
});

// navigation control
map.addControl(new mapboxgl.NavigationControl());

// geolocate control - locate user
map.addControl(new mapboxgl.GeolocateControl ({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
}));
