(function() {
    angular.module('Container', ['surveyEditing']);

    var containerModule = angular.module('Container');
    var questionCount = 0;

    /*
    *    This service is used only for share the variable
    *    binding between differents instances of the ContainerController
    */
    containerModule.service('SharedDataService', function () {
        return {
            binding: ''
        };
    });

    containerModule.controller('ContainerController', ['$scope', 'SharedDataService', function($scope, SharedDataService) {
        $scope.binding = SharedDataService;
        $scope.isOpened = false;
        $scope.openClose = function (){
            if ($scope.isOpened == false) {
                $scope.isOpened = true;
            } else {
                $scope.isOpened = false;
            }
        };
    }]);

    containerModule.directive('directiveGenerator', ['EditingService', '$compile', '$templateRequest', '$templateCache',
        function (EditingService, $compile, $templateRequest, $templateCache) {
            var directive = {
                restrict: 'A',
                scope: {
                    control: '=',
                    questionIndex: '=',
                    target: '='
                },
                controller: function ($scope, $element, $attrs) {
                    var questions = [];

                    this.registerQuestions = function (question) {
                        questions.push(question);
                    };
                },
                link: function link(scope, element, attrs, surveyPageController) {
                    scope.internalControl = scope.control || {};

                    scope.internalControl.addText = function addText(){
                        var currentSurvey = EditingService.getSurvey();
                        scope.questionIndex = currentSurvey.questions.length;
                        scope.target = 'survey.questions[' + currentSurvey.questions.length + ']';
                        var textQuestionTemplateUrl = 'private/studio/edit/survey/question/text-question-template.html';
                        $templateRequest(textQuestionTemplateUrl).then(function(html){
                            var compileResult = $compile(html)(scope),
                                template = angular.element(compileResult);

                            element.append(template);
                            surveyPageController.registerQuestions(scope);
                        });
                    };
                    scope.internalControl.addCheckbox = function addCheckbox(){
                        element.append($compile(checkboxTemplate)(scope));
                    };
                }
            };

            return directive;
        }
    ]);

}());
