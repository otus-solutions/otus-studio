(function() {

    angular
        .module('editor.ui')
        .controller('MainContainerController', MainContainerController);

    MainContainerController.$inject = ['$scope', 'UIDataService'];

    function MainContainerController($scope, UIDataService) {
        $scope.binding = UIDataService;
    }

}());
