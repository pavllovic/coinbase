const modal = function(wrap, startModal, btns) {
  this.wrap = wrap;
  this.box = wrap.querySelector('.modal-box');
  this.btns = btns;
  this.startModal = startModal;
  this.activeModal = startModal;
  this.siblings = new Map();
};

const modalMethod = {

  init: function() {
    this.wrap.addEventListener('keydown', this);
    this.wrap.addEventListener('mousedown', this);
    this.wrap.querySelectorAll('[data-modal], [data-modal-ctrl]').forEach((elem) => {
      elem.addEventListener('click', this);
    });
    this.btns.forEach((btn) => {
      btn.addEventListener('click', this);
    });

    if(ResizeObserver !== 'undefined') {
      this.ro = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.target.getAttribute('aria-hidden') === 'false') {
            const height = entry.borderBoxSize[0].blockSize;
            this.box.style.setProperty('min-height', `${height}px`);
          }
        });
      });
      this.box.querySelectorAll('.modal').forEach((item) => {
        this.ro.observe(item);
      });
    }
  },

  getModalOpener: function(elem) {
    if(elem.getAttribute('role') === 'menuitem') {
      return elem.closest('[role="menu"]').previousElementSibling;
    }
    return elem;
  },

  open: function(opener) {
    this.wrap.setAttribute('aria-hidden', 'false');

    this.setBoxHeight();

    this.activeModal.setAttribute('aria-hidden', 'false');

    this.opener = this.getModalOpener(opener);
    this.addInert(this.wrap);
    this.focusTrap(this.activeModal);
    // to do why activeModal.focus() not work
    this.wrap.focus();
    // this.activeModal.focus();
  },

  close: function() {
    this.wrap.setAttribute('aria-hidden', 'true');
    this.activeModal.setAttribute('aria-hidden', 'true');
    this.opener.focus();
    this.activeModal = this.startModal;
    this.siblings.forEach((value, key) => {
      value === null ? key.removeAttribute('aria-hidden') : key.setAttribute('aria-hidden', value);
    });
    this.siblings.clear();
    this.setBoxHeight();
  },

  showModal: function(type) {
    this.activeModal.setAttribute('aria-hidden', 'true');
    this.activeModal = this.wrap.querySelector(`#modal-${type}`);

    this.setBoxHeight();

    this.activeModal.setAttribute('aria-hidden', 'false');

    this.focusTrap(this.activeModal);
    this.activeModal.focus();
    this.wrap.scrollTo(0, 0);
  },

  setBoxHeight: function() {
    const height = this.activeModal.offsetHeight;
    this.box.style.setProperty('min-height', `${height}px`);
  },

  back: function() {
    const type = this.startModal.getAttribute('id').slice(6);
    this.showModal(type);
  },

  focusTrap: function(node) {
    const focusableSelector = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])',
      'textarea:not([disabled])', 'button:not([disabled])', 'details', 'summary', 'iframe', 'object',
      'embed', '[contenteditable]', '[tabindex="0"]'].join(',');

    const focusable = node.querySelectorAll(focusableSelector);
    this.first = focusable[0];
    this.last = focusable[focusable.length - 1];
  },

  keydownModal: function(e) {
    switch(e.key) {
      case 'Tab':
        if(e.target === this.last && !e.shiftKey) {
          e.preventDefault();
          return this.first.focus();
        }
        if(((e.target === this.first) || (e.target === this.wrap)
          || (e.target === this.activeModal)) && (e.shiftKey)) {
          e.preventDefault();
          return this.last.focus();
        }
        break;
      case 'Escape':
        return this.close();
      default:
        break;
    }
    return undefined;
  },

  addInert: function(node) {
    if(node !== document.body) {
      const siblings = [...node.parentElement.children];
      siblings.forEach((elem) => {
        if(elem !== node && elem.nodeName !== 'SCRIPT' && elem.nodeName !== 'STYLE') {
          this.siblings.set(elem, elem.getAttribute('aria-hidden'));
          elem.setAttribute('aria-hidden', 'true');
        }
      });
      this.addInert(node.parentElement);
    }
  },

  destroy: function() {
    this.wrap.removeEventListener('keydown', this);
    this.wrap.removeEventListener('mousedown', this);
    this.wrap.querySelectorAll('[data-modal], [data-modal-ctrl]').forEach((elem) => {
      elem.removeEventListener('click', this);
    });

    this.btns.forEach((btn) => {
      btn.removeEventListener('click', this);
    });

    if(ResizeObserver !== 'undfined') {
      this.ro.disconnect();
    }
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'click':
        if(this.btns.includes(e.currentTarget)) return this.open(e.currentTarget);
        if(e.currentTarget.hasAttribute('data-modal')) {
          const type = e.currentTarget.getAttribute('data-modal');
          return this.showModal(type);
        }
        if(e.currentTarget.getAttribute('data-modal-ctrl') === 'close') return this.close();
        if(e.currentTarget.getAttribute('data-modal-ctrl') === 'back') return this.back();
        break;
      case 'mousedown':
        if(e.target === this.wrap) return this.close();
        break;
      case 'keydown':
        return this.keydownModal(e);
      default:
        break;
    }
    return undefined;
  },
};

export { modal, modalMethod };
