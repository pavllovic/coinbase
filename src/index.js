import reviewsGrid from 'Components/reviews-grid';
import style from './css/index.css'; // eslint-disable-line

reviewsGrid.init();

if (module.hot) {
  module.hot.accept();
}
