describe('TextDialogService', function() {

  var Mock = {};
  var service = {};
  var injections = {};

  beforeEach(function() {
    angular.mock.module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_, _$mdDialog_) {
      injections.$mdDialog = _$mdDialog_;
      service = _$injector_.get(
        'otusjs.studio.navigationBuilder.TextDialogService',
        injections);
    });
  });

  describe('loadData method', function() {

    it('', function() {

    });

  });
});
