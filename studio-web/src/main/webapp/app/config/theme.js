angular.module('StudioApp').config(function($mdThemingProvider) {
	
	$mdThemingProvider.definePalette('toolbarTheme' , {
		'50' : 'E3F2FD',
		'100':'BBDEFB',
		'200':'90CAF9',
		'300':'64B5F6',
		'400':'42A5F5',
		'500':'2196F3',
		'600':'1E88E5',
		'700':'1976D2',
		'800':'1565C0',
		'900':'0D47A1',
		'A100':'82B1FF',
		'A200':'448AFF',
		'A400':'2979FF',
		'A700':'2962FF',
		'constrastDefaultColor' : 'E3F2FD',
		'constrastDarkColors' : ['50', '100', '200', '300', '400', 'A100'],
		'contrastLightColors': undefined
	});
	
	$mdThemingProvider.theme('custom1')
    	.primaryPalette('toolbarTheme')
    	.warnPalette('red');
	
	$mdThemingProvider.theme('buttonTheme')
		.primaryPalette('indigo');
		
});	

	