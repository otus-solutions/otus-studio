(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('SingleSelectionController', SingleSelectionController);

    SingleSelectionController.$inject = [
        '$scope',
        '$element',
        'ModelBuilderHubService',
        'AnswerOptionContentService',
        'UIUtils'
    ];

    function SingleSelectionController($scope, $element, ModelBuilderHubService, AnswerOptionContentService, UIUtils) {
        var self = this;

        /* Public interface */
        self.update = update;

        /* Initialization */
        init();

        function init() {
            ModelBuilderHubService.plugToAnswerOptionBuilder(self);
            $scope.answerOptions = [];
        }

        function update(update) {
            if (update.data.objectType == 'QuestionAnswerOption') {
                if (update.isAddData())
                    addAnswerOption(update.data);
                else if (update.isRemoveData())
                    removeAnswerOption(update.data);
                // else if (update.isUpdateData())
                //     updateAnswerOption(update.data);
            }
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

        // function updateAnswerOption(answerOption) {
        //     if (answerOption.parentQuestion == $scope.widget.questionId) {
        //         AnswerOptionContentService.updateOption($element, answerOption);
        //     }
        // }
    }

}());
