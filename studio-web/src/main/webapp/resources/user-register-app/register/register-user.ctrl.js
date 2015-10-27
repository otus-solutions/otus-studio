angular.module('RegisterAdm', ['ngMaterial', 'ui.mask']).controller('RegisterAdmCtrl', function($scope, $http, $window, $mdDialog) {
 
	/**
	 * REST URL: /register/adm
	 */
	
	
function confirmAlertToNavigate() {
	      alert = $mdDialog.alert()
	        .title('Informação')
	        .content('Seu cadastro foi realizado com sucesso! Você vai ser redirecionado para a tela de login.')
	        .ok('ok');

	      $mdDialog
	          .show( alert )
	          .finally(function() {
	            $window.location.href = window.location.origin + '/studio/'
	          });
}
	
	
	
	
  $scope.register = function (user) {
    $http.post(window.location.origin + '/studio/session/rest/register/adm', user).then(function(response){
    	
    	confirmAlertToNavigate();
    	
    },
    function(response){
    	console.log(user)
        console.log("Error!!!")
    });
  }
});
