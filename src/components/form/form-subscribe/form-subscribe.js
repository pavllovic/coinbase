import { Form, FormMethod } from 'Components/form/form.js';

const FormSubscribe = function(...rest) {
  Form.call(this, ...rest);
};

FormSubscribe.prototype = {
  constructor: FormSubscribe,
  getFormData: FormMethod.getFormData,
  sendForm: FormMethod.sendForm,
  init: FormMethod.init,
  checkInputValidity: FormMethod.checkInputValidity,
  showSubmitting: FormMethod.showSubmitting,
  setListeners: FormMethod.setListeners,
  submitForm: FormMethod.submitForm,
  resetForm: FormMethod.resetForm,
  destroyForm: FormMethod.destroyForm,
  onSuccessHandler: FormMethod.onSuccessHandler,
  onErrorHandler: FormMethod.onErrorHandler,
  debounceInput: FormMethod.debounceInput,
  handleEvent: FormMethod.handleEvent,
};

export default FormSubscribe;
