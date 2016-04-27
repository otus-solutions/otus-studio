(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('TimeQuestionWidgetFactory', TimeQuestionWidgetFactory);

    function TimeQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget) {
            return new TimeQuestionWidget(parentWidget);
        }

        return self;
    }

    function TimeQuestionWidget(parentWidget) {
        var self = this;

        self.name = 'TimeQuestion';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.template = '<time-question></time-question>';
    }

}());
