var button = null;
var inputs = {};
var errors = {};

function handleSubmit(evt) {
    evt.preventDefault();
    console.log('here');
}

function handleFocus(evt) {
    clearError(evt.target.name);
}

function clearError(name) {
    if (errors[name]) {
        delete errors[name];
    }
}

function handleBlur(evt) {
    var target = evt.target;
    if (target.name === 'email') {
        var emailIsValid = validateEmail(target.value);
        if (emailIsValid) {
            target.classList.remove('error');
            evt.target.nextElementSibling.innerHTML = '';
            delete errors.email;
        } else {
            evt.target.classList.add('error');
            errors.email = 'Invalid Email';
            evt.target.nextElementSibling.innerHTML = errors.email;
        }
    } else {
        var passwordIsValid = validatePassword(target.value);
        if (passwordIsValid) {
            target.classList.remove('error');
            delete errors.password;
            evt.target.nextElementSibling.innerHTML = '';
        } else {
            evt.target.classList.add('error');
            errors.password = 'Invalid Password';
            evt.target.nextElementSibling.innerHTML = errors.password;
        }
    }
    handleSubmitButtonState();
}

function handleSubmitButtonState() {
    console.log(errors);
    if (!Object.values(errors).length) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
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