import { KeysActions, getActionFromKey, getUpdatedIndex } from 'Lib/keyActions/KeysActions';

// check if an element is currently scrollable
function isScrollable(element) {
  return element && element.clientHeight < element.scrollHeight;
}

function scrollToActiveOption(activeOption, scrollParent) {
  const { offsetTop } = activeOption;
  scrollParent.scrollTo(0, offsetTop);
}

const combobox = function(elem) {
  this.elem = elem;
  this.combobox = this.elem.querySelector('[role="combobox"]');
  this.options = this.elem.querySelector('[role="listbox"]');
  this.arrayOptions = Array.from(this.options.children);
  this.input = this.elem.querySelector('input');
  // state combobox
  this.open = false;
  this.optionSelectedIndex = 0;
  this.optionFocusedIndex = 0;
};

const comboboxMethod = {
  init: function() {
    this.combobox.addEventListener('blur', this);
    this.combobox.addEventListener('click', this);
    this.combobox.addEventListener('keydown', this);
    this.options.addEventListener('mousedown', this);
    this.arrayOptions.forEach((option) => {
      option.addEventListener('click', this);
    });
  },

  toogleOptions: function(e) {
    e.stopPropagation();
    if(this.arrayOptions.length < 1) return;
    this.open = !this.open;
    this.combobox.setAttribute('aria-expanded', `${this.open}`);
    this.open ? this.openOptions() : this.closeOptions();
  },

  openOptions: function() {
    this.elem.classList.add('is-active');
    const activeId = this.arrayOptions[this.optionSelectedIndex].getAttribute('id');
    this.combobox.setAttribute('aria-activedescendant', `${activeId}`);
    this.onOptionFocused(this.optionSelectedIndex);
  },

  closeOptions: function() {
    this.elem.classList.remove('is-active');
    this.combobox.setAttribute('aria-activedescendant', '');
  },

  resetCombobox: function() {
    this.combobox.setAttribute('aria-activedescendant', '');
    this.combobox.textContent = '';
    this.input.value = '';
    this.arrayOptions[this.optionSelectedIndex].setAttribute('aria-selected', 'false');
    this.arrayOptions[this.optionFocusedIndex].classList.remove('is-focus');
    this.optionSelectedIndex = 0;
    this.optionFocusedIndex = 0;
  },

  onOptionChecked: function(e) {
    const role = e.target.getAttribute('role');
    const prevOption = this.arrayOptions[this.optionSelectedIndex];
    const option = (role === 'option') ? e.target : this.arrayOptions[this.optionFocusedIndex];

    if(prevOption) prevOption.setAttribute('aria-selected', 'false');
    if(option) {
      option.setAttribute('aria-selected', 'true');
      this.combobox.textContent = option.textContent;
      this.input.value = option.textContent;

      if(typeof window.CustomEvent === 'function') {
        // modern
        this.input.dispatchEvent(new Event('input'));
      } else {
        // for ie
        const event = document.createEvent('Event');
        event.initEvent('input', true, false);
        this.input.dispatchEvent(event);
      }
    }

    const index = this.arrayOptions.findIndex((item) => item === option);

    this.optionSelectedIndex = index;
  },

  onKeydown: function(e) {
    const max = this.arrayOptions.length - 1;
    const action = getActionFromKey(e, this.open);

    switch(action) {
      case KeysActions.Next:
      case KeysActions.Last:
      case KeysActions.First:
      case KeysActions.Previous:
        e.preventDefault();
        return this.onOptionFocused(getUpdatedIndex(this.optionFocusedIndex, max, action));
      case KeysActions.Space:
        e.preventDefault();
        return this.toogleOptions(e);
      case KeysActions.CloseSelect:
        e.preventDefault();
        this.onOptionChecked(e);
        return this.toogleOptions(e);
      case KeysActions.Close:
        e.preventDefault();
        return this.toogleOptions(e);
      case KeysActions.Open:
        e.preventDefault();
        return this.toogleOptions(e);
      case KeysActions.Blur:
        return this.closeOptions();
      default:
        break;
    }

    return undefined;
  },

  onComboboxBlur: function(e) {
    if(this.ignoreBlur) {
      this.ignoreBlur = false;
      return;
    }
    if(this.open) this.toogleOptions(e);
  },

  onListboxMouseDown: function() {
    this.ignoreBlur = true;
  },

  onOptionFocused: function(index) {
    const prevOption = this.arrayOptions[this.optionFocusedIndex];
    const option = this.arrayOptions[index];

    this.combobox.setAttribute('aria-activedescendant', `${option.id}`);
    if(this.open && isScrollable(this.options)) {
      scrollToActiveOption(this.arrayOptions[index], this.options);
    }

    if(prevOption) prevOption.classList.remove('is-focus');
    if(option) option.classList.add('is-focus');

    this.optionFocusedIndex = index;
  },

  destroy: function() {
    this.combobox.removeEventListener('blur', this);
    this.combobox.removeEventListener('click', this);
    this.combobox.removeEventListener('keydown', this);
    this.options.removeEventListener('mousedown', this);
    this.arrayOptions.forEach((option) => {
      option.removeEventListener('click', this);
    });
    this.arrayOptions[this.optionFocusedIndex].classList.remove('is-focus');
  },

  handleEvent: function(e) {
    switch(e.type) {
      case 'click':
        const role = e.target.getAttribute('role');
        if(role === 'combobox') return this.toogleOptions(e);
        if(role === 'option') {
          e.stopPropagation();
          this.onOptionChecked(e);
          return this.toogleOptions(e);
        }
        break;
      case 'blur':
        return this.onComboboxBlur(e);
      case 'keydown':
        return this.onKeydown(e);
      case 'mousedown':
        return this.onListboxMouseDown();
      default:
        break;
    }
    return undefined;
  },
};

export { combobox, comboboxMethod };
