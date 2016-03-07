(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('BuilderSelectorService', BuilderSelectorService);

    function BuilderSelectorService() {
        var self = this;

        /* Public interface */
        self.getBuilderName = getBuilderName;

        function getBuilderName(editingTarget) {
            return filter(editingTarget);
        }

        function filter(target) {
            var IDENTITY_REGEX = /^survey\.identity/,
                QUESTION_CONTAINER_REGEX = /^survey\.question$/,
                SELECTED_QUESTION_REGEX = /^survey\.question.[\d|\w|\-]+$/,
                LABEL_REGEX = /survey\.question\.[\d|\w|\-]+\.label/,
                UNIT_REGEX = /survey\.question\.[\d|\w|\-]+\.unit/,
                ANSWER_OPTION_REGEX = /survey\.question\.[\d|\w|\-]+\.option/;

            if (LABEL_REGEX.test(target)) {
                return 'LabelBuilderService';
            } else if (UNIT_REGEX.test(target)) {
                return 'UnitBuilderService';
            } else if (QUESTION_CONTAINER_REGEX.test(target)) {
                return 'QuestionBuilderService';
            } else if (SELECTED_QUESTION_REGEX.test(target)) {
                return 'QuestionBuilderService';
            } else if (IDENTITY_REGEX.test(target)) {
                return 'SurveyIdentityBuilderService';
            } else if (ANSWER_OPTION_REGEX.test(target)) {
                return 'AnswerOptionBuilderService';
            }

            return target;
        }
    }

}());
