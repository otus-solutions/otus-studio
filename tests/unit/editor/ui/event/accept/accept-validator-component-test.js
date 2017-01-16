describe('otusAcceptValidator', function() {

  var $componentController;
  var Mock = {};

  beforeEach(module('studio'));
  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }))

  describe('updateData method', function() {

    it('should add object accept in options of fillingRules when isDisabled is true', function() {

      var component = $componentController('otusAcceptValidator', null, mockBinding());
      component.isDisabled = true;
      expect(self.item.fillingRules.options.accept).toEqual(true);
    });

    it('should removed object accept in options of fillingRules when isDisabled is true', function() {

      var component = $componentController('otusAcceptValidator', null, mockBinding());
      component.isDisabled = false;
      expect(self.item.fillingRules.options.accept).toEqual(false);
    });
  });

  function mockBinding($injector) {
    Mock.question = $injector.get('SurveyItemFactory').create('CalendarQuestion', 'Q1');
    return Mock.question;
  }

});
