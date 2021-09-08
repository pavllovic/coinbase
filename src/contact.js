import initMap from './components/gmap/gmap.js'; // eslint-disable-line
import style from './css/contact.css'; // eslint-disable-line

window.initMap = initMap;

if (module.hot) {
  module.hot.accept();
}
