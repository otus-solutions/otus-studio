describe('Container', function() { //describe your object type
    beforeEach(module('editor.ui')); //load module

    var $controller;

    beforeEach(angular.mock.inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('some test', function() {
        it('some description', function() {
            expect(true).toBe(true);
        });

    });

});
