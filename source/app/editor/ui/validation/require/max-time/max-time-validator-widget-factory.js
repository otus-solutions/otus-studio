(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('MaxTimeValidatorWidgetFactory', MaxTimeValidatorWidgetFactory);

  MaxTimeValidatorWidgetFactory.$inject = [
            'otusjs.utils.ImmutableDate'
        ];

  function MaxTimeValidatorWidgetFactory(ImmutableDate) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(scope, element) {
      return new MaxTimeValidator(scope, element, ImmutableDate);
    }

    return self;
  }

  function MaxTimeValidator(scope, element, ImmutableDate) {
    var self = this;
    var whoAmI = 'maxTime';


    /* Public Methods */
    self.data = '';
    self.updateData = updateData;
    self.deleteValidator = deleteValidator;

    var question = scope.$parent.widget.getItem();

    _init();

    function _init() {
      var referenceValue = question.fillingRules.options[whoAmI].data.reference.value;
      self.canBeIgnored = question.fillingRules.options[whoAmI].data.canBeIgnored;
      if (referenceValue !== '') {
        self.data = new ImmutableDate(referenceValue);
      } else {
        self.data = new ImmutableDate();
        self.data.resetTime();
        self.data.setHours(1);
      }
      self.data.resetDate();
      self.updateData();
    }

    function updateData() {
      if (self.data) {
        getRuleType().data.reference = self.data.toJSON(); //TODO remover quando refatorar load de transição edição -> preview do studio. Atualmente preview é carregado com objecto em memória e não fromJSON e gera erro com o ImmutableDate. (presente em validadores de tempo e data.)
        scope.$parent.widget.updateFillingRules();
      }
    }

    function getRuleType() {
      return question.fillingRules.options[whoAmI];
    }

    function deleteValidator() {
      scope.$parent.widget.deleteValidator(whoAmI);
      element.remove();
      scope.$destroy();
    }

  }

}());
