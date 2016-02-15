(function() {
    'use strict';

    angular
        .module('protocolSpecification')
        .factory('NumericQuestionFactory', NumericQuestionFactory);

    NumericQuestionFactory.$inject = ['LabelFactory'];

    function NumericQuestionFactory(LabelFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid) {
            return new NumericQuestion(oid, LabelFactory);
        }

        return self;
    }

    function NumericQuestion(oid, LabelFactory) {
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: 'Question',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'NumericQuestion',
            writable: false
        });

        Object.defineProperty(this, 'dataType', {
            value: 'Double',
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
