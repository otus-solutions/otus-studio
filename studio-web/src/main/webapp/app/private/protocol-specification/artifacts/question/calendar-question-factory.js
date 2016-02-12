(function() {
    'use strict';

    angular
        .module('protocolSpecification')
        .factory('CalendarQuestionFactory', CalendarQuestionFactory);

    CalendarQuestionFactory.$inject = ['LabelFactory'];

    function CalendarQuestionFactory(LabelFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid) {
            return new CalendarQuestion(oid, LabelFactory);
        }

        return self;
    }

    function CalendarQuestion(oid, LabelFactory) {
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: 'Question',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'CalendarQuestion',
            writable: false
        });

        Object.defineProperty(this, 'dataType', {
            value: 'Date',
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
