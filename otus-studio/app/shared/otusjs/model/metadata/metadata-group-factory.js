(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('MetadataGroupFactory', MetadataGroupFactory);

    MetadataGroupFactory.$inject = ['MetadataAnswerFactory'];

    function MetadataGroupFactory(MetadataAnswerFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(name, questionOID) {
            return new MetadataGroup(name, questionOID);
        }

        return self;
    }

    function MetadataGroup(name, questionOID) {
        var self = this;

        self.extents = 'StudioObject';
        self.objectType = 'MetadataGroup';
        self.name = name;
        self.parentQuestion = questionOID;
        self.option = [];

        self.addOption = addOption;
        self.removeOption = removeOption;
        self.removeLastOption = removeLastOption;

        function addOption(option) {
            self.option.push(option);
        }

        function removeOption(option) {
            var indexToRemove = 0;

            self.option.forEach(function(o) {
                if (o.value === option.value) return;
                else ++indexToRemove;
            });

            self.option.splice(indexToRemove, 1);
        }

        function removeLastOption() {
            self.option.splice(-1, 1);
        }
    }

}());
