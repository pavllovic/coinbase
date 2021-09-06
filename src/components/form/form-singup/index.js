import FormSingup from 'Components/form/form-singup/form-singup.js';
import validator from 'Components/form/validator/index.js';

const form = document.getElementById('form-singup');
const singupForm = new FormSingup(validator, ['name', 'email', 'password', 'confirm_password'], form);

export default singupForm;
