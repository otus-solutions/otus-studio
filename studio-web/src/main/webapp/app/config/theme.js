angular.module('StudioApp').config(function($mdThemingProvider) {
		
	$mdThemingProvider.theme('layoutTheme')
		.primaryPalette('blue', {
		'default' : 'A200',
		'hue-1' : '200'
	}).accentPalette('blue-grey', {
		'default' : '900',
		'hue-1' : '100'	
	}).warnPalette('red');
	
});	

	