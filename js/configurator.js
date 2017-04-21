'use strict';

(function () {
	var updateConfigInfo = function () {
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

		var bodyType = "<p><strong>Корпус:</strong> " + document.querySelector('.param-btn-box.body > .select').getAttribute('data-body-type') + "</p>";
		infoList.push(bodyType);

		var cpuCount = "<p><strong>CPU:</strong> " + document.querySelector('.param-btn-box.cpu > .select').getAttribute('data-cpu-count') + "</p>";
		infoList.push(cpuCount);

		var psuCount = "<p><strong>Блок питания " + document.querySelector('.param-btn-box.psu').getAttribute('data-name') + ":</strong> " + document.querySelector('.param-btn-box.psu > .select').getAttribute('data-psu-count') + " шт.</p>";
		infoList.push(psuCount);

		var coreHerz = "<p><strong>Процессор:</strong> " + document.querySelector('.cpu-list input:checked').parentNode.innerText + "</p>";
		infoList.push(coreHerz);

		var ramVolume = "<p><strong>Объем памяти:</strong> " + document.querySelector('.param-btn-box.ram-gb > .select').getAttribute('data-ram-volume') + "</p>";
		infoList.push(ramVolume);

		var numberOfRam = "<p><strong>Количество модулей памяти:</strong> " + document.querySelector('.range #custom-handle').innerText + "</p>";
		infoList.push(numberOfRam);

		var storageControl = "<p><strong>Storage-контроллер:</strong> " + document.querySelector('.hdd-list input:checked').parentNode.innerText + "</p>";
		infoList.push(storageControl);

		var hddSataTab = document.querySelector('.hdd-tabs > li.sata:not(.disable)');
		var hddSataValue = document.querySelector('input#sata-num[type="number"]').value;
		if (hddSataTab && hddSataValue !== '0') {
			var hddSata = "<p><strong>SATA диск:</strong> " + document.querySelector('.sata-list input:checked').parentNode.innerText + " - " + 
			hddSataValue + " шт.</p>";
		} else {
			hddSata = "<p><strong>SATA диск:</strong> Нет</p>";
		}
		infoList.push(hddSata);

		var hddSasTab = document.querySelector('.hdd-tabs > li.sas:not(.disable)');
		var hddSasValue = document.querySelector('input#sas-num[type="number"]').value;
		if (hddSasTab && hddSasValue !== '0') {
			var hddSas = "<p><strong>SAS диск:</strong> " + document.querySelector('.sas-list input:checked').parentNode.innerText + " - " + 
			hddSasValue + " шт.</p>";
		} else {
			hddSas = "<p><strong>SAS диск:</strong> Нет</p>";
		}
		infoList.push(hddSas);

		var hddSsdValue = document.querySelector('input#ssd-num[type="number"]').value;
		if (hddSsdValue !== '0') {
			var hddSsd = "<p><strong>SSD диск:</strong> " + document.querySelector('.ssd-list input:checked').parentNode.innerText + " - " + 
			hddSsdValue + " шт.</p>";
		} else {
			hddSsd = "<p><strong>SSD диск:</strong> Нет</p>";
		}
		infoList.push(hddSsd);

		var slot = "<p><strong>Слот LOM:</strong> " + document.querySelector('.slot-list-important input:checked').parentNode.innerText + "</p>";
		infoList.push(slot);

		var slotEx = document.querySelector('.slot-list-extension input:checked');
		if (slotEx) {
			slotEx = "<p><strong>Слот расширения:</strong> " + slotEx.parentNode.innerText + "</p>";
		} else {
			slotEx = "<p><strong>Слот расширения:</strong> Нет</p>"
		}
		infoList.push(slotEx);

		var addBody = document.querySelector('.add-body-list input:checked');
		if (addBody) {
			infoList.push("<p><strong>Дополнительный внутренний отсек 2xSSD SATA (доступ сзади):</strong> " + addBody.parentNode.innerText + "</p>");
			if (addBody.value !== 'no') {
				var addSsd = "<p>Дополнительный диск:</strong> " + document.querySelector('.add-ssd-list input:checked').parentNode.innerText + 
				" - " + document.querySelector('input#add-ssd-num[type="number"]').value + " шт.</p>";
				infoList.push(addSsd);
			}
		}

		/*var blockNum = "<p><strong>Блоков питания 750W AC, Redundant, 86 mm (Platinum):</strong>" +	
		document.querySelector('input#block-num[type="number"]').value + " шт.</p>"
		infoList.push(blockNum);*/

		pushInfo(infoList, configInfo);

		var configTextarea = document.querySelector('.form-group.hidden textarea');
		configTextarea.innerText = infoList.join('');
	};

	var validateAddSsd = function () {
		var addBody = document.querySelectorAll('.add-body-list input');
		if (addBody) {
			for (var i = 0; i < addBody.length; i++) {
				addBody[i].addEventListener('click', function () {
					var addSsd = document.querySelector('.add-body .add-ssd');
					if (this.value === 'yes') {
						addSsd.classList.remove('hidden');
					} else {
						addSsd.classList.add('hidden');
					}
				});
			}
		}
	};
	validateAddSsd();

	var validateInputNum = function (input, n) {
		var id = input.getAttribute('id');
		var otherInputs = document.querySelectorAll("#select-hdd input[type='number']:not(#" + id + ")");
		console.log(otherInputs);
		for (var i = 0; i < otherInputs.length; i++) {
			var max = otherInputs[i].getAttribute('max');
			if (i === 0) {
				var tmpMax = n - +input.value - +otherInputs[1].value;
			}
			if (i === 1) {
				var tmpMax = n - +input.value - +otherInputs[0].value;
			}
			console.log(tmpMax);
			if (tmpMax < 0) {
				otherInputs[i].setAttribute('max', 0);
			} else {
				otherInputs[i].setAttribute('max', tmpMax);
			}
		}
	};

	var hddInputs = document.querySelectorAll("#select-hdd input[type='number']");
	for (var i = 0; i < hddInputs.length; i++) {
		hddInputs[i].addEventListener('change', function() {
			var n = document.querySelector('.param-btn-box.body > .select').getAttribute('data-num');
			validateInputNum(this, n);
		});
	}

	var validateTabs = function (tabs) {
		var hddTypes = document.querySelectorAll('.hdd-list input');
		var sasTab = tabs.querySelector('li.sas');
		var sasInputNum = document.querySelector('input#sas-num[type="number"]');
		var sataInputNum = document.querySelector('input#sata-num[type="number"]');
		var ssdInputNum = document.querySelector('input#ssd-num[type="number"]');
		var max = document.querySelector('.param-btn-box.body > .select').getAttribute('data-num');
		for (var i = 0; i < hddTypes.length; i++) {
			hddTypes[i].addEventListener('change', function () {
				if (this.getAttribute('id') === 'not') {
					sasTab.classList.add('disable');
					sasInputNum.value = '0';
					sataInputNum.setAttribute('max', +max - +ssdInputNum.value);
					ssdInputNum.setAttribute('max', +max - +sataInputNum.value);
				} else {
					sasTab.classList.remove('disable');
				}
			});
		}
	};

	var initializeRange = function (min) {
		var handle = $("#custom-handle");
		var range = $("#cpu-range");
		if (range) {
    	range.slider({
    	  create: function() {
    	    handle.text( $( this ).slider( "value" ) );
    	  },
    	  slide: function( event, ui ) {
    	    handle.text( ui.value );
    	  },
    	  min: min,
    	  max: 24,
    	  step: 1,
    	  value: min,
    	});
    }
	};

	var tabs = document.querySelector('ul.nav-tabs');
	window.utils.showTabBlock(tabs);
	validateTabs(tabs);

	var closeBtns = document.querySelectorAll('.close-btn');
	window.utils.closePopup(closeBtns);

	var openBtns = document.querySelectorAll('.open-popup-btn');
	window.utils.openPopup(openBtns);
	var openFormButton = document.querySelector('.send-form');
	openFormButton.addEventListener('click', function () {
		updateConfigInfo();
	});

	var paramBtnCPU = document.querySelectorAll('.param-btn-box.cpu > .btn');
	for (var i = 0; i < paramBtnCPU.length; i++) {
		paramBtnCPU[i].addEventListener('click', function (evt) {
			evt.preventDefault();
			window.utils.chooseParam(this, function (paramBtn) {
				var cpuCount = paramBtn.getAttribute('data-cpu-count');
				if (cpuCount === '2') {
					initializeRange(2);
					document.querySelector('#custom-handle').innerText = "2";
				} else {
					initializeRange(1);
					document.querySelector('#custom-handle').innerText = "1";
				}
			});
		});
	}

	var paramBtnPSU = document.querySelectorAll('.param-btn-box.psu > .btn');
	for (var i = 0; i < paramBtnPSU.length; i++) {
		paramBtnPSU[i].addEventListener('click', function (evt) {
			evt.preventDefault();
			window.utils.chooseParam(this, function (paramBtn) {
				var slotExtension = document.querySelector('.slot-block-extension');

				if (paramBtn.getAttribute('data-type') === 'psu-count') {
					var psuCount = paramBtn.getAttribute('data-psu-count');
					if (psuCount == 2) {
						slotExtension.classList.remove('hidden');
					} else {
						slotExtension.classList.add('hidden');
					}
				}
			});
		});
	}

	var paramBtnBody = document.querySelectorAll('.param-btn-box.body > .btn');
	for (var i = 0; i < paramBtnBody.length; i++) {
		paramBtnBody[i].addEventListener('click', function (evt) {
			evt.preventDefault();
			window.utils.chooseParam(this, function (paramBtn) {
				var sataTab = document.querySelector('ul.nav-tabs > li.sata');
				var sataInputNum = document.querySelector('input#sata-num[type="number"]');
				var sataBox = document.querySelector('.box-tab.sata');
				var bodyImages = document.querySelectorAll('.photo-box img');
				var hddNums = document.querySelectorAll('#select-hdd input[type="number"]');
				var max = document.querySelector('.param-btn-box.body > .select').getAttribute('data-num');

				if (paramBtn.getAttribute('id') === 'body-2') {
					sataTab.classList.add('disable');
					sataBox.classList.remove('visible');
					if (sataTab.classList.contains('active')) {
						sataTab.classList.remove('active');
						sataTab.previousElementSibling.classList.add('active');
						sataBox.previousElementSibling.classList.add('visible');
					}
					bodyImages[1].classList.remove('hidden');
					bodyImages[0].classList.add('hidden');
					sataInputNum.value = '0';
					for (var j = 0; j < hddNums.length; j++) {
						hddNums[j].setAttribute('max', max);
						//hddNums[j].value = '10';
					}
				} else {
					//sataTab.classList.remove('disable');
					//sataBox.classList.add('visible');
					if (paramBtn.getAttribute('id') === 'body-1') {
						sataTab.classList.remove('disable');
						bodyImages[0].classList.remove('hidden');
						bodyImages[1].classList.add('hidden');
						for (var j = 0; j < hddNums.length; j++) {
							hddNums[j].setAttribute('max', max);
							if (+hddNums[j].value > +max) {
								hddNums[j].value = '0';
							}
						}
					}
				}
			});
		});
	}

	/*var hddSelects = document.querySelectorAll('select');
	for (var i = 0; i < hddSelects.length; i++) {
		hddSelects[i].addEventListener('change', function () {
			hddSelect(this, 4);
		});
	}

	var hddSelect = function (select, n) {
		var id = select.getAttribute('id');
		var otherSelects = document.querySelectorAll("select:not(#" + id + ")");
		var optionNumber = n - select.selectedIndex;
		console.log(optionNumber);
		for (var i = 0; i < otherSelects.length; i++) {
			console.log(otherSelects[i]);
			otherSelects[i].innerHTML = '';
			for (var j = 0; j <= optionNumber; j++) {
				var newOption = document.createElement('option');
				newOption.value = j;
				newOption.innerText = j;
				otherSelects[i].appendChild(newOption);
			}
		}
	};*/


	var inputsNumber = document.querySelectorAll('input[type="number"]');
	for (var i = 0; i < inputsNumber.length; i++) {
		window.utils.validateInputNumber(inputsNumber[i]);
	}

	/*var inputsHddNumber = document.querySelectorAll('input.hdd-num[type="number"]');
	for (var i = 0; i < inputsHddNumber.length; i++) {
		inputsHddNumber[i].addEventListener('input', function () {
			var inputsHddNumber = document.querySelectorAll('input.hdd-num[type="number"]');
			var hddLength = document.querySelectorAll('.hdd-tabs > li.disable').length;
			console.log(hddLength);
			if (hddLength === 1) {
				this.setAttribute('data-old-count', '1');
			}
			if (hddLength === 2) {
				this.setAttribute('data-old-count', '0');
			}
			//var oldCount = 0;
			var count = 0;
			for (var j = 0; j < inputsHddNumber.length; j++) {
				var id = inputsHddNumber[j].parentNode.parentNode.getAttribute('id');
				var tab = document.querySelector('.hdd-tabs').querySelector('.' + id);
				if ((inputsHddNumber[j].getAttribute('id') !== this.getAttribute('id')) && !tab.classList.contains('disable')) {
							count += +inputsHddNumber[j].value;
				}
			}
			var max = +this.getAttribute('max');
			//var newCount;
			console.log('max' + max);
			console.log('count' + count);
			//console.log('oldCount' + oldCount);
			if (count > max) {
				this.setAttribute('max', '1');
				this.value = '1';
			} else {
				if (+this.getAttribute('data-old-count') !== count) {
					var newMax = max - count;
					this.setAttribute('max', newMax);
					this.setAttribute('data-old-count', count);
				}
			}
			
			//oldCount = count;
			//newCount = count;
		});
	}*/
	

	initializeRange(1);

	window.utils.documentClickHandler();

	$('.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    nav:true,
    items:4,
    dots:false,
    navText:['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
	});

	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
	});

})();