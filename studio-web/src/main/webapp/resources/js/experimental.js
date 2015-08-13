$(document).ready(function() {
	var DEFAULT_VALUE = 'Insira seu texto aqui';

	var $watermark = $('.watermark'), $edit = $('.edit'), currentText;

	$watermark.on('click', function(event) {
//		$edit.val(currentText);
		$edit.css('display', 'block');
		$edit.focus();

		$(this).css('display', 'none');
		if ($watermark.text() == DEFAULT_VALUE) {
			currentText = '';
		} else {
			currentText = $watermark.text();
		}
	});

	$edit.on('blur', function(event) {
		currentText = $(this).val();

		if (currentText != '') {
			$watermark.text($(this).val());
		} else {
			$watermark.text(DEFAULT_VALUE);
		}

		$watermark.css('display', 'block');
		$(this).css('display', 'none');
	});
	
	$edit.on('keypress', function (event) {
        if(event.which === 13){
        	$watermark.css('display', 'block');
    		$(this).css('display', 'none');
        }
	});
	
	$(".textQuestion").click(function() {
		$(this).toggleClass('borderRed');
	});
	
	
});