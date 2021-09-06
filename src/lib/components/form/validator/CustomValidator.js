const validator = function(invalidMessages, validatedInputs) {
  this.invalidities = {};
  this.errorItem = {};
  this.invalidMessages = invalidMessages;

  validatedInputs.forEach((item) => {
    this.invalidities[item] = new Map();
    this.errorItem[item] = new Map();
  });
};

const validatorMethod = {
  checkValidity: function(input) {
    input.setCustomValidity('');

    if(!input.validity.valid) {
      this.getInvalidMessages(input);
      return false;
    }

    if(input.hasAttribute('data-confirm')) {
      const id = input.getAttribute('data-confirm');
      const confirmed = document.getElementById(id);
      if(input.value !== '' && confirmed.value !== input.value) {
        this.getInvalidMessages(input);
        return false;
      }
    }
    return true;
  },

  getInvalidMessages: function(input) {
    const byDefault = input.validationMessage;
    const type = input.getAttribute('name');
    const validity = input.validity;

    if(input.hasAttribute('data-confirm')) {
      const message = this.invalidMessages[type].valueMismatch || 'value does not match';
      this.addInvalidities(type, message);
    }

    if(validity.valueMissing) {
      const message = this.invalidMessages[type].valueMissing || byDefault;
      this.addInvalidities(type, message);
    }

    if(validity.badInput) {
      const message = this.invalidMessages[type].badInput || byDefault;
      this.addInvalidities(type, message);
    }

    if(validity.customError) {
      const message = this.invalidMessages[type].customError || byDefault;
      this.addInvalidities(type, message);
    }

    if(validity.patternMismatch) {
      const message = this.invalidMessages[type].patternMismatch || byDefault;
      this.addInvalidities(type, message);
    }

    if(validity.rangeOverFlow) {
      const message = this.invalidMessages[type].rangeOverFlow || byDefault;
      this.addInvalidities(type, message);
    }

    if(validity.rangeUnderFlow) {
      const message = this.invalidMessages[type].rangeUnderFlow || byDefault;
      this.addInvalidities(type, message);
    }

    if(validity.stepMismatch) {
      const message = this.invalidMessages[type].stepMismatch || byDefault;
      this.addInvalidities(type, message);
    }

    if(validity.tooLong) {
      const message = this.invalidMessages[type].tooLong || byDefault;
      this.addInvalidities(type, message);
    }

    if(validity.tooShort) {
      const message = this.invalidMessages[type].tooShort || byDefault;
      this.addInvalidities(type, message);
    }

    if(validity.typeMismatch) {
      const message = this.invalidMessages[type].typeMismatch || byDefault;
      this.addInvalidities(type, message);
    }
  },

  addInvalidities: function(type, message) {
    this.invalidities[type].set(message, true);
  },

  showCustomTooltip: function(input) {
    const type = input.getAttribute('name');
    const errorList = input.closest('form').querySelector(`[data-error='${type}']`);

    if(this.invalidities[type].size > 0) {
      this.invalidities[type].forEach((value, key) => {
        value ? this.showCustomErrorMessage(key, value, errorList, type)
          : this.hideCustomErrorMessage(key, errorList, type);
      });
    }
  },

  showCustomErrorMessage: function(key, value, errorList, type) {
    if(!this.errorItem[type].get(key)) this.addMessageElement(key, errorList, type);
    this.invalidities[type].set(key, !value);
  },

  hideCustomErrorMessage: function(key, errorList, type) {
    if(this.errorItem[type].get(key)) this.removeMessageElement(key, errorList, type);
    this.invalidities[type].delete(key);
  },

  clearCustomTooltip: function(input) {
    const type = input.getAttribute('name');
    const errorList = input.closest('form').querySelector(`[data-error='${type}']`);

    this.errorItem[type].forEach((value) => {
      value.style.setProperty('opacity', '0');
      setTimeout(() => {
        value.remove();
      }, 150);
    });
    errorList.style.setProperty('height', '0px');

    this.invalidities[type].clear();
    this.errorItem[type].clear();
  },

  showNativeTooltip: function(input) {
    const type = input.getAttribute('name');
    // const message = this.invalidities[inputName].join('. \n');
    const message = this.invalidities[type][0] || '';
    input.setCustomValidity(message);
  },

  addMessageElement: function(message, errorList, type) {
    const elem = document.createElement('span');
    elem.innerText = message;
    errorList.appendChild(elem);

    const boxHeight = parseInt((errorList.style.height || '0px').slice(0, -2), 10);
    const msgHeight = elem.offsetHeight;
    errorList.style.setProperty('height', `${boxHeight + msgHeight}px`);
    elem.style.setProperty('opacity', '1');

    this.errorItem[type].set(message, elem);
  },

  removeMessageElement: function(key, errorList, type) {
    const elem = this.errorItem[type].get(key);
    this.errorItem[type].delete(key);

    const boxHeight = parseInt((errorList.style.height || '0px').slice(0, -2), 10);
    const msgHeight = elem.offsetHeight;
    elem.style.setProperty('opacity', '0');
    errorList.style.setProperty('height', `${boxHeight - msgHeight}px`);
    setTimeout(() => {
      elem.remove();
    }, 150);
  },
};

export { validator, validatorMethod };
