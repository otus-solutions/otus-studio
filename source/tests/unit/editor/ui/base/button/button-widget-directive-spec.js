describe('OtusButtonWidget directive', function() {
    var directive;
    var Mock = {};
    var rootScope;

    beforeEach(function() {
        angular.mock.module('studio');

        inject(function(_$injector_, $rootScope, $compile) {
            rootScope = $rootScope;
            mockOtusButtonWidgetFactory(_$injector_);
            directive = getCompiledDirective($rootScope, $compile);
        });
    });

    describe('events configuration', function() {

        xit('should have a click property defined as Function', function() {
        });

    });

    function getCompiledDirective($rootScope, $compile) {
        Mock.scope = $rootScope.$new();
        var element = angular.element('<otus:button/>');
        return $compile(element)(Mock.scope);
    }

    function mockOtusButtonWidgetFactory($injector) {
        Mock.OtusButtonWidgetFactory = $injector.get('OtusButtonWidgetFactory');
    }

});
