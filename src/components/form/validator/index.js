import Validator from 'Components/form/validator/validator.js';
import invalidMessages from 'Lib/components/form/validator/invalidMessages.js';

const validator = Validator.bind(null, invalidMessages);

export default validator;
