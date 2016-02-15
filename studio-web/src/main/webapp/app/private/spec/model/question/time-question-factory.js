(function() {
    'use strict';

    angular
        .module('spec')
        .factory('TimeQuestionFactory', TimeQuestionFactory);

    TimeQuestionFactory.$inject = ['LabelFactory'];

    function TimeQuestionFactory(LabelFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid) {
            return new TimeQuestion(oid, LabelFactory);
        }

        return self;
    }

    function TimeQuestion(oid, LabelFactory) {
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: 'Question',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'TimeQuestion',
            writable: false
        });

        Object.defineProperty(this, 'dataType', {
            value: 'LocalTime',
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
