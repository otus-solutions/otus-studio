describe('surveyTemplateExportDirective', function() {
    var element, scope, compiledDirective, WorkspaceService;
    var Mock = {};

    /* @BeforeScenario */
    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            /* @InjectMocks */
            $rootScope = _$injector_.get('$rootScope');
            $compile = _$injector_.get('$compile');
            WorkspaceService = _$injector_.get('WorkspaceService');

            compiledDirective = getCompiledDirective($rootScope, $compile);
        });
    });

    it('should has compiled with sucess', function() {
        expect(compiledDirective).toBeDefined();
    });

    /**
     *
     * This test was commented because it forces a browser a download a fake file.
     *
     */
    xit('should calls WorkspaceService.exportWork method when receives the click', function() {
        spyOn(WorkspaceService, 'exportWork').and.callFake(function() {
            return;
        });
        compiledDirective.triggerHandler('click');
        expect(WorkspaceService.exportWork).toHaveBeenCalled();
    });

    function getCompiledDirective($rootScope, $compile) {
        scope = $rootScope.$new();
        element = '<button survey-template-export ></button>';
        element = $compile(element)(scope);
        scope.$digest();
        return element;
    }

});
