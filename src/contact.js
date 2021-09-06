import initMap from './components/gmap/gmap.js';

window.initMap = initMap;
window.initMap();

if (module.hot) {
  module.hot.accept();
}
