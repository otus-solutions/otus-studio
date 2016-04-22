(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('MetadataController', MetadataController);

    MetadataController.$inject = [
        '$scope',
        '$element',
        'ModelBuilderHubService',
        'MetadataAnswerOptionContentService',
        'UIUtils'
    ];

    function MetadataController($scope, $element, ModelBuilderHubService, MetadataAnswerOptionContentService, UIUtils) {
        var self = this;

        /* Public interface */
        self.update = update;

        /* Initialization */
        init();

        function init() {
            ModelBuilderHubService.plugToMetadataAnswerBuilder(self);
            $scope.metadataAnswerOptions = [];
        }

        function update(update) {
            if (!!update.data && update.data.objectType === 'MetadataAnswer') {
                if (update.isAddData())
                    addAnswerOption(update.data);
                else if (update.isRemoveData())
                    removeAnswerOption(update.data);
                // else if (update.isUpdateData())
                //     updateAnswerOption(update.data);
            }
        }

        function addAnswerOption(answerOption) {
            if (answerOption.parentQuestionID == $scope.widget.questionId)
                MetadataAnswerOptionContentService.loadOption(answerOption, $scope);
        }

        function removeAnswerOption(answerOption) {
            if (answerOption.parentQuestionID == $scope.widget.questionId) {
                MetadataAnswerOptionContentService.unloadOption($element, $scope);
            }
        }

        // function updateAnswerOption(answerOption) {
        //     if (answerOption.parentQuestion == $scope.widget.questionId) {
        //         MetadataAnswerOptionContentService.updateOption($element, answerOption);
        //     }
        // }
    }

}());
