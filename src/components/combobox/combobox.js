import { combobox, comboboxMethod } from 'Lib/components/combobox/combobox.js';

const Combobox = combobox;

Combobox.prototype = {
  constructor: combobox,
  init: comboboxMethod.init,
  toogleOptions: comboboxMethod.toogleOptions,
  openOptions: comboboxMethod.openOptions,
  closeOptions: comboboxMethod.closeOptions,
  resetCombobox: comboboxMethod.resetCombobox,
  onOptionChecked: comboboxMethod.onOptionChecked,
  onKeydown: comboboxMethod.onKeydown,
  onComboboxBlur: comboboxMethod.onComboboxBlur,
  onListboxMouseDown: comboboxMethod.onListboxMouseDown,
  onOptionFocused: comboboxMethod.onOptionFocused,
  destroy: comboboxMethod.destroy,
  handleEvent: comboboxMethod.handleEvent,
};

export default Combobox;
