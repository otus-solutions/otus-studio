(function() {

    angular
        .module('editor.engine.ui')
        .directive('singleSelectionQuestion', singleSelectionQuestion);

    singleSelectionQuestion.$inject = [
        'editor.engine.ui.mpath',
        'LabelUpdateService',
        'AnswerOptionUpdateService',
        'WidgetLoaderService',
        'UIUtils'
    ];

    function singleSelectionQuestion(mpath, LabelUpdateService, AnswerOptionUpdateService, WidgetLoaderService, UIUtils) {
        var directiveScope = null;

        var ddo = {
            restrict: 'E',
            templateUrl: mpath.getWidgetPath('single-selection'),
            link: function(scope, element, attrs, controller) {
                directiveScope = scope;
                directiveScope.options = [];
                directiveScope.optionWidget = null;
            },
            controller: function controller($scope, $element) {
                var self = this,
                    question = null;

                /* Public interface */
                self.update = update;

                /* Initialization */
                init();

                function init() {
                    LabelUpdateService.registerObserver(self);
                    AnswerOptionUpdateService.registerObserver(self);
                    question = UIUtils.jq($element);
                }

                function update(data, updateType) {
                    if (updateType == 'ADD_DATA')
                        addAnswerOption(data);
                    else if (updateType == 'REMOVE_DATA')
                        addAnswerOption(data);
                }

                function addAnswerOption(answerOption) {
                    WidgetLoaderService.loadWidget(answerOption, $scope, appendToQuestion);
                }

                function appendToQuestion(widget) {
                    console.log(directiveScope);
                    directiveScope.optionWidget = widget;
                    directiveScope.options.push(++directiveScope.length);
                }
            }
        };

        return ddo;
    }

}());
