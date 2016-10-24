(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RuleOperatorBuilderService', service);

  function service() {
    var self = this;
    var _operatorMap = {};

    _initOperatorMap();

    /* Public methods */
    self.build = build;

    function build(itemType) {
      if (_isTextItem(itemType)) {
        return _operatorMap.text;
      } else if (_isNumberItem(itemType)) {
        return _operatorMap.number;
      } else if (_isDateItem(itemType)) {
        return _operatorMap.date;
      } else if (_isTimeItem(itemType)) {
        return _operatorMap.time;
      } else if (_isSingleChoiceItem(itemType)) {
        return _operatorMap.singleChoice;
      } else if (_isMultipleChoiceItem(itemType)) {
        return _operatorMap.multipleChoice;
      } else {
        return [];
      }
    }

    function _isTextItem(itemType) {
      return (itemType === 'TextQuestion' || itemType === 'EmailQuestion' || itemType === 'PhoneQuestion');
    }

    function _isNumberItem(itemType) {
      return (itemType === 'IntegerQuestion' || itemType === 'DecimalQuestion');
    }

    function _isDateItem(itemType) {
      return (itemType === 'CalendarQuestion');
    }

    function _isTimeItem(itemType) {
      return (itemType === 'TimeQuestion');
    }

    function _isSingleChoiceItem(itemType) {
      return (itemType === 'SingleSelectionQuestion');
    }

    function _isMultipleChoiceItem(itemType) {
      return (itemType === 'CheckboxQuestion');
    }

    function _initOperatorMap() {
      _operatorMap = {};

      var _notEqual = {}
      _notEqual.type = 'notEqual';
      _notEqual.label = {};
      _notEqual.label.ptBR = {};
      _notEqual.label.ptBR.plainText = 'Diferente de';

      var _equal = {};
      _equal.type = 'equal';
      _equal.label = {};
      _equal.label.ptBR = {};
      _equal.label.ptBR.plainText = 'Igual a';

      var _contains = {};
      _contains.type = 'contains';
      _contains.label = {};
      _contains.label.ptBR = {};
      _contains.label.ptBR.plainText = 'Contém';

      var _in = {};
      _in.type = 'in';
      _in.label = {};
      _in.label.ptBR = {};
      _in.label.ptBR.plainText = 'Está dentro do intervalo';

      var _between = {};
      _between.type = 'between';
      _between.label = {};
      _between.label.ptBR = {};
      _between.label.ptBR.plainText = 'Está entre os valores';

      var _greater = {};
      _greater.type = 'greater';
      _greater.label = {};
      _greater.label.ptBR = {};
      _greater.label.ptBR.plainText = 'É maior que';

      var _greaterEqual = {};
      _greaterEqual.type = 'greaterEqual';
      _greaterEqual.label = {};
      _greaterEqual.label.ptBR = {};
      _greaterEqual.label.ptBR.plainText = 'É maior ou igual a';

      var _lower = {};
      _lower.type = 'lower';
      _lower.label = {};
      _lower.label.ptBR = {};
      _lower.label.ptBR.plainText = 'É menor que';

      var _lowerEqual = {};
      _lowerEqual.type = 'lowerEqual';
      _lowerEqual.label = {};
      _lowerEqual.label.ptBR = {};
      _lowerEqual.label.ptBR.plainText = 'É menor ou igual a';

      var _quantitySelected = {};
      _quantitySelected.type = 'quantitySelected';
      _quantitySelected.label = {};
      _quantitySelected.label.ptBR = {};
      _quantitySelected.label.ptBR.plainText = 'Quantidade selecionada igual a';

      var _minSelected = {};
      _minSelected.type = 'minSelected';
      _minSelected.label = {};
      _minSelected.label.ptBR = {};
      _minSelected.label.ptBR.plainText = 'Quantidade mínima selecionada de';

      var _maxSelected = {};
      _maxSelected.type = 'maxSelected';
      _maxSelected.label = {};
      _maxSelected.label.ptBR = {};
      _maxSelected.label.ptBR.plainText = 'Quantidade máxima selecionada de';

      // Single choice operators
      _operatorMap.singleChoice = [_notEqual, _equal];

      // Text operators
      _operatorMap.text = Array.prototype.concat(_operatorMap.singleChoice, [_contains]);

      // Number operators
      _operatorMap.number = Array.prototype.concat(_operatorMap.singleChoice, [_in, _between, _greater, _greaterEqual, _lower, _lowerEqual]);

      // Date operators
      _operatorMap.date = _operatorMap.number;

      // Time operators
      _operatorMap.time = _operatorMap.date;

      // Multiple choice operators
      _operatorMap.multipleChoice = Array.prototype.concat(_operatorMap.text, [_quantitySelected, _minSelected, _maxSelected]);
    }
  }
})();
