import {hamburger, methodHamburger} from 'Lib/hamburger/index.js';

const BtnMenu = hamburger;

BtnMenu.prototype = {
  constructor: BtnMenu,
  init: methodHamburger.init,
  toogleMenu: methodHamburger.toogleMenu,
  openMenu: methodHamburger.openMenu,
  closeMenu: methodHamburger.closeMenu,
  destroy: methodHamburger.destroy,
  handleEvent: methodHamburger.handleEvent
}

export {BtnMenu};