(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .directive('surveyTemplateUpload', SurveyTemplateUpload);

    SurveyTemplateUpload.$inject = ['SurveyTemplateUploadService'];

    function SurveyTemplateUpload(SurveyTemplateUploadService) {
        var ddo = {
            restrict: 'A',
            link: linkFunction
        };
        return ddo;

        function linkFunction($scope, $element, $attrs) {
            var fileUploadElement;

            $element.on('click', function() {
                fileUploadElement = _createInput();
                fileUploadElement.click();
                fileUploadElement.addEventListener('change', function() {
                    var fileToUpload = this.files[0];
                    _uploadSurveyTemplate(fileToUpload);
                });
            });

            function _uploadSurveyTemplate(fileToUpload) {
                SurveyTemplateUploadService.upload(fileToUpload);
            }

            function _createInput() {
                fileUploadElement = document.createElement('input');
                fileUploadElement.setAttribute('type', 'file');
                fileUploadElement.setAttribute('accept', '.json');
                return fileUploadElement;
            }
        }
    }

})();
