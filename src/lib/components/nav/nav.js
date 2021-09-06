const nav = function(id) {
  this.btn = document.querySelector(`[aria-controls='${id}']`);
  this.menu = document.querySelector(`#${id}`);
  // state nav
  this.open = false;
};

const navMethods = {
  init: function() {
    this.btn.addEventListener('click', this);
  },

  openMenu: function() {
    this.btn.setAttribute('aria-expanded', 'true');
  },

  closeMenu: function() {
    this.btn.setAttribute('aria-expanded', 'false');
  },

  toogleMenu: function() {
    this.open ? this.closeMenu() : this.openMenu();
    this.open = !this.open;
  },

  destroy: function() {
    this.btn.removeEventListener('click', this);
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'click':
        return this.toogleMenu();
      default:
        break;
    }
    return undefined;
  },
};

export { nav, navMethods };
