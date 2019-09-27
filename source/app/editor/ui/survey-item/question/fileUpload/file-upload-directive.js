(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('fileUploadQuestion', directive);

  function directive(FileUploadQuestionWidgetFactory) {
    var ddo = {
      scope: {},
      templateUrl: 'app/editor/ui/survey-item/question/fileUpload/file-upload-question.html',
      retrict: 'E',
      link: function(scope, element) {
        scope.widget = FileUploadQuestionWidgetFactory.create(scope, element);
        _chooseFile(scope, element);
      }
    };

    return ddo;
  }

  function _chooseFile(scope, element) {
    scope.fileName = 'Selecione o arquivo utilizando o botão para realizar o upload';
    var button = angular.element(element[0].querySelector('button#uploadButton'));
    var input = angular.element(element[0].querySelector('input#fileInput'));

    if (input.length && button.length) {
      button.bind('click', function() {
        input[0].click();
      });
    }

    input.bind('change', function(e) {
      scope.$apply(function() {
        var files = e.target.files;
        if (files[0]) {
          scope.fileName = files[0].name;
        } else {
          scope.fileName = null;
        }
      });
    });
  }

}());
