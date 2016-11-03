(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('SingleSelectionQuestionWidgetFactory', SingleSelectionQuestionWidgetFactory);

  SingleSelectionQuestionWidgetFactory.$inject = [
    'AddAnswerOptionEventFactory',
    'RemoveAnswerOptionEventFactory',
    'AnswerOptionFactory'
  ];

  function SingleSelectionQuestionWidgetFactory(AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory, AnswerOptionFactory) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(scope, element) {
      return new SingleSelectionQuestionWidget(scope, element, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory, AnswerOptionFactory);
    }

    return self;
  }

  function SingleSelectionQuestionWidget(scope, element, AddAnswerOptionEventFactory, RemoveAnswerOptionEventFactory, AnswerOptionFactory) {
    var self = this;

    /* Public methods */
    self.getClassName = getClassName;
    self.getUUID = getUUID;
    self.getElement = getElement;
    self.getParent = getParent;
    self.getItem = getItem;
    self.getTemplate = getTemplate;
    self.addOption = addOption;
    self.removeLastOption = removeLastOption;
    self.isAvailableValue = isAvailableValue;

    _init();

    function _init() {
      if (self.getItem().options.length > 0) {
        _loadAnswerOptions();
      }
    }

    function getClassName() {
      return 'SingleSelectionQuestionWidget';
    }

    function getUUID() {
      return scope.uuid;
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

    function getTemplate() {
      return '<single-selection-question></single-selection-question>';
    }

    function addOption() {
      var newOption = AddAnswerOptionEventFactory.create().execute(self);
    }

    // TODO: This method won't be necessary when the loading mode be refactored!
    function _loadAnswerOptions() {
      var clonedArray = angular.copy(self.getItem().options);
      self.getItem().options = [];

      clonedArray.forEach(function(answerOption) {
        var loadedAnswerOption = AnswerOptionFactory.fromJsonObject(answerOption);
        self.getItem().options.push(loadedAnswerOption);
      });
    }

    function removeLastOption() {
      RemoveAnswerOptionEventFactory.create().execute(self);
    }

    function isAvailableValue($event) {
      return self.getItem().isAvailableValue($event.newValue);
    }
  }

}());
