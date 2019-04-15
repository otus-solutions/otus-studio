describe('AddOptionItemEventFactory Suite', function () {

  var factory;
  var Mock = {};
  var Injections = [];
  var ITEM_TYPE = 'TimeQuestion';
  var OPTION_NAME = 'disabledButton';

  beforeEach(function() {
    angular.mock.module('studio');

    angular.mock.inject(function(_$injector_) {

      Injections.AddOptionItemService = _$injector_.get('AddOptionItemService');
      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.WorkspaceService.workspace = mockWorkspace();

      factory = _$injector_.get('AddOptionItemEventFactory', Injections);
      spyOn(Injections.AddOptionItemService, "execute");
      spyOn(Injections.WorkspaceService, "saveWork");
    });
  });

  it('factoryExistence check', function () {
    expect(factory).toBeDefined();
  });

  it('factoryMethodExistence check', function () {
    expect(factory.create).toBeDefined();
  });

  it('create_method_should_instantiate_AddOptionItemEvent', function () {
    expect(factory.create().execute).toBeDefined();
  });

  it('should_return_an_instance_of_AddOptionItemEvent', function() {
    expect(factory.create().constructor.name).toBe('AddOptionItemEvent');
  });

  it('Instance_of_AddOptionItemEventFactory_shold_evoke_internalMethods', function () {
    factory.create().execute(ITEM_TYPE,OPTION_NAME, true);
    expect(Injections.AddOptionItemService.execute).toHaveBeenCalledTimes(1);
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
    };
  }

});
