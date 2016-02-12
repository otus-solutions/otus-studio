(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('WidgetFactory', WidgetFactory);

    WidgetFactory.$inject = ['TextQuestionWidgetFactory'];

    function WidgetFactory(TextQuestionWidgetFactory) {
        var self = this,

            widgetFactories = {
                'TextQuestion': TextQuestionWidgetFactory
            };

        /* Public interface */
        self.create = create;

        function create(model) {
            return widgetFactories[model.objectType].create(model);
        }

        return self;
    }

}());
