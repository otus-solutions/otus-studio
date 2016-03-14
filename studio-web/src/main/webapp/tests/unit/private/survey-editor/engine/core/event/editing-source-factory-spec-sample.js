describe('Tests for editing-source-factory and EditingSource model', function() {
    beforeEach(module('core'));

    var $factory;

    beforeEach(angular.mock.inject(function(_$factory_) {
        $factory = _$factory_;
    }));

    it('An EditingSource should have an eventId', function() {
        var factory = $factory('EditingSoure');

        // expect($scope.isOpened).toBe(false);
        // $scope.openClose();
        // expect($scope.isOpened).toBe(true);
    });

});
