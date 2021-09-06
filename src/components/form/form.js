import getFormData from 'Lib/components/form/getFormData/getFormData.js';
import sendFormJSON from 'Lib/components/form/sendForm/sendFormJSON.js';
import { form, formMethod } from 'Lib/components/form/form.js';

const Form = form;

const FormMethod = {
  getFormData: getFormData,
  sendForm: sendFormJSON,
  init: formMethod.init,
  setListeners: formMethod.setListeners,
  destroyForm: formMethod.destroyForm,
  showSubmitting: formMethod.showSubmitting,
  submitForm: formMethod.submitForm,
  checkConfirmInput: formMethod.checkConfirmInput,
  checkInputValidity: formMethod.checkInputValidity,
  resendForm: formMethod.resendForm,
  // reset form and hide validation message
  resetForm: formMethod.resetForm,
  // handler for success submit form
  onSuccessHandler: formMethod.onSuccessHandler,
  // handler for error submit form
  onErrorHandler: formMethod.onErrorHandler,
  debounceInput: formMethod.debounceInput,
  handleEvent: formMethod.handleEvent,
};

export { Form, FormMethod };
