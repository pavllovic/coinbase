import { nav, navMethods } from 'Lib/components/nav/nav.js';

const Nav = nav;

Nav.prototype = {
  constructor: Nav,
  init: navMethods.init,
  openMenu: navMethods.openMenu,
  closeMenu: navMethods.closeMenu,
  toogleMenu: navMethods.toogleMenu,
  destroy: navMethods.destroy,
  handleEvent: navMethods.handleEvent,
};

export default Nav;
