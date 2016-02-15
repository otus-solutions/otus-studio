(function() {
    'use strict';

    angular
        .module('spec')
        .factory('TextQuestionFactory', TextQuestionFactory);

    TextQuestionFactory.$inject = ['LabelFactory'];

    function TextQuestionFactory(LabelFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid) {
            return new TextQuestion(oid, LabelFactory);
        }

        return self;
    }

    function TextQuestion(oid, LabelFactory) {
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: 'Question',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'TextQuestion',
            writable: false
        });

        Object.defineProperty(this, 'dataType', {
            value: 'String',
            writable: false
        });

        Object.defineProperty(this, 'oid', {
            value: oid,
            writable: false
        });

        Object.defineProperty(this, 'labels', {
            value: [],
            /* LabelFactory.create() */
            writable: false
        });

        /* Public interface */
        self.getLabel = getLabel;

        function getLabel(index) {
            return self.labels[index];
        }
    }

}());
