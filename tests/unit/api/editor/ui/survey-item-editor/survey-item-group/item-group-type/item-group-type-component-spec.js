describe('itemGroupTypeComponent_UnitTests_Suite', function () {
  let ctrl;

  beforeEach(function () {
    angular.mock.module('studio');
    angular.mock.inject(function ($controller) {
      ctrl = $controller('itemGroupTypeCtrl');
    })
  });

  it('componentExistence check ', function () {
    expect(ctrl).toBeDefined();
  });
});

