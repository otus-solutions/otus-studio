(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SingleSelectionQuestionFactory', SingleSelectionQuestionFactory);

    SingleSelectionQuestionFactory.$inject = ['AnswerOptionFactory'];

    function SingleSelectionQuestionFactory(AnswerOptionFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid, prototype) {
            return new SingleSelectionQuestion(oid, prototype, AnswerOptionFactory);
        }

        return self;
    }

    function SingleSelectionQuestion(oid, prototype, AnswerOptionFactory) {
        Object.defineProperty(this, 'extends', {
            value: prototype.objectType,
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'SingleSelectionQuestion',
            writable: false
        });

        Object.defineProperty(this, 'oid', {
            value: prototype.oid,
            writable: false
        });

        Object.defineProperty(this, 'dataType', {
            value: 'Integer',
            writable: false
        });

        Object.defineProperty(this, 'label', {
            value: prototype.label,
            writable: true
        });

        Object.defineProperty(this, 'option', {
            value: {},
            writable: true
        });
    }

}());
