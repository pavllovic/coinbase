import FormLogin from 'Components/form/form-login/form-login.js';
import validator from 'Components/form/validator/index.js';

const form = document.getElementById('form-login');
const loginForm = new FormLogin(validator, ['email', 'password'], form);

export default loginForm;
