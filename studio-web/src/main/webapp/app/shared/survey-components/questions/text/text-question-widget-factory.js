(function() {
    'use strict';

    angular
        .module('survey.questions')
        .factory('TextQuestionWidgetFactory', TextQuestionWidgetFactory);

    TextQuestionWidgetFactory.$inject = ['$compile', '$templateRequest', '$templateCache'];

    function TextQuestionWidgetFactory($compile, $templateRequest, $templateCache) {
        var self = this;
        self.TEMPLATE_URL = 'shared/survey-components/questions/text/text-question-template.html';

        /* Public interface */
        self.create = create;

        function create(model) {
            return new TextQuestionWidget(model);
        }

        return self;
    }

    function TextQuestionWidget(model) {
        var self = this;

        Object.defineProperty(this, 'type', {
            value: model.objectType,
            writable: false
        });
    }

}());
