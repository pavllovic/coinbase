import { Form, FormMethod } from 'Components/form/form.js';
import FormPopupMethod from 'Components/form/form-Popup/formPopup.js';

const FormCoin = function(...rest) {
  Form.call(this, ...rest);
  // state formPopup
  this.popupOpen = false;
};

FormCoin.prototype = {
  constructor: FormCoin,
  getFormData: FormMethod.getFormData,
  sendForm: FormMethod.sendForm,
  checkInputValidity: FormMethod.checkInputValidity,
  showSubmitting: FormMethod.showSubmitting,
  submitForm: FormMethod.submitForm,
  setFormPopupMessage: FormPopupMethod.setFormPopupMessage,
  toogleFormPopup: FormPopupMethod.toogleFormPopup,
  focusTrapPopup: FormPopupMethod.focusTrapPopup,
  keydownPopup: FormPopupMethod.keydownPopup,
  statePopupControls: FormPopupMethod.statePopupControls,
  debounceInput: FormMethod.debounceInput,
  // init: FormMethod.init,
  init: function() {
    this.controller = new AbortController();
    FormMethod.init.call(this);
  },
  setListeners: function() {
    FormMethod.setListeners.call(this);
    FormPopupMethod.setFormPopupListeners.call(this);
    // delete
    this.controller.signal.addEventListener('abort', () => { console.log('*** abort submit form ***'); }); //eslint-disable-line
  },
  destroyForm: function() {
    FormMethod.destroyForm.call(this);
    FormPopupMethod.destroyFormPopup.call(this);
  },
  onSuccessHandler: function(res) {
    FormMethod.onSuccessHandler.call(this, res);
    this.popup = this.form.querySelector('[data-form-popup="success"]');
    this.toogleFormPopup('form successfully send');
    this.focusTrapPopup(this.popup);
  },
  onErrorHandler: function(err) {
    FormMethod.onErrorHandler.call(this, err);
    this.popup = this.form.querySelector('[data-form-popup="error"]');
    this.toogleFormPopup(err);
    this.focusTrapPopup(this.popup);
  },
  resendForm: function() {
    if(this.popupOpen) this.toogleFormPopup();
    FormMethod.resendForm.call(this);
  },
  resetForm: function() {
    if(this.popupOpen) this.toogleFormPopup();
    FormMethod.resetForm.call(this);
  },
  abortSubmit: function() {
    if(this.sending) {
      //* abort fake request to server
      clearTimeout(this.timeout);

      // abort real request to server
      this.controller.abort();

      this.sending = false;
      this.showSubmitting();
    }
  },
  handleEvent: function(e) {
    FormMethod.handleEvent.call(this, e);
    FormPopupMethod.handleEvent.call(this, e);
  },
};

export default FormCoin;
