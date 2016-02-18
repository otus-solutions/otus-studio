(function() {
    'use strict';

    angular
        .module('spec')
        .factory('NumericQuestionFactory', NumericQuestionFactory);

    function NumericQuestionFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid, prototype) {
            return new NumericQuestion(oid, prototype);
        }

        return self;
    }

    function NumericQuestion(oid, prototype) {
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: prototype.objectType,
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'NumericQuestion',
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
