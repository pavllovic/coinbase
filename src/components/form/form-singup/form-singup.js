import { Form, FormMethod } from 'Components/form/form.js';
import FormPopupMethod from 'Components/form/form-Popup/formPopup.js';

const FormSingup = function(...rest) {
  Form.call(this, ...rest);
  // state formPopup
  this.popupOpen = false;
};

FormSingup.prototype = {
  constructor: FormSingup,
  getFormData: FormMethod.getFormData,
  sendForm: FormMethod.sendForm,
  init: FormMethod.init,
  checkInputValidity: FormMethod.checkInputValidity,
  checkConfirmInput: FormMethod.checkConfirmInput,
  showSubmitting: FormMethod.showSubmitting,
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
  submitForm: function(e) {
    e.preventDefault();
    if(this.checkConfirmInput('singup-password')) {
      FormMethod.submitForm.call(this, e);
    }
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

export default FormSingup;
