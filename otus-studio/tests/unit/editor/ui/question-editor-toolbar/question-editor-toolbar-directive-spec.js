describe('QuestionEditorToolbar', function() {
    var compiledDirective;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            $rootScope = _$injector_.get('$rootScope');
            $compile = _$injector_.get('$compile');

            compiledDirective = getCompiledDirective($rootScope, $compile);
        });
    });

    it('should has compiled with sucess', function() {
        expect(compiledDirective).toBeDefined();
    });

    function getCompiledDirective($rootScope, $compile) {
        scope = $rootScope.$new();
        element = '<question-editor-toolbar" ></question-editor-toolbar>';
        element = $compile(element)(scope);
        scope.$digest();
        return element;
    }

});
