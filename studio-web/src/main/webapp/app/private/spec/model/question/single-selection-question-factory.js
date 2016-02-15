(function() {
    'use strict';

    angular
        .module('spec')
        .factory('SingleSelectionQuestionFactory', SingleSelectionQuestionFactory);

    SingleSelectionQuestionFactory.$inject = ['LabelFactory'];

    function SingleSelectionQuestionFactory(LabelFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid) {
            return new SingleSelectionQuestion(oid, LabelFactory);
        }

        return self;
    }

    function SingleSelectionQuestion(oid, LabelFactory) {
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: 'Question',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'SingleSelectionQuestion',
            writable: false
        });

        Object.defineProperty(this, 'dataType', {
            value: 'Integer',
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
