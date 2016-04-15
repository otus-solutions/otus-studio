(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('MetadataAnswerFactory', MetadataAnswerFactory);

    MetadataAnswerFactory.$inject = ['LabelFactory'];

    function MetadataAnswerFactory(LabelFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(value, parentQuestionID) {
            return new MetadataAnswer(value, parentQuestionID, LabelFactory);
        }

        return self;
    }

    function MetadataAnswer(value, parentQuestionID, LabelFactory) {
        var self = this;

        self.extends = 'StudioObject';
        self.objectType = 'MetadataAnswer';
        self.value = value;
        self.parentQuestionID = parentQuestionID;
        self.dataType = 'Integer';
        self.label = {
            'ptBR': LabelFactory.create(),
            'enUS': LabelFactory.create(),
            'esES': LabelFactory.create()
        };
    }

}());
