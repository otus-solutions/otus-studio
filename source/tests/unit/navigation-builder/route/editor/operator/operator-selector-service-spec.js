xdescribe('OperatorSelectorService', function() {

  var service = {};

  beforeEach(function() {
    angular.mock.module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_) {
      service = _$injector_.get(
        'otusjs.studio.navigationBuilder.routeBuilder.OperatorSelectorService'
      );
    });
  });

  describe('', function() {

  });

});
