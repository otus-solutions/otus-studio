(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('CalendarQuestionFactory', CalendarQuestionFactory);
    
    CalendarQuestionFactory.$inject = ['MetadataGroupFactory'];

    function CalendarQuestionFactory(MetadataGroupFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid, prototype) {
            return new CalendarQuestion(oid, prototype, MetadataGroupFactory);
        }

        return self;
    }

    function CalendarQuestion(oid, prototype, MetadataGroupFactory) {
        Object.defineProperty(this, 'extends', {
            value: prototype.objectType,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'objectType', {
            value: 'CalendarQuestion',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'oid', {
            value: prototype.oid,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'dataType', {
            value: 'LocalDate',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'label', {
            value: prototype.label,
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
