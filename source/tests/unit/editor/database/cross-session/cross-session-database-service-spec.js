describe('CrossSessionDatabaseService Suite', function () {

  var service;
  var Mock = {};
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('studio');

    inject(function (_$injector_) {

      mockTemplate();
      mockTemplateString();
      mockSession();
      mockStoreEntry();
      mockStore();

      Injections.$q = _$injector_.get('$q');
      Injections.$indexedDB = _$injector_.get('$indexedDB');

      service = _$injector_.get('CrossSessionDatabaseService', Injections);
    })
  });

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodExistence check', function () {
    expect(service.saveSurveyTemplateRevision).toBeDefined();
    expect(service.getAllSurveyTemplates).toBeDefined();
    expect(service.getAllSurveyTemplatesByContributor).toBeDefined();
    expect(service.deleteSurveyTemplate).toBeDefined();
    expect(service.insertSurveyTemplate).toBeDefined();
    expect(service.findSurveyTemplateByOID).toBeDefined();
  });

  it('saveSurveyTemplateRevision_method_should_instantiate_CrossSessionDatabaseService_call_store.upsert_with_correct_entry_format', function () {
    spyOn(Injections.$indexedDB, 'openStore').and.callFake(function (
      storeName, callback) {
      callback(Mock.store);
    });

    service.saveSurveyTemplateRevision(Mock.template, Mock.session);

    expect(Injections.$indexedDB.openStore).toHaveBeenCalledTimes(1);
    expect(Mock.store.upsert).toHaveBeenCalledTimes(1);
    expect(Mock.store.upsert).toHaveBeenCalledWith(Mock.storeEntry);
  });

  it('insertSurveyTemplate_method_should_instantiate_CrossSessionDatabaseService_call_store.insert_with_correct_entry_format', function () {
    spyOn(Injections.$indexedDB, 'openStore').and.callFake(function (
      storeName, callback) {
      callback(Mock.store);
    });

    service.insertSurveyTemplate(Mock.templateString, Mock.session);

    expect(Injections.$indexedDB.openStore).toHaveBeenCalledTimes(1);
    expect(Mock.store.insert).toHaveBeenCalledTimes(1);
    expect(Mock.store.insert).toHaveBeenCalledWith(Mock.storeEntryTwo);
  });

  it('getAllSurveyTemplates_method_should_instantiate_CrossSessionDatabaseService_call_store.getAll', function () {
    spyOn(Injections.$indexedDB, 'openStore').and.callFake(function (
      storeName, callback) {
      callback(Mock.store);
    });

    service.getAllSurveyTemplates();

    expect(Injections.$indexedDB.openStore).toHaveBeenCalledTimes(1);
    expect(Mock.store.getAll).toHaveBeenCalledTimes(1);
  });

  it('deleteSurveyTemplate_method_should_instantiate_CrossSessionDatabaseService_call_store.delete', function () {
    spyOn(Injections.$indexedDB, 'openStore').and.callFake(function (
      storeName, callback) {
      callback(Mock.store);
    });

    service.deleteSurveyTemplate();

    expect(Injections.$indexedDB.openStore).toHaveBeenCalledTimes(1);
    expect(Mock.store.delete).toHaveBeenCalledTimes(1);
  });

  it('findSurveyTemplateByOID_method_should_instantiate_CrossSessionDatabaseService_call_store.find', function () {
    spyOn(Injections.$indexedDB, 'openStore').and.callFake(function (
      storeName, callback) {
      callback(Mock.store);
    });

    service.findSurveyTemplateByOID();

    expect(Injections.$indexedDB.openStore).toHaveBeenCalledTimes(1);
    expect(Mock.store.find).toHaveBeenCalledTimes(1);
  });

  function mockTemplate() {
    Mock.template = {
      oid: 'template.oid',
      toJSON: function () {
        return {};
      }
    };
  }

  function mockTemplateString() {
    Mock.templateString ='{"oid": "template.oid","toJSON": ""}';
  }

  function mockSession() {
    Mock.session = {
      owner: 'session.owner'
    };
  }

  function mockStore() {
    Mock.store = {
      upsert: function (entry) { },
      insert: function (entry) { },
      getAll: function () { },
      eachWhere: function (entry) { },
      delete: function (entry) { },
      find: function () { }
    };

    spyOn(Mock.store, 'upsert').and.callFake(function (storeName, callback) {
      return {
        then: function () { }
      };
    });

    spyOn(Mock.store, 'insert').and.callFake(function (storeName, callback) {
      return {
        then: function () {
          return Promise.resolve()
        }
      };
    });

    spyOn(Mock.store, 'getAll').and.callFake(function (storeName, callback) {
      return {
        then: function () {
          return Promise.resolve()
        }
      };
    });

     spyOn(Mock.store, 'eachWhere').and.callFake(function (storeName, callback) {
      return {
        then: function () {
          return Promise.resolve()
        }
      };
    });

     spyOn(Mock.store, 'delete').and.callFake(function (storeName, callback) {
      return {
        then: function () { }
      };
    });

      spyOn(Mock.store, 'find').and.callFake(function (storeName, callback) {
      return {
        then: function () { }
      };
    });
  }

  function mockStoreEntry() {
    Mock.storeEntry = {
      template_oid: 'template.oid',
      contributor: 'session.owner',
      template: Mock.template.toJSON()
    };

    Mock.storeEntryTwo = {
      template_oid: 'template.oid',
      contributor: 'session.owner',
      template: JSON.parse(Mock.templateString)
    };
  }
});
