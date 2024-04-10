import onChange from 'on-change';
import axios from 'axios';

export const validateName = (name) => (name.trim().length > 0 ? [] : ['name cannot be empty']);
export const validateEmail = (email) => ((/\w+@\w+/).test(email) ? [] : ['invalid email']);
const validateField = (field, data) => (field === 'name' ? validateName(data) : validateEmail(data));

export default () => {
  const formHTML = `
    <form id="registrationForm">
      <div class="form-group">
        <label for="inputName">Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="Введите ваше имя" name="name" required>
      </div>
      <div class="form-group">
        <label for="inputEmail">Email</label>
        <input type="text" class="form-control" id="inputEmail" placeholder="Введите email"
        name="email" required>
      </div>
      <input type="submit" value="Submit" class="btn btn-primary" disabled>
    </form>`;

  const formContainer = document.querySelector('.form-container');
  formContainer.innerHTML = formHTML;
  const form = document.querySelector('form');
  const submit = document.querySelector('[type="submit"]');

  const state = {
    errors: {
      name: [],
      email: [],
    },
    values: {
      name: '',
      email: '',
    },
  };

  const watchedState = onChange(state, (path) => {
    const inputName = path.split('.')[1];
    const targetField = document.querySelector(`input[name=${inputName}]`);
    const data = state.values[inputName];
    const hasErrors = () => (validateEmail(state.values.email).length > 0
    || validateName(state.values.name).length > 0);
    const isFieldValid = validateField(inputName, data).length === 0;
    if (!isFieldValid) {
      targetField.classList.remove('is-valid');
      targetField.classList.add('is-invalid');
    } else {
      targetField.classList.remove('is-invalid');
      targetField.classList.add('is-valid');
    }
    submit.disabled = hasErrors();
  });

  form.addEventListener('input', (e) => {
    e.preventDefault();
    const targetName = e.target.name;
    const targetData = new FormData(form).get(targetName);
    if (targetName === 'name') {
      watchedState.errors.name = validateName(targetData);
    } else if (targetName === 'email') {
      watchedState.errors.email = validateEmail(targetData);
    }
    watchedState.values[targetName] = targetData;
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    axios.post('/users', {
      name: state.values.name,
      email: state.values.email,
    })
    .then((res) => {
      document.body.innerHTML = `<p>${res.data.message}</p>`;
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  });
};
