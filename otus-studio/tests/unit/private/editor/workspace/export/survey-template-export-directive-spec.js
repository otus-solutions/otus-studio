describe('surveyTemplateExportDirective', function() {
    var scope, directiveElem;

    beforeEach(function() {
        module('editor.workspace');

        inject(function($compile, $rootScope) {
            elementButton = angular.element('<button survey-template-export></button>');

            scope = $rootScope.$new();
            $compile(elementButton)(scope);
            scope.$digest();
        });

    });

    it('should have survey-template-export in md-button', function() {
        var element = elementButton.find('md-button[survey-template-export]');
        expect(element.length).toBe(1);
    });

    function getCompiledElement() {
        var compiledDirective = compile(angular.element('<button survey-template-export></button>'))(scope);
        scope.$digest();
        return compiledDirective;
    }

});
