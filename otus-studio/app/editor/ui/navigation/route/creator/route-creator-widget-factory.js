(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RouteCreatorWidgetFactory', RouteCreatorWidgetFactory);

    RouteCreatorWidgetFactory.$inject = ['UUID'];

    function RouteCreatorWidgetFactory(UUID) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(navigation, element) {
            return new RouteCreatorWidget(navigation, element, UUID);
        }

        return self;
    }

    function RouteCreatorWidget(navigation, element, UUID) {
        var values = {
            '$1': navigation.index,
            '$2': navigation.routes.length
        };

        var processorGuid = UUID.generateUUID();
        var ES_TYPE = 'pre-input-text';
        var ES_PROCESSOR_TYPE = 'pre-add-button';
        var NAME_TARGET = 'survey.navigations[$1].routes[$2].name';
        var DESTINATION_TARGET = 'survey.navigations[$1].routes[$2].to';
        var NAVIGATIONS_TARGET = 'survey.navigations';

        var self = this;

        self.type = 'RouteCreator';

        self.name = {
            type: ES_TYPE,
            guid: UUID.generateUUID(),
            processorGuid: processorGuid,
            target: applyValues(NAME_TARGET, values),
            value: ''
        };

        self.destination = {
            type: ES_TYPE,
            guid: UUID.generateUUID(),
            processorGuid: processorGuid,
            target: applyValues(DESTINATION_TARGET, values),
            value: ''
        };

        self.processor = {
            type: ES_PROCESSOR_TYPE,
            guid: processorGuid,
            target: NAVIGATIONS_TARGET
        };

        function applyValues(string, values) {
            Object.keys(values).forEach(function(key) {
                string = string.replace(key, values[key]);
            });

            return string;
        }
    }

}());
