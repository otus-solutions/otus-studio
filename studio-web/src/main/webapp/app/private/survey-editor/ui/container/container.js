(function() {

    var containerModule = angular.module('editor.editing');
    var questionCount = 0;

    /*
     *    This service is used only for share the variable
     *    binding between differents instances of the ContainerController
     */
    containerModule.service('SharedDataService', function() {
        return {
            binding: ''
        };
    });

    containerModule.controller('ContainerController', ['$scope', 'SharedDataService', function($scope, SharedDataService) {
        $scope.binding = SharedDataService;
        $scope.isOpened = false;
        $scope.openClose = function() {
            if ($scope.isOpened == false) {
                $scope.isOpened = true;
            } else {
                $scope.isOpened = false;
            }
        };
    }]);

    containerModule.directive('directiveGenerator', ['EditingService', '$compile', '$templateRequest', '$templateCache',
        function(EditingService, $compile, $templateRequest, $templateCache) {
            var directive = {
                restrict: 'A',
                scope: {
                    control: '=',
                    target: '='
                },
                controller: function($scope, $element) {
                    var questions = [];

                    this.addQuestion = function addQuestion(templateUrl) {
                        var currentSurvey = EditingService.getSurvey();

                        $scope.target = 'survey.questions[' + currentSurvey.questions.length + ']';

                        this.loadTemplate(templateUrl, function(template) {
                            $element.append(template);
                            questions.push($scope);
                        });
                    };
                    this.loadTemplate = function loadTemplate(templateUrl, callback) {
                        $templateRequest(templateUrl).then(function(html) {
                            var compileResult = $compile(html)($scope),
                                template = angular.element(compileResult);

                            callback(template);
                        });
                    };
                },
                link: function link(scope, element, attrs, controller) {
                    scope.internalControl = scope.control || {};

                    scope.internalControl.addText = function addText() {
                        controller.addQuestion('private/studio/edit/survey/question/text-question-template.html');
                    };
                    scope.internalControl.addCheckbox = function addCheckbox() {
                        controller.addQuestion('private/studio/edit/survey/question/checkbox-question-template.html');
                    };
                }
            };

            return directive;
        }
    ]);

}());
