(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .service('WidgetService', WidgetService);

    WidgetService.$inject = ['SurveyComponentsService', 'WidgetFactory'];

    function WidgetService(SurveyComponentsService, WidgetFactory) {
        var self = this;

        /* Public interface */
        self.getWidgetForModel = getWidgetForModel;

        function getWidgetForModel(model) {
            var widget = WidgetFactory.create(model);
            widget.template = SurveyComponentsService.getDirectiveTemplate(model.objectType);
            widget.oid = model.oid;
            return widget;
        }
    }

}());
