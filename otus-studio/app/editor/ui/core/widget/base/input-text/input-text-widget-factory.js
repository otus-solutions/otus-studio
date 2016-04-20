(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusInputTextWidgetFactory', OtusInputTextWidgetFactory);

    OtusInputTextWidgetFactory.$inject = [
        'UUID',
        'EventService',
        'EditingSourceService'
    ];

    function OtusInputTextWidgetFactory(UUID, EventService, EditingSourceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(data) {
            data.scope.widget = new OtusInputTextWidget(data, UUID.generateUUID(), EventService, EditingSourceService);
            return data.scope.widget;
        }

        return self;
    }

    function OtusInputTextWidget(data, guid, EventService, EditingSourceService) {
        var self = this;

        self.name = 'OtusInputText';
        self.guid = guid;
        self.ngModel = '';

        /* User definitions */
        self.label = data.scope.label;
        self.ariaLabel = data.scope.ariaLabel;
        self.leftIcon = data.scope.leftIcon;

        /* Editor engine interface */
        self.esWidget = self.name;
        self.esGuid = self.guid;
        self.esType = 'input-text';
        self.esTarget = '';
        self.editingSource = EditingSourceService.createEditingSource(self);

        data.element.on('change', function() {
            console.log(self.ngModel);
            EventService.performEvent(self.editingSource);
        });

        // self.events = {
        //     change: function onBlur() {
        //         EventService.performEvent(self.editingSource);
        //     }
        // };
    }

}());
