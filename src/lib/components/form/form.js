import debounce from 'Lib/debounce/debounce.js';

const form = function(Validator, validatedInputs, formElem) {
  this.form = formElem;
  this.validator = new Validator(validatedInputs);

  this.inputs = new Map();
  validatedInputs.forEach((name) => {
    this.inputs.set(name, this.form.querySelector(`[name="${name}"]`));
  });
  this.sending = false;
};

const formMethod = {

  init: function() {
    this.setListeners();
  },

  setListeners: function() {
    this.form.addEventListener('submit', this);
    this.inputs.forEach((value) => {
      value.addEventListener('invalid', this);
      value.addEventListener('input', this);
    });
  },

  destroyForm: function() {
    this.form.removeEventListener('submit', this);

    this.inputs.forEach((value) => {
      value.removeEventListener('invalid', this);
      value.removeEventListener('input', this);
    });
  },

  showSubmitting: function() {
    const btn = this.form.querySelector('[type="submit"]');
    if(this.sending) {
      btn.classList.add('submitting');
      btn.setAttribute('disabled', 'true');
    } else {
      btn.classList.remove('submitting');
      btn.removeAttribute('disabled');
    }
  },

  submitForm: function(e) {
    e.preventDefault();
    this.sending = true;
    this.showSubmitting();

    const data = this.getFormData(e.target);

    // real request to server
    // this.sendForm(e.target, data)
    //   .then((res) => this.onSuccessHandler(res))
    //   .catch((err) => this.onErrorHandler(err))
    //   .finally(() => {
    //     this.sending = false;
    //     this.showSubmitting();
    //   });

    // fake request to server
    this.timeout = setTimeout(() => {
      this.sendForm(e.target, data)
        .then((res) => this.onSuccessHandler(res))
        .catch((err) => this.onErrorHandler(err))
        .finally(() => {
          this.sending = false;
          this.showSubmitting();
        });
    }, 2000);
  },

  checkConfirmInput: function(name) {
    const input = this.form.querySelector(`[data-confirm="${name}"]`);
    return this.validator.checkValidity(input);
  },

  checkInputValidity: function(input) {
    const valid = this.validator.checkValidity(input);
    this.validator.showCustomTooltip(input);
    valid ? input.classList.remove('input_error') : input.classList.add('input_error');
  },

  resendForm: function() {
    this.form.querySelector('[type="submit"]').click();
  },

  // reset form and hide validation message
  resetForm: function() {
    this.inputs.forEach((value, key) => {
      if(this.validator.invalidities[key].size > 0) {
        this.validator.clearCustomTooltip(value);
        value.classList.remove('input_error');
      }
    });
    this.form.reset();
  },

  // handler for success submit form
  onSuccessHandler: function(res) {
    this.resetForm();
    console.log(res); //eslint-disable-line
  },

  // handler for error submit form
  onErrorHandler: function(err) {
    console.log(err); //eslint-disable-line
  },

  debounceInput: debounce,

  handleEvent: function(e) {
    switch(e.type) {
      case 'submit':
        return this.submitForm(e);
      case 'invalid':
        e.preventDefault();
        return this.checkInputValidity(e.target);
      case 'input':
        return this.debounceInput(() => {
          this.checkInputValidity(e.target);
        }, 150);
      default:
        break;
    }
    return undefined;
  },
};

export { form, formMethod };
