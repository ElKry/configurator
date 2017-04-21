'use strict';

(function () {
	var form = document.querySelector('form');

	form.addEventListener('submit', function (evt) {
		evt.preventDefault();

		var answerWindow = document.querySelector('#form-answer');
		var answerText = answerWindow.querySelector('.answer');

		//submitBtn = form.querySelector('button[type="submit"]');
		//submitBtn.setAttribute('disabled', 'disabled');

		var str = $(form).serialize();

		$.ajax({
			url: '/configurator/send-msg.php',
			type: 'POST',
			data: str
		})
		.done(function (msg) {
			if (msg === 'OK') {
				var result = 'Спасибо за заявку!';
				//console.log(result);
				
				answerText.innerText = result;
				//form.querySelector('#success').innerHTML = result;
			} else {
				answerWindow.innerText = msg;
				//console.log(msg);
					//form.querySelector('#success').innerHTML = msg;
			}
		})
		.always(function () {
			form.parentNode.classList.add('hidden');
			answerWindow.classList.remove('hidden');
			//submitBtn.removeAttribute('disabled');
		});
	})
})();