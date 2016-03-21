describe('surveyTemplateExportDirective', function() {
    var compile, scope, directiveElem;

    beforeEach(function() {
        module('editor.workspace');

        inject(function($compile, $rootScope) {
            compile = $compile;
            scope = $rootScope.$new();
        });

        directiveElem = getCompiledElement();

    });

    it('should have survey-template-export in md-button', function() {
        var element = directiveElem.find('button[survey-template-export]');
        expect(element.length).toBe(1);
    });

    function getCompiledElement() {
        var compiledDirective = compile(angular.element('<button id="test" survey-template-export></button>'))(scope);
        scope.$digest();
        return compiledDirective;
    }

});
