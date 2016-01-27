describe('ContainerController', function() { //describe your object type
    beforeEach(module('Container')); //load module

    var $controller;

    beforeEach(angular.mock.inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('sum', function() {
        it('1 + 1 should equal 2', function() {
            var $scope = {};
            var controller = $controller('ContainerController', {
                $scope: $scope
            });
            expect($scope.isOpened).toEqual(false);
            $scope.openClose();
            expect($scope.isOpened).toEqual(true);

        });

    });

});
