var button = null;
var inputs = {};
var errors = {
  email: '',
  password: '',
};
var data = {
  email: '',
  password: '',
};

function handleSubmit(evt) {
  evt.preventDefault();
  alert('Data has been sent \n' + 'Email: ' + data.email + '\n' + 'Password: ' + data.password + '\n');
}

function handleFocus(evt) {
  clearError(evt);
}

function clearError(evt) {
  data[evt.target.name] = evt.target.value;
  if (errors[evt.target.name]) {
    evt.target.classList.remove('error');
    evt.target.nextElementSibling.innerHTML = '';
    delete errors[evt.target.name];
  }
}

function displayError(evt, errorMsg) {
  evt.target.classList.add('error');
  errors[evt.target.name] = errorMsg;
  evt.target.nextElementSibling.innerHTML = errors[evt.target.name];
}

function handleBlur(evt) {
  var target = evt.target;
  if (target.name === 'email') {
    var emailIsValid = validateEmail(target.value);
    if (emailIsValid) {
      clearError(evt);
    } else {
      displayError(evt, 'Invalid Email');
    }
  } else {
    var passwordIsValid = validatePassword(target.value);
    if (passwordIsValid) {
      clearError(evt);
    } else {
      displayError(evt, 'Invalid Password');
    }
  }
  handleSubmitButtonState();
}

function handleSubmitButtonState() {
  button.disabled = !!errors.email || !!errors.password || !!!data.email || !!!data.password;
}

function validatePassword(value) {
  return !!value;
}

function validateEmail(value) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

function getFormElements() {
  inputs = document.getElementsByClassName('input');
  button = document.getElementById('login-button');
}

function attachHandlers() {
  inputs.email.onblur = handleBlur;
  inputs.password.onblur = handleBlur;
  inputs.email.onfocus = handleFocus;
  inputs.password.onfocus = handleFocus;
  button.onclick = handleSubmit;
}

window.onload = function () {
  getFormElements();
  attachHandlers();
}