(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('MetadataGroupWidgetFactory', MetadataGroupWidgetFactory);

  MetadataGroupWidgetFactory.$inject = [
    'AddMetadataAnswerEventFactory',
    'RemoveMetadataOptionEventFactory',
  ];

  function MetadataGroupWidgetFactory(AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory) {
    var self = this;

    /*Public interface*/
    self.create = create;

    function create(scope, element) {
      return new MetadataGroupWidget(scope, element, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory);
    }

    return self;
  }

  function MetadataGroupWidget(scope, element, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory) {
    var self = this;
    self.ngModel = scope.ngModel;
    self.options = [];

    /* Public methods */
    self.getClassName = getClassName;
    self.getUUID = getUUID;
    self.getElement = getElement;
    self.getParent = getParent;
    self.getItem = getItem;
    self.addOption = addOption;
    self.removeLastOption = removeLastOption;
    self.isAvailableExtractionValue = isAvailableExtractionValue;

    function getClassName() {
      return 'MetadataGroupWidget';
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

    function addOption() {
      AddMetadataAnswerEventFactory.create().execute(self);
    }

    function removeLastOption() {
      RemoveMetadataOptionEventFactory.create().execute(self);
    }

    function isAvailableExtractionValue($event) {
      return self.getItem().metadata.isAvailableExtractionValue($event.newValue);
    }
  }

}());
