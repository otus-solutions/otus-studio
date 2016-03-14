(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('CalendarQuestionFactory', CalendarQuestionFactory);

    function CalendarQuestionFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid, prototype) {
            return new CalendarQuestion(oid, prototype);
        }

        return self;
    }

    function CalendarQuestion(oid, prototype) {
        Object.defineProperty(this, 'extends', {
            value: prototype.objectType,
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'CalendarQuestion',
            writable: false
        });

        Object.defineProperty(this, 'oid', {
            value: prototype.oid,
            writable: false
        });

        Object.defineProperty(this, 'dataType', {
            value: 'LocalDate',
            writable: false
        });

        Object.defineProperty(this, 'label', {
            value: prototype.label,
            writable: true
        });
    }

}());
