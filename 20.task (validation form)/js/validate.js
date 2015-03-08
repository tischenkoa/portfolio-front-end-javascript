// 'use strict'
window.usedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];
(function() {
	document.querySelector('form[role="form"]').addEventListener('keyup', checkForm, false);
	document.querySelector('input[type="checkbox"]').addEventListener('click', checkForm, false);
})();

function addErrorForm(nodeErrorValid, userMessage) {
	var idTimeout = setTimeout(addNodeErrorInForm, 1000, nodeErrorValid, userMessage);
	document.querySelector('form[role="form"]').addEventListener('keyup', function() {
		clearTimeout(idTimeout);
	}, false);
}

function addNodeErrorInForm(nodeErrorValid, userMessage) {
	if (!nodeErrorValid.querySelector('.alert-danger')) {
		// debugger
		var nodeError = document.createElement('div');
		nodeErrorValid.classList.add('has-error');
		nodeError.className = "alert alert-danger";
		nodeErrorValid.appendChild(nodeError);
	}
	nodeErrorValid.querySelector('.alert-danger').textContent = userMessage;
	if (!document.querySelector('.disabled')) {
		document.querySelector('.btn-primary').classList.add('disabled');
	}
}

function removeNodeErrorInForm(nodeValid) {
	if (nodeValid.querySelector('.alert-danger')) {
		nodeValid.classList.remove('has-error');
		nodeValid.removeChild(nodeValid.querySelector('.alert-danger'));
	}

}

function checkForm() {
	var email = document.querySelector('#email');
	var password = document.querySelector('#password');
	var city = document.querySelector('#city');
	var phone = document.querySelector('#phone');
	var checkBox = document.querySelector('input[type="checkbox"]');


	if (email.value.length > 0) {
		if (!/.+@.+\..+/i.test(email.value)) {
			addErrorForm(email.parentNode, "Ошибка e-mail, попробуйте снова.");
		} else {
			removeNodeErrorInForm(email.parentNode);
		}

// проверка email c перененой window.usedEmails
		if (usedEmails.indexOf(email.value) > -1) {
			addErrorForm(email.parentNode, "E-mail занят, используйте другой.");
		}
// проверка email c сервера https://aqueous-reaches-8130.herokuapp.com 
		checkEmailOnServer(email.value, email.parentNode);

	} else {
		addErrorForm(email.parentNode, "Поле, обязательное к заполнению не заполнено.");
	}

	if (password.value.length < 5) {
		addErrorForm(password.parentNode, "Пароль слишком короткий, должен быть от 5 символов.");
	} else {
		if (/^[a-z]*$|^\d*$/i.test(password.value)) {
			addErrorForm(password.parentNode, "Пароль слишком прост, имет только буквы или цифры.");
		} else {
			if (!/^[a-z0-9_-]*$/ig.test(password.value)) {
				addErrorForm(password.parentNode, "Пароль содержит запрещенные символы (разрешенные - латинские буквы, цифры, подчеркивание, минус)");
			} else {
				removeNodeErrorInForm(password.parentNode);
			}

		}
	}


	if (!/^[a-z\s-]*$/ig.test(city.value)) {
		addErrorForm(city.parentNode, "Город содержит запрещенные символы (разрешенные - латинские буквы, пробел, минус)");
	} else {
		removeNodeErrorInForm(city.parentNode);
	}

	if ((phone.value.length > 0) && ((phone.value.length !== 13) || (!/^\+3[0-9]{2,13}$/.test(phone.value)))) {

		addErrorForm(phone.parentNode, "Город содержит запрещенные символы (разрешенные - латинские буквы, пробел, минус)");
	} else {
		removeNodeErrorInForm(phone.parentNode);
	}

	if (checkBox.checked && email.value.length > 0 && password.value.length > 0) {
		document.querySelector('.btn-primary').classList.remove('disabled');
	} else {
		// debugger
		if (!document.querySelector('.disabled')) {
			document.querySelector('.btn-primary').classList.add('disabled');
		}
	}
}


function checkEmailOnServer(email, emailParentNode) {
	var STATE_RADY = 4;
	var request = new XMLHttpRequest();
	var res;
	request.open('get', 'https://aqueous-reaches-8130.herokuapp.com/check-email/?email=' + email, 'true');
	request.onreadystatechange = function() {
		if (request.readyState === STATE_RADY) {
			res = JSON.parse(request.responseText);
			if (res.used) {
				return addErrorForm(emailParentNode, "E-mail занят, используйте другой.");
			}
		}
	};
	request.send();
}