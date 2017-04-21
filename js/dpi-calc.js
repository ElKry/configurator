'use strict';

(function () {
	var updateDpiConfigInfo = function () {
		//console.log(1);

		var pushInfo = function (info, list) {
			for (var i = 0; i < info.length; i++) {
				var li = document.createElement('li');
				li.innerHTML = info[i];
				list.appendChild(li);
			}
		};

		var configInfo = document.querySelector('ul.config-info');
		var configInfoItems = configInfo.querySelectorAll('li');
		for(var i = 0; i < configInfoItems.length; i++) {
			configInfo.removeChild(configInfoItems[i]);
		}

		var infoList = [];

		var dpiShema = "<p><strong>Схема:</strong> " + document.querySelector('.param-btn-box.dpi-shema > .select span.text').innerHTML + "</p>";
		infoList.push(dpiShema);

		var dpiTask = "<p><strong>Задача:</strong> " + document.querySelector('.dpi-task-list input:checked').parentNode.innerText + "</p>";
		infoList.push(dpiTask);

		infoList.push('<p><strong>Функции:</strong></p>')

		var dpiFuncs = document.querySelectorAll('.dpi-func-list input:checked');
		for (var i = 0; i < dpiFuncs.length; i++) {
			infoList.push('<p>' + dpiFuncs[i].parentNode.innerText+ '</p>');
		}

		var dpiVolume = "<p><strong>Пропускная способность:</strong> " + document.querySelector('.dpi-volume-list input:checked').parentNode.innerText + "</p>";
		infoList.push(dpiVolume);

		pushInfo(infoList, configInfo);

		var configTextarea = document.querySelector('.form-group.hidden textarea');
		configTextarea.innerText = infoList.join('');
	};	

	var openFormButton = document.querySelector('.send-form');
	openFormButton.addEventListener('click', function () {
		updateDpiConfigInfo();
	});

	var paramBtns = document.querySelectorAll('.param-btn-box > .btn');
	for (var i = 0; i < paramBtns.length; i++) {
		paramBtns[i].addEventListener('click', function (evt) {
			evt.preventDefault();
			window.utils.chooseParam(this, function (paramBtn) {
				var hideShowFunc = function (act) {
					var funcListItems = document.querySelectorAll('.dpi-func-list input');
					for (var j = 0; j < funcListItems.length; j++) {
						var itemId = funcListItems[j].getAttribute('id');
						if (itemId === 'func-5' ||
								itemId === 'func-8' ||
								itemId === 'func-11') {
							if (act === 'add') {
								funcListItems[j].parentNode.parentNode.classList.add('hidden');
							} else {
								funcListItems[j].parentNode.parentNode.classList.remove('hidden');
							}
						}
					}
				};
				
				if (paramBtn.getAttribute('data-dpi-shema') !== '1') {
					hideShowFunc('add');
				} else {
					hideShowFunc('remove');
				}
			});
		})
	}

	var openBtns = document.querySelectorAll('.open-popup-btn');
	window.utils.openPopup(openBtns);

	var closeBtns = document.querySelectorAll('.close-btn');
	window.utils.closePopup(closeBtns);

	window.utils.documentClickHandler();

})();