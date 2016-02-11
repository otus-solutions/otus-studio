(function() {
    'use strict';

    angular
        .module('protocolSpecification')
        .factory('LabelFactory', LabelFactory);

    LabelFactory.$inject = ['LabelContentFactory'];

    function LabelFactory(LabelContentFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new Label(LabelContentFactory);
        }

        return self;
    }

    function Label(LabelContentFactory) {
        this.extends = 'StudioObject';
        this.objectType = 'Label';
        this.oid = '';
        this.content = [LabelContentFactory.create()];

        this.getContent = function getContent(index) {
            return this.content[index];
        };
    }

}());
