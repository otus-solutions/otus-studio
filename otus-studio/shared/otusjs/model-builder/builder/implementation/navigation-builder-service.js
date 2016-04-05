(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('MetadataBuilderService', MetadataBuilderService);

    // MetadataBuilderService.$inject = ['QuestionFactory', 'QuestionNavigationFactory'];

    function MetadataBuilderService() {
        var self = this;
        var workResult = null;

        /* Public interface */
        self.runValidations = runValidations;
        self.execute = execute;
        self.getWorkResult = getWorkResult;

        /* Observable interface */
        // self.registerObserver = registerObserver;

        // TODO: Implement validator to run here
        function runValidations(work) {
            workResult = true;
        }

        function getWorkResult() {
            return {
                result: workResult
            };
        }

        function execute(work) {
            var navigation = null;

            if (work.type.isAddData()) {
                navigation = addQuestion(work);
            } else if (work.type.isRemoveData()) {
                navigation = removeQuestion(work);
            } else if (work.type.isUpdateData()) {
                updateQuestion(work);
            }

            notifyObservers(navigation, work.type);
        }

        function addQuestion(work) {
            var newQuestion = QuestionFactory.create(work.model, work.questionId);
            work.survey.question[work.questionId] = newQuestion;

            return newQuestion;
        }
    }

}());
