(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('FileUploadQuestionWidgetFactory', FileUploadQuestionWidgetFactory);

  FileUploadQuestionWidgetFactory.$inject = [
    'AddFileUploadEventFactory',
    'RemoveFileUploadEventFactory',
    '$q'
  ];

  function FileUploadQuestionWidgetFactory(AddFileUploadEventFactory, RemoveFileUploadEventFactory, $q) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(scope, element) {
      return new FileUploadQuestionWidget(scope, element, AddFileUploadEventFactory, RemoveFileUploadEventFactory, $q);
    }

    return self;
  }

  function FileUploadQuestionWidget(scope, element, AddFileUploadEventFactory, RemoveFileUploadEventFactory, $q) {
    var self = this;
    self.fileName = 'Selecione o arquivo utilizando o botão para realizar o upload';

    /* Public methods */
    self.getClassName = getClassName;
    self.getUUID = getUUID;
    self.getElement = getElement;
    self.getParent = getParent;
    self.getItem = getItem;
    self.getTemplate = getTemplate;

    function getClassName() {
      return 'FileUploadQuestionWidget';
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
      return '<file-upload-question></file-upload-question>';
    }
  }

}());
