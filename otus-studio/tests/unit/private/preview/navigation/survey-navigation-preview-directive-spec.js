describe('surveyNavigationPreviewGenerator', function functionName() {
    var element, scope, compiledDirective, NavigationPreviewService;
    var Mock = {};

    /* @BeforeScenario */
    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            /* @InjectMocks */
            $rootScope = _$injector_.get('$rootScope');
            $compile = _$injector_.get('$compile');
            NavigationPreviewService = _$injector_.get('NavigationPreviewService');

            compiledDirective = getCompiledDirective($rootScope, $compile);
        });
    });

    describe('test of directive survey-navigation-preview-generator:', function functionName() {
        it('should has compiled with sucess', function() {
            expect(compiledDirective).toBeDefined();
        });

        it('should call function createGraph and renderGraph', function() {
            spyOn(NavigationPreviewService, 'createGraph').and.returnValue(true);
            spyOn(NavigationPreviewService, 'renderGraph').and.returnValue(true);
            compiledDirective.triggerHandler('click');
            expect(NavigationPreviewService.createGraph).toHaveBeenCalled();
            expect(NavigationPreviewService.renderGraph).toHaveBeenCalled();
        });

        xit('should be removed element graph', function() {
            //* quando compiled directive chamar o método find e retornar true, deve verificar se jquery chamou remove
            spyOn($.fn, 'remove');
            spyOn(compiledDirective, 'find').and.returnValue(true);
            compiledDirective.triggerHandler('click');
            expect('remove').toHaveBeenCalled();
        });

    });

    function getCompiledDirective($rootScope, $compile) {
        scope = $rootScope.$new();
        element = '<md-tab survey-navigation-preview-generator></md-tab>';
        element = $compile(element)(scope);
        scope.$digest();
        return element;
    }

});
