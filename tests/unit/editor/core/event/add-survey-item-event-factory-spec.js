describe('AddSurveyItemEventFactory suite',function () {
  var Mock = {};
  var Injections = [];
  var factory;
  var ITEM_TYPE = 'SingleSelectionQuestion';


  beforeEach(function() {
    angular.mock.module('studio');

    angular.mock.inject(function (_$injector_,_$rootScope_) {
      Injections.$rootScope = _$rootScope_.$new();
      Injections.AddSurveyItemService = _$injector_.get('AddSurveyItemService');
      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.WorkspaceService.workspace = mockWorkspace();
      Injections.PageAnchorService = _$injector_.get('PageAnchorService');

      factory = _$injector_.get('AddSurveyItemEventFactory', Injections);
      spyOn(Injections.AddSurveyItemService, "execute");
      spyOn(Injections.$rootScope,"$broadcast");
      spyOn(Injections.WorkspaceService, "saveWork");
      spyOn(Injections.PageAnchorService,"sheetAutoFocus");
    });
  });

  it('factoryExistence check', function () {
    expect(factory).toBeDefined();
  });

  it('factoryMethodsExistence check', function () {
    expect(factory.create).toBeDefined();
  });

  it('create method should instantiate AddSurveyItemEvent', function () {
    expect(factory.create().execute).toBeDefined();

  });

  it('Instance of AddSurveyItemEventFactory shold evoke internalMethods', function () {
    factory.create().execute(ITEM_TYPE);
    expect(Injections.AddSurveyItemService.execute).toHaveBeenCalledTimes(1);
    expect(Injections.WorkspaceService.saveWork).toHaveBeenCalledTimes(1);
  });

  function mockWorkspace() {
    return Mock.workspace = {
      isdb: {
        userEdits: {
          store: jasmine.createSpy()
        }
      },
      project: {
        survey: jasmine.createSpy()
      },
      sessions: {
        workspaceOwner: jasmine.createSpy()
      }
    }
  }

});
