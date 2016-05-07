describe('surveyNavigationPreviewGenerator', function functionName() {
    var element, scope, directive;
    var Mock = {};

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockNavigationPreviewService(_$injector_);
            mockWorkspaceService(_$injector_);

            $compile = _$injector_.get('$compile');

            directive = getCompiledDirective($rootScope, $compile);
        });
    });

    describe('test of directive survey-navigation-preview-generator:', function functionName() {

        it('should has compiled with sucess', function() {
            expect(directive).toBeDefined();
        });

        it('should call function createGraph and renderGraph', function() {
            spyOn(Mock.NavigationPreviewService, 'createGraph').and.returnValue(true);
            spyOn(Mock.NavigationPreviewService, 'renderGraph').and.returnValue(true);

            directive.triggerHandler('click');

            expect(Mock.NavigationPreviewService.createGraph).toHaveBeenCalled();
            expect(Mock.NavigationPreviewService.renderGraph).toHaveBeenCalled();
        });

    });

    function getCompiledDirective($rootScope, $compile) {
        scope = $rootScope.$new();
        element = '<md-tab survey-navigation-preview-generator></md-tab>';
        element = $compile(element)(scope);
        scope.$digest();
        return element;
    }

    function mockWorkspaceService($injector) {
        Mock.WorkspaceService = $injector.get('WorkspaceService');
        spyOn(Mock.WorkspaceService, 'getSurvey').and.returnValue([]);
    }

    function mockNavigationPreviewService($injector) {
        Mock.NavigationPreviewService = $injector.get('NavigationPreviewService');
    }

});
