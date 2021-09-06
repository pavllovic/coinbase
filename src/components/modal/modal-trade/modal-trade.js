import { modal, modalMethod } from 'Lib/components/modal/modal';

const ModalTrade = function(wrap, startModal, btns, Form) {
  modal.call(this, wrap, startModal, btns);
  this.Form = Form;
};

ModalTrade.prototype = {
  constructor: ModalTrade,
  init: modalMethod.init,
  getModalOpener: modalMethod.getModalOpener,
  open: modalMethod.open,
  setBoxHeight: modalMethod.setBoxHeight,
  focusTrap: modalMethod.focusTrap,
  keydownModal: modalMethod.keydownModal,
  addInert: modalMethod.addInert,
  destroy: modalMethod.destroy,
  handleEvent: modalMethod.handleEvent,
  back: function() {
    if(this.form) {
      this.form.abortSubmit();
      this.form.resetForm();
    }
    modalMethod.back.call(this);
  },
  showModal: function(type) {
    modalMethod.showModal.call(this, type);
    const form = this.activeModal.querySelector('form');
    if(form) {
      if(this.form) this.form.destroyForm();
      this.form = new this.Form(form);
      this.form.init();
    }
  },
  close: function() {
    if(this.form) {
      this.form.abortSubmit();
      this.form.resetForm();
    }
    modalMethod.close.call(this);
  },
};

export default ModalTrade;
