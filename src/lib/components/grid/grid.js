const grid = function(elem) {
  this.grid = elem;
  this.focusedCell = this.grid.firstElementChild;
};

const gridMethod = {

  init: function() {
    this.grid.addEventListener('keydown', this);
    this.focusedCell.setAttribute('tabindex', '0');
  },

  nextCell: function() {
    const nextElem = this.focusedCell.nextElementSibling;
    if(nextElem) this.switchFocus(nextElem);
  },

  prevCell: function() {
    const prevElem = this.focusedCell.previousElementSibling;
    if(prevElem) this.switchFocus(prevElem);
  },

  switchFocus: function(elem) {
    elem.setAttribute('tabindex', '0');
    elem.focus();
    // this.focusedCell.removeAttribute('tabindex');
    this.focusedCell.setAttribute('tabindex', '-1');
    this.focusedCell = elem;
  },

  focusStart: function() {
    const firstElem = this.grid.firstElementChild;
    this.switchFocus(firstElem);
  },

  focusEnd: function() {
    const lastElem = this.grid.lastElementChild;
    this.switchFocus(lastElem);
  },

  onKeydown: function(e) {
    switch(e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        return this.nextCell();
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        return this.prevCell();
      case 'PageUp':
        e.preventDefault();
        return this.focusStart();
      case 'PageDown':
        e.preventDefault();
        return this.focusEnd();
      default:
        break;
    }
    return undefined;
  },

  destroy: function() {
    this.grid.removeEventlistener('keydown', this);
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'keydown':
        return this.onKeydown(e);
      default:
        break;
    }
    return undefined;
  },
};

export { grid, gridMethod };
