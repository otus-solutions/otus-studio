(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('TextQuestionFactory', TextQuestionFactory);
    
    TextQuestionFactory.$inject = ['MetadataGroupFactory'];

    function TextQuestionFactory(MetadataGroupFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid, prototype) {
            return new TextQuestion(oid, prototype, MetadataGroupFactory);
        }

        return self;
    }

    function TextQuestion(oid, prototype, MetadataGroupFactory) {
        Object.defineProperty(this, 'extends', {
            value: prototype.objectType,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'objectType', {
            value: 'TextQuestion',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'oid', {
            value: prototype.oid,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'dataType', {
            value: 'String',
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
