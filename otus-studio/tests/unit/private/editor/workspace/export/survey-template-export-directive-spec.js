describe('surveyTemplateExportDirective', function() {
    var $compile,
        $rootScope;

    beforeEach(module('editor.workspace'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Replaces the element with the appropriate content', function() {
        var node = $compile('<md-toolbar><md-button survey-template-export></md-button></md-toolbar>')($rootScope);
        var contents = node.contents();
        expect(contents[0].nodeType).toEqual(node.COMMENT_NODE);
        expect(contents[1].nodeType).toEqual(node.ELEMENT_NODE);
    });
});
