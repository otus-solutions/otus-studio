(function() {

    angular
        .module('editor.ui')
        .controller('MainContainerController', MainContainerController);

    MainContainerController.$inject = ['$scope', 'SharedDataService'];

    function MainContainerController($scope, SharedDataService) {
        $scope.binding = SharedDataService;
    }

}());
