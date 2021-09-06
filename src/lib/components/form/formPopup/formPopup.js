const formPopupMethod = {

  setFormPopupListeners: function() {
    this.form.querySelectorAll('[data-form-popup]').forEach((popup) => {
      popup.addEventListener('click', this);
      popup.addEventListener('keydown', this);
    });
  },

  destroyFormPopup: function() {
    this.form.querySelectorAll('[data-form-popup]').forEach((popup) => {
      popup.removeEventListener('click', this);
      popup.removeEventListener('keydown', this);
    });
  },

  statePopupControls: function() {
    const controls = this.popup.querySelectorAll('[data-popup-control]');
    this.popupOpen ? controls.forEach((btn) => btn.removeAttribute('disabled')) : controls.forEach((btn) => btn.setAttribute('disabled', 'true'));
  },

  toogleFormPopup: function(message) {
    this.popupOpen = !this.popupOpen;
    this.setFormPopupMessage(message);
    this.popup.setAttribute('aria-hidden', !this.popupOpen);
    this.popupOpen ? this.popup.focus() : this.form.querySelector('[type="submit"]').focus();
    this.statePopupControls();
  },

  setFormPopupMessage: function(message) {
    const text = message || '';
    const elem = this.popup.querySelector('[data-popup-msg]');
    elem.innerText = text;
  },

  focusTrapPopup: function(node) {
    const focusableSelector = '[data-popup-control]';
    const focusable = node.querySelectorAll(focusableSelector);

    this.first = focusable[0];
    this.last = focusable[focusable.length - 1];
  },

  keydownPopup: function(e) {
    switch(e.key) {
      case 'Tab':
        if(e.target === this.last && !e.shiftKey) {
          e.preventDefault();
          return this.first.focus();
        }
        if((e.target === this.first) && (e.shiftKey === true)) {
          e.preventDefault();
          return this.last.focus();
        }
        if((e.target === this.popup) && (e.shiftKey === true)) {
          e.preventDefault();
          return this.last.focus();
        }
        break;
      case 'Escape':
        e.stopPropagation();
        return this.toogleFormPopup();
      default:
        break;
    }
    return undefined;
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'click':
        if(e.target.getAttribute('data-popup-control') === 'close-popup') {
          return this.toogleFormPopup();
        }
        if(e.target.getAttribute('data-popup-control') === 'resend-form') {
          return this.resendForm();
        }
        if(e.target.getAttribute('data-popup-control') === 'close-form') {
          return this.resetForm();
        }
        break;
      case 'keydown':
        return this.keydownPopup(e);
      default:
        break;
    }
    return undefined;
  },
};

export default formPopupMethod;
