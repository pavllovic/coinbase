import { KeysActions, getActionFromKey, getUpdatedIndex } from 'Lib/keyActions/KeysActions';

const menuAction = function(elem) {
  this.btn = elem.querySelector('[aria-controls]');
  this.menu = elem.querySelector('[role="menu"]');
  this.arrayActions = Array.from(this.menu.children);

  // state menu
  this.open = false;
  this.actionFocusedIndex = 0;
};

const menuActionMethod = {
  init: function() {
    this.btn.addEventListener('mousedown', this);
    this.btn.addEventListener('click', this);
    this.menu.addEventListener('blur', this);
    this.menu.addEventListener('keydown', this);
    this.arrayActions.forEach((menuitem) => {
      menuitem.addEventListener('click', this);
    });
  },

  toogleMenu: function(e) {
    e.stopPropagation();
    this.open = !this.open;
    this.btn.setAttribute('aria-expanded', this.open);
    this.open ? this.openMenu() : this.closeMenu();
  },

  openMenu: function() {
    this.menu.setAttribute('aria-hidden', 'false');
    this.menu.focus();
    this.focusAction(0);
  },

  closeMenu: function() {
    this.menu.setAttribute('aria-activedescendant', '');
    this.menu.setAttribute('aria-hidden', 'true');
  },

  selectAction: function(e) {
    const role = e.target.getAttribute('role');
    if(role === 'menu') {
      const id = e.target.getAttribute('aria-activedescendant');
      const option = e.target.querySelector(`#${id}`);
      option.click();
    }
  },

  focusAction: function(index) {
    const focusId = this.arrayActions[index].getAttribute('id');
    this.menu.setAttribute('aria-activedescendant', `${focusId}`);

    this.arrayActions[this.actionFocusedIndex].classList.remove('is-focus');
    this.arrayActions[index].classList.add('is-focus');

    this.actionFocusedIndex = index;
  },

  blurMenu: function(e) {
    if(this.ignoreBlur) {
      this.ignoreBlur = false;
      return;
    }
    if(this.open) this.toogleMenu(e);
  },

  mousedownMenu: function() {
    this.ignoreBlur = this.open;
  },

  destroy: function() {
    this.btn.removeEventListener('mousedown', this);
    this.btn.removeEventListener('click', this);
    this.menu.removeEventListener('blur', this);
    this.menu.removeEventListener('keydown', this);
    this.arrayActions.forEach((menuitem) => {
      menuitem.removeEventListener('click', this);
    });
  },

  keydownMenu: function(e) {
    const max = this.arrayActions.length - 1;
    const action = getActionFromKey(e, this.open);

    switch(action) {
      case KeysActions.Next:
      case KeysActions.Previous:
      case KeysActions.First:
      case KeysActions.Last:
        e.preventDefault();
        return this.focusAction(getUpdatedIndex(this.actionFocusedIndex, max, action));
      case KeysActions.Space:
        e.preventDefault();
        return this.btn.focus();
      case KeysActions.CloseSelect:
        e.preventDefault();
        return this.selectAction(e);
      case KeysActions.Close:
        e.preventDefault();
        return this.toogleMenu(e);
      case KeysActions.Blur:
        e.preventDefault();
        return this.toogleMenu(e);
      case KeysActions.Open:
        e.preventDefault();
        return this.toogleMenu(e);
      default:
        break;
    }
    return undefined;
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'click':
        const role = e.target.getAttribute('role');
        if(role === 'menuitem') return this.selectAction(e);
        return this.toogleMenu(e);
      case 'blur':
        return this.blurMenu(e);
      case 'keydown':
        return this.keydownMenu(e);
      case 'mousedown':
        return this.mousedownMenu();
      default:
        break;
    }
    return undefined;
  },
};

export { menuAction, menuActionMethod };
