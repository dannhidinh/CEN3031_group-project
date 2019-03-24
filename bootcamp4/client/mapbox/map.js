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
map.on('load', function () {
  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [-82.332681, 29.650244]
          },
          "properties": {
            "title": "Bodega at the Hub",
            "icon": "marker"
          }
        }]
      }
    },
    "layout": {
      "icon-image": "{icon}-15",
      "text-field": "{title}",
      "text-font": ["Arial Unicode MS Bold"],
      "text-anchor": "top"
    }
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
