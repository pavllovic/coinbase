import { modal, modalMethod } from 'Lib/components/modal/modal.js';

const ModalAuth = function(wrap, startModal, btns, login, singup) {
  modal.call(this, wrap, startModal, btns);
  this.login = login;
  this.singup = singup;
};

ModalAuth.prototype = {
  constructor: ModalAuth,
  getModalOpener: modalMethod.getModalOpener,
  open: modalMethod.open,
  showModal: modalMethod.showModal,
  back: modalMethod.back,
  setBoxHeight: modalMethod.setBoxHeight,
  focusTrap: modalMethod.focusTrap,
  keydownModal: modalMethod.keydownModal,
  addInert: modalMethod.addInert,
  destroy: modalMethod.destroy,
  handleEvent: modalMethod.handleEvent,

  init: function() {
    modalMethod.init.call(this);
    this.login.init();
    this.singup.init();
  },

  close: function() {
    this.login.resetForm();
    this.singup.resetForm();
    modalMethod.close.call(this);
  },
};

export default ModalAuth;
