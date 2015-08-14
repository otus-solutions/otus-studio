$(document).ready(function() {
	
	var LABEL_DEFAULT_VALUE;
	var currentText;

	function loadEvents() {
		$('.question-container').click(function() {
			$('.question-container').removeClass('selected-question');
			$(this).toggleClass('selected-question');
			loadEditionEvents();
		});
	}
	
	function loadEditionEvents() {
		$('.selected-question .watermark').on('click', function(event) {
			if (LABEL_DEFAULT_VALUE) {
				LABEL_DEFAULT_VALUE = $(this).text();
			}
			startEdition(event, $(this));
		});
	
		$('.selected-question .edit').on('blur', function(event) {
			endEdition(event, $(this));
		});
		
		$('.selected-question .edit').on('keypress', function (event) {
	        if(event.which === 13){
	        	$(this).blur();
	        }
		});
	}
	
	function startEdition(event, $this) {
		$('.selected-question .edit').css('display', 'block');
		$('.selected-question .edit').focus();

		$this.css('display', 'none');
		if ($this.text() == LABEL_DEFAULT_VALUE) {
			currentText = '';
		} else {
			currentText = $this.text();
		}
	}

	function endEdition(event, $this) {
		currentText = $this.val();

		if (currentText != '') {
			$('.selected-question .watermark').text($this.val());
		} else {
			$('.selected-question .watermark').text(DEFAULT_VALUE);
		}

		$('.selected-question .watermark').css('display', 'block');
		$this.css('display', 'none');
		
		//$('.watermark').replaceWith($('<span class="watermark">' + $('.watermark').text() + '</span>'));
		//loadEvents();
	}
	
	loadEvents();
});

// Teste de formatação em <b>negrito</b>, <i>itálico e <u>sublinhado</u>,