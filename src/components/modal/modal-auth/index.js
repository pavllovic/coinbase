import ModalAuth from 'Components/modal/modal-auth/modal-auth.js';
import singupForm from 'Components/form/form-singup/index.js';
import loginForm from 'Components/form/form-login/index.js';

const wrap = document.getElementById('modal-auth');
const loginModal = wrap.querySelector('#modal-login');
const btns = Array.from(document.querySelectorAll('[data-modal="auth"]'));

const auth = new ModalAuth(wrap, loginModal, btns, loginForm, singupForm);

export default auth;
