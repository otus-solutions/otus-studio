(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SingleSelectionQuestionFactory', SingleSelectionQuestionFactory);

    SingleSelectionQuestionFactory.$inject = ['AnswerOptionFactory', 'MetadataGroupFactory'];

    function SingleSelectionQuestionFactory(AnswerOptionFactory, MetadataGroupFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid, prototype) {
            return new SingleSelectionQuestion(oid, prototype, AnswerOptionFactory, MetadataGroupFactory);
        }

        return self;
    }

    function SingleSelectionQuestion(oid, prototype, AnswerOptionFactory, MetadataGroupFactory) {
        Object.defineProperty(this, 'extends', {
            value: prototype.objectType,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'objectType', {
            value: 'SingleSelectionQuestion',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'oid', {
            value: prototype.oid,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'dataType', {
            value: 'Integer',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'label', {
            value: prototype.label,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'option', {
            value: {},
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
