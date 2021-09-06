import FormComment from 'Components/form/form-comment/form-comment.js';
import validator from 'Components/form/validator/index.js';

const form = document.getElementById('form-comment');
const commentForm = new FormComment(validator, ['name', 'email'], form);

export default commentForm;
