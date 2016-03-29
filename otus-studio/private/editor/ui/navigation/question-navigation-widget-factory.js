
(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('QuestionNavigationWidgetFactory', QuestionNavigationWidgetFactory);

    function QuestionNavigationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new QuestionNavigationWidget();
        }

        return self;
    }

    function QuestionNavigationWidget() {
    }

}());
