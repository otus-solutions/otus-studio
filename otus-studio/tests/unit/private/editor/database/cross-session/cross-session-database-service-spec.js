describe('CrossSessionDatabaseService', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');

        mockTemplate();
        mockSession();
        mockStoreEntry();
        mockStore();

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

            expect(Mock.$indexedDB.openStore).toHaveBeenCalledWith('survey_template', jasmine.any(Function));
        });

        it('should call store.upsert', function() {
            spyOn(Mock.$indexedDB, 'openStore').and.callFake(function(storeName, callback) {
                callback(Mock.store);
            });

            service.saveSurveyTemplateRevision(Mock.template, jasmine.any(Object));

            expect(Mock.store.upsert).toHaveBeenCalledWith(jasmine.any(Object));
        });

        it('should call store.upsert with correct entry format', function() {
            spyOn(Mock.$indexedDB, 'openStore').and.callFake(function(storeName, callback) {
                callback(Mock.store);
            });

            service.saveSurveyTemplateRevision(Mock.template, Mock.session);

            expect(Mock.store.upsert).toHaveBeenCalledWith(Mock.storeEntry);
        });

    });

    function mockIndexedDB($injector) {
        Mock.$indexedDB = $injector.get('$indexedDB');
        return Mock.$indexedDB;
    }

    function mockTemplate() {
        Mock.template = {
            oid: 'template.oid',
            toJson: function() {
                return JSON.stringify({});
            }
        };
    }

    function mockSession() {
        Mock.session = {
            owner: 'session.owner'
        };
    }

    function mockStore($injector) {
        Mock.store = {
            upsert: function(entry) {}
        };

        spyOn(Mock.store, 'upsert').and.callFake(function(storeName, callback) {
            return {
                then: function() {}
            };
        });
    }

    function mockStoreEntry() {
        Mock.storeEntry = {
            template_oid: 'template.oid',
            contributor: 'session.owner',
            template: Mock.template.toJson()
        };
    }

});
