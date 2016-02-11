(function() {

    angular
        .module('editor.ui')
        .directive('surveyPage', surveyPage);

    surveyPage.$inject = ['$compile', '$templateRequest', '$templateCache'];

    function surveyPage() {
        var ddo = {
            controller: SurveyPageController
        };

        return ddo;
    }

    /*
     * Directive's controller implementation
     */
    function SurveyPageController($scope, $compile, $templateRequest, $templateCache, $element) {
        this.addQuestion = function addQuestion(templateUrl) {
            this.loadTemplate(templateUrl, function(template) {
                $element.append(template);
            });
        };

        this.loadTemplate = function loadTemplate(templateUrl, callback) {
            $templateRequest(templateUrl).then(function(html) {
                $scope.variable = 'valor aqui';
                var compileResult = $compile(html)($scope),
                    template = angular.element(compileResult);

                callback(template);
            });
        };
    }

}());
