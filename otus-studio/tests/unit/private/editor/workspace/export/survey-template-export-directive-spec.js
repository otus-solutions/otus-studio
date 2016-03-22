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




describe('surveyTemplateExportDirective:?', function() {
	beforeEach(module('editor.workspace'));

	var element, scope;

	beforeEach(module('views/templates/albums.html'));

	beforeEach(inject(function($rootScope, $compile) {
		element = angular.element('<button survey-template-export></button>');

		scope = $rootScope;
		$compile(element)(scope);
		scope.$digest();
	}));

    it('should have survey-template-export in md-button', function() {
        var element = directiveElem.find('md-button[survey-template-export]');
        expect(element.length).toBe(1);
    });

});
