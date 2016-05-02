(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusRemoveButtonWidgetFactory', OtusRemoveButtonWidgetFactory);

    OtusRemoveButtonWidgetFactory.$inject = [
        'UUID',
        'RemoveMetadataOptionEventFactory',
        'RemoveAnswerOptionEventFactory',
        'RemoveRouteEventFactory'
    ];

    function OtusRemoveButtonWidgetFactory(UUID, RemoveMetadataOptionEventFactory, RemoveAnswerOptionEventFactory, RemoveRouteEventFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateData, element, model, parentWidget) {
            return new OtusRemoveButtonWidget(templateData, element, model, parentWidget, UUID.generateUUID(), RemoveMetadataOptionEventFactory, RemoveAnswerOptionEventFactory, RemoveRouteEventFactory);
        }

        return self;
    }

    function OtusRemoveButtonWidget(templateData, element, model, parentWidget, guid, RemoveMetadataOptionEventFactory, RemoveAnswerOptionEventFactory, RemoveRouteEventFactory) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusRemoveButton';
        self.parentWidget = parentWidget;

        /* Instance definitions */
        self.guid = guid;
        self.ngModel = templateData.ngModel;
        self.context = parentWidget.question;

        /* User definitions */
        self.iconButton = (templateData.iconButton !== undefined) ? 'md-icon-button' : '';
        self.icon = templateData.icon;
        self.label = templateData.label;
        self.tooltip = templateData.tooltip || self.label;
        self.ariaLabel = templateData.ariaLabel || self.label;
        self.model = model;

        /* CSS definitions */
        self.css = {};
        self.css.class = templateData.class;

        element.on('click', function() {
            if (self.ngModel.includes('MetadataOption')) {
                RemoveMetadataOptionEventFactory.create().execute(self);
            } else if (self.ngModel.includes('AnswerOption')) {
                RemoveAnswerOptionEventFactory.create().execute(self);
            } else if (self.ngModel.includes('Route')) {
                RemoveRouteEventFactory.create().execute(self);
            }
        });
    }

}());
