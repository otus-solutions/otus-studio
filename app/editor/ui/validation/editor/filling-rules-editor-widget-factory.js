(function () {
  'use strict';

  angular
    .module('editor.ui')
    .factory('FillingRulesEditorWidgetFactory', FillingRulesEditorWidgetFactory);

  FillingRulesEditorWidgetFactory.$inject = [
    'AddFillingRulesEventFactory',
    'RemoveFillingRulesEventFactory',
    'OtusFillingRulesWidgetFactory',
    '$compile',
    'UpdateFillingRulesEventFactory'

  ];

  function FillingRulesEditorWidgetFactory(AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateFillingRulesEventFactory) {
    var self = this;

    /*Public interface*/
    self.create = create;

    function create(scope, element) {
      return new FillingRulesEditorWidget(scope, element, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateFillingRulesEventFactory);
    }

    return self;

  }

  function FillingRulesEditorWidget(scope, element, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateFillingRulesEventFactory) {
    var self = this;
    var showList;

    self.ngModel = scope.ngModel;
    /* Public methods */
    self.getElement = getElement;
    self.getParent = getParent;
    self.getItem = getItem;
    self.addValidator = addValidator;
    self.checkIfShow = checkIfShow;
    self.deleteValidator = deleteValidator;
    self.updateFillingRules = updateFillingRules;
    self.menuDisabler = menuDisabler;

    _init();

    function _init() {
      showList = showListFeeder();
      _loadOptions();
    }

    function _isLoadingMode() {
      return Object.keys(self.getItem().fillingRules.options).length > 0;
    }

    function showListFeeder() {
      var showList = getItem().validators();
      // TODO: attribute removed to future implementation of special validator
      var _specials = showList.indexOf('specials');
      if (_specials > -1) {
        showList.splice(_specials, 1);
      }
      return showList;
    }

    function getElement() {
      return element;
    }

    function getParent() {
      return scope.$parent.widget;
    }

    function getItem() {
      return getParent().getItem();
    }

    function _loadOptions() {
      Object.keys(self.getItem().fillingRules.options).forEach(function (validatorToLoad) {
        appendFillingRules(validatorToLoad);
      });
      if (self.getItem().fillingRules.options.mandatory === undefined) {
        addValidator('mandatory');
      }
    }

    function addValidator(validator) {
      AddFillingRulesEventFactory.create().execute(getItem(), validator);
      appendFillingRules(validator);
    }

    function appendFillingRules(validator) {
      var template = OtusFillingRulesWidgetFactory.create(validator);
      var validatorsColumn = element.find('#validators-column');
      var validatorTemplate = $compile(template)(scope);
      validatorsColumn.append(validatorTemplate);
      _removeOfShowList(validator);
    }

    /*
     * For each validator added, it must be removed of showList to avoid that
     * the added validator can added again.
     * The validators 'accept' and 'mandatory' are always visible on screen
     * then they don't need to be removed of showList.
     */
    function _removeOfShowList(validator) {
      if (validator === 'accept' || validator === 'mandatory') {
        return;
      }
      showList.splice(showList.indexOf(validator), 1);
    }

    function deleteValidator(validator) {
      showList.push(validator);
      RemoveFillingRulesEventFactory.create().execute(self, validator);
    }


    function updateFillingRules() {
      UpdateFillingRulesEventFactory.create().execute();
    }


    function checkIfShow(fillingRule) {
      if (showList.indexOf(fillingRule) > -1) {
        return true;
      } else {
        return false;
      }
    }

    self.hasValidatorsForAdd = () => {
      return Boolean(showList.length === 1);
    };

    function menuDisabler() {
      if (showList.length > 0) {
        return false;
      } else {
        return true;
      }
    }

  }

}());
