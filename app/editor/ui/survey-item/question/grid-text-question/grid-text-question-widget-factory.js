(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('GridTextQuestionWidgetFactory', GridTextQuestionWidgetFactory);

  GridTextQuestionWidgetFactory.$inject = [
    'otusjs.model.question.GridTextQuestionFactory'
  ];

  function GridTextQuestionWidgetFactory(GridTextQuestionFactory) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(scope, element) {
      return new GridTextQuestionWidget(scope, element, GridTextQuestionFactory);
    }

    return self;
  }

  function GridTextQuestionWidget(scope, element, GridTextQuestionFactory) {
    var self = this;

    /* Public methods */
    self.getClassName = getClassName;
    self.getUUID = getUUID;
    self.getElement = getElement;
    self.getParent = getParent;
    self.getItem = getItem;
    self.getTemplate = getTemplate;

    function getClassName() {
      return 'GridTextQuestionWidget';
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
      return '<grid-text-question></grid-text-question>';
    }
  }

}());
