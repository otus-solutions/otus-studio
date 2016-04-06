(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('BuilderMapService', BuilderMapService);

    BuilderMapService.$inject = [
        'SurveyIdentityBuilderService',
        'QuestionBuilderService',
        'LabelBuilderService',
        'UnitBuilderService',
        'AnswerOptionBuilderService',
        'NavigationBuilderService'
    ];

    function BuilderMapService(SurveyIdentityBuilderService, QuestionBuilderService, LabelBuilderService, UnitBuilderService, AnswerOptionBuilderService, NavigationBuilderService) {
        var self = this,
            builderMap = {
                'SurveyIdentityBuilderService': SurveyIdentityBuilderService,
                'QuestionBuilderService': QuestionBuilderService,
                'LabelBuilderService': LabelBuilderService,
                'UnitBuilderService': UnitBuilderService,
                'AnswerOptionBuilderService': AnswerOptionBuilderService,
                'NavigationBuilderService': NavigationBuilderService
            };

        /* Public interface */
        self.getBuilder = getBuilder;

        function getBuilder(builderName) {
            return builderMap[builderName];
        }
    }

}());
