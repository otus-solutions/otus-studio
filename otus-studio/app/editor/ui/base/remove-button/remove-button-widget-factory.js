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

        function create(templateData) {
            templateData.scope.widget = new OtusRemoveButtonWidget(templateData, UUID.generateUUID(), RemoveMetadataOptionEventFactory, RemoveAnswerOptionEventFactory, RemoveRouteEventFactory);
            return templateData.scope.widget;
        }

        return self;
    }

    function OtusRemoveButtonWidget(templateData, guid, RemoveMetadataOptionEventFactory, RemoveAnswerOptionEventFactory, RemoveRouteEventFactory) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusRemoveButton';
        self.scope = templateData.scope;
        self.parentWidget = self.scope.$parent.widget || self.scope.$parent.$parent.widget;
        self.context = self.parentWidget.question;

        /* Instance definitions */
        self.guid = guid;
        self.ngModel = templateData.scope.ngModel;

        /* User definitions */
        self.label = templateData.scope.label;
        self.ariaLabel = templateData.scope.ariaLabel || self.label;
        self.icon = templateData.scope.icon;
        self.model = templateData.scope.model;

        /* CSS definitions */
        self.css = {};
        self.css.class = templateData.scope.class;

        templateData.element.on('click', function() {
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
