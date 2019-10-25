describe('LoginController_Suite', function () {

  var ctrl;
  var Mock = {};
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('studio');

    angular.mock.inject(function ($controller, _$injector_, $rootScope) {

      Injections.$scope = $rootScope.$new();
      Injections.DashboardStateService = _$injector_.get('DashboardStateService');
      Injections.AuthenticationService = _$injector_.get('AuthenticationService');

      ctrl = $controller('LoginController', Injections);
      spyOn(Injections.AuthenticationService, "login").and.callThrough();
      spyOn(Injections.DashboardStateService, "goToFormTemplates").and.callThrough();
    });
  });

  it('controllerExistence check', function () {
    expect(ctrl).toBeDefined();
  });

  it('controllerMethodsExistence check', function () {
    expect(ctrl.authenticate).toBeDefined();
    expect(ctrl.visitAccess).toBeDefined();
  });

  it('authenticate_method_should_evoke_loginMethod_of_AuthenticationService', function () {
    mockUser();
    ctrl.authenticate(Mock.user);
    expect(Injections.AuthenticationService.login).toHaveBeenCalledTimes(1);
    expect(Injections.AuthenticationService.login).toHaveBeenCalledWith(Mock.user);
  });

  it('visitAccess_method_should_evoke_goToHome_of_DashboardStateService', function () {
    mockUser();
    ctrl.visitAccess();
    expect(Injections.DashboardStateService.goToFormTemplates).toHaveBeenCalledTimes(1);
  });

  function mockUser() {
    Mock.user = {
      domain: "otus",
      password: "123456",
      email: "otus@otussolutions.com.br"
    }
  }
});
