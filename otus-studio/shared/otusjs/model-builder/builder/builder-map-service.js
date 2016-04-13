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
        'MetadataAnswerBuilderService',
        'RouteBuilderService'
    ];

    function BuilderMapService(SurveyIdentityBuilderService, QuestionBuilderService, LabelBuilderService, UnitBuilderService, AnswerOptionBuilderService, MetadataAnswerBuilderService, RouteBuilderService) {
        var self = this,
            builderMap = {
                'SurveyIdentityBuilderService': SurveyIdentityBuilderService,
                'QuestionBuilderService': QuestionBuilderService,
                'LabelBuilderService': LabelBuilderService,
                'UnitBuilderService': UnitBuilderService,
                'AnswerOptionBuilderService': AnswerOptionBuilderService,
                'MetadataAnswerBuilderService': MetadataAnswerBuilderService,
                'RouteBuilderService': RouteBuilderService
            };

        /* Public interface */
        self.getBuilder = getBuilder;

        function getBuilder(builderName) {
            return builderMap[builderName];
        }
    }

}());
