(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('ModelBuilderHubService', ModelBuilderHubService);

    ModelBuilderHubService.$inject = [
        'AnswerOptionBuilderService',
        'LabelBuilderService',
        'QuestionBuilderService',
        'MetadataAnswerBuilderService',
	'RouteBuilderService'
    ];

    function ModelBuilderHubService(AnswerOptionBuilder, LabelBuilderService, QuestionBuilderService, MetadataAnswerBuilderService, RouteBuilderService) {
        var self = this;

        /* Public interface */
        self.plugToAnswerOptionBuilder = plugToAnswerOptionBuilder;
        self.plugToLabelBuilder = plugToLabelBuilder;
        self.plugToQuestionBuilder = plugToQuestionBuilder;
        self.plugToMetadataAnswerBuilder = plugToMetadataAnswerBuilder;
self.plugToNavigationBuilder = plugToNavigationBuilder;

        function plugToAnswerOptionBuilder(observer) {
            AnswerOptionBuilder.registerObserver(observer);
        }

        function plugToLabelBuilder(observer) {
            LabelBuilderService.registerObserver(observer);
        }

        function plugToQuestionBuilder(observer) {
            QuestionBuilderService.registerObserver(observer);
        }

        function plugToMetadataAnswerBuilder(observer) {
        	MetadataAnswerBuilderService.registerObserver(observer);
        }

	function plugToNavigationBuilder(observer) {
            RouteBuilderService.registerObserver(observer);
        }

        // function unplugFromAnswerOptionBuilder(observer) {
        //     AnswerOptionBuilder.unregisterObserver(observer);
        // }
        //
        // function unplugFromLabelBuilder(observer) {
        //     LabelBuilderService.unregisterObserver(observer);
        // }
        //
        // function unplugFromQuestionBuilder(observer) {
        //     QuestionBuilderService.unregisterObserver(observer);
        // }
    }

}());
