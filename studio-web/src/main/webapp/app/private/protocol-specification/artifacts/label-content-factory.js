(function() {
    'use strict';

    angular
        .module('protocolSpecification')
        .factory('LabelContentFactory', LabelContentFactory);

    function LabelContentFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new LabelContent();
        }

        return self;
    }

    function LabelContent() {
        this.extends = 'StudioObject';
        this.objectType = 'LabelContent';
        this.oid = '';
        this.locale = 'pt_BR';
        this.text = '';
    }

}());
