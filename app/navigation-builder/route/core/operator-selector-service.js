(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.OperatorSelectorService', service);

  function service() {
    var self = this;
    var _operatorMap = {};

    _initOperatorMap();

    /* Public methods */
    self.listOperators = listOperators;

    function listOperators(itemType) {
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

      var _notEqual = {
        type: 'notEqual',
        label: 'Diferente de'
      };

      var _equals = {
        type: 'equals',
        label: 'Igual a'
      };

      var _contains = {
        type: 'contains',
        label: 'Contém'
      };

      var _in = {
        type: 'in',
        label: 'Está dentro do intervalo'
      };

      var _between = {
        type: 'between',
        label: 'Está entre os valores'
      };

      var _greater = {
        type: 'greater',
        label: 'É maior que'
      };

      var _greaterEqual = {
        type: 'greaterThan',
        label: 'É maior ou igual a'
      };

      var _lower = {
        type: 'lower',
        label: 'É menor que'
      };

      var _lowerEqual = {
        type: 'lowerEqual',
        label: 'É menor ou igual a'
      };

      // Text operators
      _operatorMap.text = [_notEqual, _equals, _contains];

      // Number operators
      _operatorMap.number = [_notEqual, _equals, _in, _between, _greater, _greaterEqual, _lower, _lowerEqual];

      // Date operators
      _operatorMap.date = _operatorMap.number;

      // Time operators
      _operatorMap.time = _operatorMap.date;

      // Single choice operators
      _operatorMap.singleChoice = [_notEqual, _equals];

      // Multiple choice operators
      _operatorMap.multipleChoice = _operatorMap.text;
    }
  }
})();
