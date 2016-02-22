(function() {

    angular
        .module('editor.engine.ui')
        .controller('SingleSelectionController', SingleSelectionController);

    SingleSelectionController.$inject = [
        '$scope',
        '$element',
        'ContentLoaderService',
        'LabelUpdateService',
        'AnswerOptionUpdateService',
        'UIUtils'
    ];

    function SingleSelectionController($scope, $element, ContentLoaderService, LabelUpdateService, AnswerOptionUpdateService, UIUtils) {
        var self = this,
            singleSelection = null;

        /* Public interface */
        self.update = update;
        self.answerOptions = answerOptions;

        /* Initialization */
        init();

        function init() {
            LabelUpdateService.registerObserver(self);
            AnswerOptionUpdateService.registerObserver(self);
            singleSelection = UIUtils.jq($element);
            $scope.options = [];
        }

        function update(data, updateType) {
            if (updateType == 'ADD_DATA')
                addAnswerOption(data);
            else if (updateType == 'REMOVE_DATA')
                removeAnswerOption(data);
        }

        function addAnswerOption(answerOption) {
            if (answerOption.parentQuestion == $scope.widget.questionId)
                ContentLoaderService.loadWidget(answerOption, $scope, appendToQuestion);
        }

        function removeAnswerOption(answerOption) {
            singleSelection.find('[radio-container]').last().remove();
            $scope.options.splice(-1);
            $scope.lastOptionIndex = $scope.options.length - 1;
        }

        function answerOptions() {
            return options;
        }

        function appendToQuestion(widget) {
            $scope.optionWidget = widget;
            $scope.options.push($scope.options.length);
            $scope.lastOptionIndex = $scope.options.length - 1;
        }
    }

}());
