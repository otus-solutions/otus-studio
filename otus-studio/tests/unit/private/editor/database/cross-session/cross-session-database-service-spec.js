describe('CrossSessionDatabaseService', function() {
    var Mock = {};

    beforeEach(function() {
        module('editor.database');

        inject(function(_$injector_) {
            service = _$injector_.get('CrossSessionDatabaseService', {
                '$indexedDB': mockIndexedDB(_$injector_)
            });
        });
    });

    describe('saveSurveyTemplateRevision method', function() {

        it('should call $indexedDB.openStore with name "survey_template"', function() {
            spyOn(Mock.$indexedDB, 'openStore');

            service.saveSurveyTemplateRevision(jasmine.any(Object), jasmine.any(Object));

            expect(Mock.$indexedDB.openStore).toHaveBeenCalled();
        });

    });

    function mockIndexedDB($injector) {
        Mock.$indexedDB = $injector.get('$indexedDB');
        return Mock.$indexedDB;
    }

});
