(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusRemoveButtonWidgetFactory', OtusRemoveButtonWidgetFactory);

    OtusRemoveButtonWidgetFactory.$inject = [
        'UUID',
        'RemoveMetadataOptionEventFactory'
    ];

    function OtusRemoveButtonWidgetFactory(UUID, RemoveMetadataOptionEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData) {
            templateData.scope.widget = new OtusRemoveButtonWidget(templateData, UUID.generateUUID(), RemoveMetadataOptionEventFactory);
            return templateData.scope.widget;
        }

        return self;
    }

    function OtusRemoveButtonWidget(templateData, guid, RemoveMetadataOptionEventFactory) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusRemoveButton';

        /* Instance definitions */
        self.guid = guid;
        self.ngModel = templateData.scope.ngModel;
        self.context = templateData.context;

        /* User definitions */
        self.label = templateData.scope.label;
        self.ariaLabel = templateData.scope.ariaLabel || self.label;
        self.icon = templateData.scope.icon;

        /* CSS definitions */
        self.css = {};
        self.css.class = templateData.scope.class;

        templateData.element.on('click', function() {
            if (self.ngModel.includes('MetadataOption')) {
                RemoveMetadataOptionEventFactory.create().execute(self);
            }
        });
    }

}());
