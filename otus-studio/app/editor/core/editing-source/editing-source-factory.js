(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('EditingSourceFactory', EditingSourceFactory);

    function EditingSourceFactory() {
        var self = this;

        /* Public interface */
        self.create = create;
        self.produceEditingSource = produceEditingSource;

        function create(component) {
            return new EditingSource(component);
        }

        /*
         * Creates a simple EditingSource instance
         */
        function produceEditingSource(component, attrs) {
            return new EditingSource(component, attrs);
        }

        return self;
    }

    /* EditingSource model used as factory product */
    function EditingSource(component, attrs) {
        var self = this;

        if (!attrs) attrs = component;

        self.model = attrs.esModel;
        self.type = attrs.esType;
        self.id = attrs.esGuid;
        self.target = attrs.esTarget;
        self.processor = attrs.esProcessor;

        self.component = EditingSource.prototype.getComponent(component);
    }

    EditingSource.prototype.getComponent = function(eventComponent) {
        return eventComponent[0];
    };

}());
