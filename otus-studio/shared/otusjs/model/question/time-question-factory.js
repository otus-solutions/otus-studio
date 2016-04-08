(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('TimeQuestionFactory', TimeQuestionFactory);

    TimeQuestionFactory.$inject = ['UnitFactory', 'MetadataGroupFactory'];

    function TimeQuestionFactory(UnitFactory, MetadataGroupFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid, prototype) {
            return new TimeQuestion(oid, prototype, UnitFactory, MetadataGroupFactory);
        }

        return self;
    }

    function TimeQuestion(oid, prototype, UnitFactory, MetadataGroupFactory) {
        Object.defineProperty(this, 'extends', {
            value: prototype.objectType,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'objectType', {
            value: 'TimeQuestion',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'oid', {
            value: prototype.oid,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'dataType', {
            value: 'LocalTime',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'label', {
            value: prototype.label,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'unit', {
            value: {
                'ptBR': UnitFactory.create(),
                'enUS': UnitFactory.create(),
                'esES': UnitFactory.create()
            },
            writable: true,
            enumerable: true
        });
        
        Object.defineProperty(this, 'metadata', {
        	value: MetadataGroupFactory.create(),
        	writable : true, 
        	enumerable : true
        });
    }

}());
