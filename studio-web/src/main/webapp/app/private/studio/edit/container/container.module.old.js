(function() {
    angular.module('Container', []);

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

    containerModule.directive('directiveGenerator', directiveGenerator);
    directiveGenerator.$inject = ['$compile', '$templateCache'];
    ++questionCount;

    var checkboxTemplate = '<md-checkbox ng-model="survey.questions[' + questionCount + ']" md-theme="layoutTheme" class="md-primary">' +
                            'Opção Um' +
                            '</md-checkbox>';

    var inputTemplate = '<md-input-container class="md-block">' +
                            '<label>{{lapa.input}}</label>' +
                            '<input ng-model="survey.questions[' + questionCount + ']" type="text" editing-source />' +
                        '</md-input-container>';

    function directiveGenerator($compile, $templateCache) {
        var directive = {
            restrict: 'E',
            require: '^surveyPage',
            scope: {
                control: '='
            },
            /*template : inputTemplate,*/
            templateUrl : 'private/studio/edit/survey/question/text-question-template.html',
            link: linkFunc
        };

        function linkFunc(scope, element, attrs, surveyPageController) {
            console.log(directive);
            scope.internalControl = scope.control || {};

            scope.internalControl.addText = function(){
                element.append($compile(inputTemplate)(scope));
                surveyPageController.registerQuestions(scope);
                console.log(scope.$id);
            }
            scope.internalControl.addCheckbox = function(){
                element.append($compile(checkboxTemplate)(scope));
            }
        };

        return directive;
    };


     containerModule.directive('surveyPage', function (){
        return {
            controller: function ($scope, $element, $attrs) {
                var questions = [];

                this.registerQuestions = function (question) {
                    questions.push(question);
                    console.log(questions);
                    console.log($scope.$id);
                };
            }
        }
    });

}());
