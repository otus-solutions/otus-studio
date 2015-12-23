angular.module('Container', []);

(function() {
    var containerModule = angular.module('Container');

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
        directiveGenerator.$inject = ['$compile'];

        var checkboxTemplate = '<md-checkbox ng-model="lapa.checkbox" md-theme="layoutTheme" class="md-primary">' +
                                'Opção Um' +
                                '</md-checkbox>';

        var inputTemplate = '<md-input-container class="md-block" md-theme="layoutTheme">' +
                                '<label>{{lapa.input}}</label>' +
                                '<input ng-model="lapa.input" type="text" editing-source />' +
                            '</md-input-container>';

    function directiveGenerator($compile) {
        var directive = {
            restrict: 'E',
            require: '^surveyPage',
            scope: {
                control: '='
            },
            template : inputTemplate,
            /*templateUrl : "shared/components/question.html",*/
            link: linkFunc
        };

        function linkFunc(scope, element, attrs, surveyPageController) {
            console.log(scope.id)
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