import { Form, FormMethod } from 'Components/form/form.js';
import FormPopupMethod from 'Components/form/form-Popup/formPopup.js';

const FormLogin = function(...rest) {
  Form.call(this, ...rest);
  // state formPopup
  this.popupOpen = false;
};

FormLogin.prototype = {
  constructor: FormLogin,
  getFormData: FormMethod.getFormData,
  sendForm: FormMethod.sendForm,
  init: FormMethod.init,
  checkInputValidity: FormMethod.checkInputValidity,
  showSubmitting: FormMethod.showSubmitting,
  submitForm: FormMethod.submitForm,
  setFormPopupMessage: FormPopupMethod.setFormPopupMessage,
  toogleFormPopup: FormPopupMethod.toogleFormPopup,
  focusTrapPopup: FormPopupMethod.focusTrapPopup,
  keydownPopup: FormPopupMethod.keydownPopup,
  statePopupControls: FormPopupMethod.statePopupControls,
  debounceInput: FormMethod.debounceInput,
  setListeners: function() {
    FormMethod.setListeners.call(this);
    FormPopupMethod.setFormPopupListeners.call(this);
  },
  destroyForm: function() {
    FormMethod.destroyForm.call(this);
    FormPopupMethod.destroyFormPopup.call(this);
  },
  onSuccessHandler: function(res) {
    FormMethod.onSuccessHandler.call(this, res);
    // this.popup = this.form.querySelector('[data-form-popup="success"]');
    // this.toogleFormPopup('form successfully send');
  },
  onErrorHandler: function(err) {
    FormMethod.onErrorHandler.call(this, err);
    this.popup = this.form.querySelector('[data-form-popup="error"]');
    this.toogleFormPopup(err.message);
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
  handleEvent: function(e) {
    FormMethod.handleEvent.call(this, e);
    FormPopupMethod.handleEvent.call(this, e);
  },
};

export default FormLogin;
