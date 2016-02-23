(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .controller('SingleSelectionController', SingleSelectionController);

    SingleSelectionController.$inject = [
        '$scope',
        '$element',
        'AnswerOptionContentService',
        'LabelUpdateService',
        'AnswerOptionUpdateService',
        'UIUtils'
    ];

    function SingleSelectionController($scope, $element, AnswerOptionContentService, LabelUpdateService, AnswerOptionUpdateService, UIUtils) {
        var self = this;

        /* Public interface */
        self.update = update;

        /* Initialization */
        init();

        function init() {
            LabelUpdateService.registerObserver(self);
            AnswerOptionUpdateService.registerObserver(self);
            $scope.answerOptions = [];
        }

        function update(data, updateType) {
            if (updateType.isAddData())
                addAnswerOption(data);
            else if (updateType.isRemoveData())
                removeAnswerOption(data);
        }

        function addAnswerOption(answerOption) {
            if (answerOption.parentQuestion == $scope.widget.questionId)
                AnswerOptionContentService.loadOption(answerOption, $scope);
        }

        function removeAnswerOption(answerOption) {
            if (answerOption.parentQuestion == $scope.widget.questionId) {
                AnswerOptionContentService.unloadOption($element, $scope);
            }
        }
    }

}());
