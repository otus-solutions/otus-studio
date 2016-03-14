(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('TimeQuestionFactory', TimeQuestionFactory);

    TimeQuestionFactory.$inject = ['UnitFactory'];

    function TimeQuestionFactory(UnitFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid, prototype) {
            return new TimeQuestion(oid, prototype, UnitFactory);
        }

        return self;
    }

    function TimeQuestion(oid, prototype, UnitFactory) {
        Object.defineProperty(this, 'extends', {
            value: prototype.objectType,
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'TimeQuestion',
            writable: false
        });

        Object.defineProperty(this, 'oid', {
            value: prototype.oid,
            writable: false
        });

        Object.defineProperty(this, 'dataType', {
            value: 'LocalTime',
            writable: false
        });

        Object.defineProperty(this, 'label', {
            value: prototype.label,
            writable: true
        });

        Object.defineProperty(this, 'unit', {
            value: {
                'ptBR': UnitFactory.create(),
                'enUS': UnitFactory.create(),
                'esES': UnitFactory.create()
            },
            writable: true
        });
    }

}());
