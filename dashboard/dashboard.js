import * as maptilersdk from '@maptiler/sdk';

maptilersdk.config.apiKey = 'gm2EYqR1nDRlUcaiw7nu';
const map = new maptilersdk.Map({
  container: 'map-div', // container's id or the HTML element to render the map
  style: "backdrop",
  center: [16.62662018, 49.2125578], // starting position [lng, lat]
  zoom: 14, // starting zoom
});

