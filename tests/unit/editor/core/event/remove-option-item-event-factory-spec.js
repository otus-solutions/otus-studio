describe('RemoveOptionItemEventFactory Suite', function () {

  var factory;
  var Mock = {};
  var Injections = [];
  var ITEM_TYPE = 'TimeQuestion';
  var OPTION_NAME = 'disabledButton';

  beforeEach(function() {
    angular.mock.module('studio');

    angular.mock.inject(function (_$injector_) {
      Injections.RemoveOptionItemService = _$injector_.get('RemoveOptionItemService');
      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.WorkspaceService.workspace = mockWorkspace();

      factory = _$injector_.get('RemoveOptionItemEventFactory', Injections);
      spyOn(Injections.RemoveOptionItemService, "execute");
      spyOn(Injections.WorkspaceService, "saveWork");
    });
  });

  it('factoryExistence check ', function () {
    expect(factory).toBeDefined();
  });

  it('factoryMethodsExistence check ', function () {
    expect(factory.create).toBeDefined();
  });

  it('create_method_should_instantiate_RemoveOptionItemEvent', function () {
    expect(factory.create().execute).toBeDefined();
  });

  it('instance_of_RemoveOptionItemEventFactory_shold_evoke_internalMethods', function () {
    factory.create().execute(ITEM_TYPE,OPTION_NAME);
    expect(Injections.RemoveOptionItemService.execute).toHaveBeenCalledTimes(1);
    expect(Injections.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledTimes(1);
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
