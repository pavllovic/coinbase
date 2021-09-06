import FormSubscribe from 'Components/form/form-subscribe/form-subscribe.js';
import validator from 'Components/form/validator/index.js';

const form = document.getElementById('form-subscribe');
const subscribeForm = new FormSubscribe(validator, ['email'], form);

export default subscribeForm;
