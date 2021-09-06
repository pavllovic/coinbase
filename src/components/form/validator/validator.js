import { validator, validatorMethod } from 'Lib/components/form/validator/CustomValidator';

const Validator = validator;

Validator.prototype = {
  checkValidity: validatorMethod.checkValidity,
  getInvalidMessages: validatorMethod.getInvalidMessages,
  addInvalidities: validatorMethod.addInvalidities,
  showCustomTooltip: validatorMethod.showCustomTooltip,
  clearCustomTooltip: validatorMethod.clearCustomTooltip,
  showNativeTooltip: validatorMethod.showNativeTooltip,
  addMessageElement: validatorMethod.addMessageElement,
  removeMessageElement: validatorMethod.removeMessageElement,
  showCustomErrorMessage: validatorMethod.showCustomErrorMessage,
  hideCustomErrorMessage: validatorMethod.hideCustomErrorMessage,
};

export default Validator;
