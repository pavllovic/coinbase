import auth from 'Components/modal/modal-auth/index.js';
import { coin, card } from 'Components/modal/modal-trade/index';
import sellMenu from 'Components/menu-sell/index.js';
import nav from 'Components/nav/index.js';

nav.init();
sellMenu.init();
auth.init();
coin.init();
card.init();

if (module.hot) {
  module.hot.accept();
}
