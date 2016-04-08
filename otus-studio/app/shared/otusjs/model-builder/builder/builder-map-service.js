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
        'MetadataAnswerBuilderService'
    ];

    function BuilderMapService(SurveyIdentityBuilderService, QuestionBuilderService, LabelBuilderService, UnitBuilderService, AnswerOptionBuilderService, MetadataAnswerBuilderService) {
        var self = this,
            builderMap = {
                'SurveyIdentityBuilderService': SurveyIdentityBuilderService,
                'QuestionBuilderService': QuestionBuilderService,
                'LabelBuilderService': LabelBuilderService,
                'UnitBuilderService': UnitBuilderService,
                'AnswerOptionBuilderService': AnswerOptionBuilderService,
                'MetadataAnswerBuilderService': MetadataAnswerBuilderService
            };

        /* Public interface */
        self.getBuilder = getBuilder;

        function getBuilder(builderName) {
            return builderMap[builderName];
        }
    }

}());
