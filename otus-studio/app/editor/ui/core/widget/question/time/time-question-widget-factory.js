(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('TimeQuestionWidgetFactory', TimeQuestionWidgetFactory);

    function TimeQuestionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(widget) {
            return new TimeQuestionWidget(widget);
        }

        return self;
    }

    function TimeQuestionWidget(widget) {
        var self = this;

        self.widget = widget;
        self.template = '<time-question></time-question>';
    }

}());
