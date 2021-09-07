import initMap from './components/gmap/gmap.js';

window.initMap = initMap;

if (module.hot) {
  module.hot.accept();
}
