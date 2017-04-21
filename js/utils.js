'use strict';

window.utils = (function () {
	/*var initializeRange = function (min) {
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
	};*/


	return {
		//initializeRange: initializeRange,

		showTabBlock: function (tabs) {
			tabs.addEventListener('click', function (evt) {
				evt.preventDefault();
				if (evt.target !== this) {
					var boxId = evt.target.getAttribute('href');
					var tab = evt.target.parentNode;
	
					if (!tab.classList.contains('active') && !tab.classList.contains('disable')) {
						var activeTab = this.querySelector('li.active');
						activeTab.classList.remove('active');
						tab.classList.add('active');
						var parentBox = this.parentNode;
						var visibleBox = parentBox.querySelector('.box-tab.visible');
						if (visibleBox) {
							visibleBox.classList.remove('visible');
						}
						var targetBox = parentBox.querySelector(boxId);
						targetBox.classList.add('visible');
					}
				}
			});
		},

		closePopup: function (closeBtns) {
			for (var i = 0; i < closeBtns.length; i++) {
				closeBtns[i].addEventListener('click', function (evt) {
					evt.preventDefault();
					this.parentNode.classList.add('hidden');
					this.parentNode.parentNode.classList.add('hidden');
				});
			}
		},

		openPopup: function (openBtns) {
			for (var i = 0; i < openBtns.length; i++) {
				openBtns[i].addEventListener('click', function (evt) {
					evt.preventDefault();
					var popupId = this.getAttribute('href');
					var popupBlock = document.querySelector(popupId);
					popupBlock.parentNode.classList.remove('hidden');
					popupBlock.classList.remove('hidden');
				});
			}
		},

		chooseParam: function (paramBtn, callback) {
			if (!paramBtn.classList.contains('select')) {
				var visibleParamBtn = paramBtn.parentNode.querySelector('.select');
				visibleParamBtn.classList.remove('select');
				paramBtn.classList.add('select');
			}

			if (typeof callback === 'function') {
				callback(paramBtn);
			}
		},

		documentClickHandler: function () {
			document.addEventListener('click', function (evt) {
				var popupVisible = document.querySelector('.popup:not(.hidden)');
				if (popupVisible && 
						evt.target != popupVisible && 
						!popupVisible.contains(evt.target) && 
						!evt.target.classList.contains('open-popup-btn') &&
						!evt.target.parentNode.classList.contains('open-popup-btn')) {
					popupVisible.classList.add('hidden');
					popupVisible.parentNode.classList.add('hidden');
				}
			});
		},

		validateInputNumber: function (input) {
			input.addEventListener('input', function () {
				var max = this.getAttribute('max');
				if (+this.value > +max) {
					this.value = max;
				}
			});
		}
	};
})();