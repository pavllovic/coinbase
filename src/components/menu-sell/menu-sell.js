import { menuAction, menuActionMethod } from 'Lib/components/menu-action/menu-action.js';

const MenuSell = menuAction;

MenuSell.prototype = {
  constructor: MenuSell,
  init: menuActionMethod.init,
  toogleMenu: menuActionMethod.toogleMenu,
  openMenu: menuActionMethod.openMenu,
  closeMenu: menuActionMethod.closeMenu,
  selectAction: menuActionMethod.selectAction,
  focusAction: menuActionMethod.focusAction,
  blurMenu: menuActionMethod.blurMenu,
  mousedownMenu: menuActionMethod.mousedownMenu,
  destroy: menuActionMethod.destroy,
  keydownMenu: menuActionMethod.keydownMenu,
  handleEvent: menuActionMethod.handleEvent,
};

export default MenuSell;
