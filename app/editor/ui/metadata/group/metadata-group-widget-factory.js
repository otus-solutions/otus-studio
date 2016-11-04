(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('MetadataGroupWidgetFactory', MetadataGroupWidgetFactory);

  MetadataGroupWidgetFactory.$inject = [
    'MetadataOptionWidgetFactory',
    'AddMetadataAnswerEventFactory',
    'RemoveMetadataOptionEventFactory',
    'MetadataAnswerFactory'
  ];

  function MetadataGroupWidgetFactory(MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory, MetadataAnswerFactory) {
    var self = this;

    /*Public interface*/
    self.create = create;

    function create(scope, element) {
      return new MetadataGroupWidget(scope, element, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory, MetadataAnswerFactory);
    }

    return self;
  }

  function MetadataGroupWidget(scope, element, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory, MetadataAnswerFactory) {
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
    self.removeLastOption = removeLastOption;
    self.isAvailableExtractionValue = isAvailableExtractionValue;

    _init();

    function _init() {
      if (self.getItem().metadata.options.length > 0) {
        _loadOptions();
      }
    }

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

    function _loadOptions() {
      var clonedArray = angular.copy(self.getItem().metadata.options);
      self.getItem().metadata.options = [];

      clonedArray.forEach(function(option) {
        var optionInstance = MetadataAnswerFactory.fromJsonObject(option);
        self.getItem().metadata.options.push(optionInstance);
        var optionWidget = MetadataOptionWidgetFactory.create(optionInstance, self);
        self.options.push(optionWidget);
      });
    }

    function addOption() {
      var newOption = AddMetadataAnswerEventFactory.create().execute(self);
      var optionWidget = MetadataOptionWidgetFactory.create(newOption, self);
      self.options.push(optionWidget);
    }

    function removeLastOption() {
      RemoveMetadataOptionEventFactory.create().execute(self);
      self.options.splice(-1);
    }

    function isAvailableExtractionValue($event) {
      return self.getItem().metadata.isAvailableExtractionValue($event.newValue);
    }
  }

}());
