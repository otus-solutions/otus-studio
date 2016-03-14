(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('AnswerOptionFactory', AnswerOptionFactory);

    AnswerOptionFactory.$inject = ['LabelFactory'];

    function AnswerOptionFactory(LabelFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid, questionOID) {
            return new QuestionAnswerOption(oid, questionOID, LabelFactory);
        }

        return self;
    }

    function QuestionAnswerOption(oid, questionOID, LabelFactory) {
        Object.defineProperty(this, 'extends', {
            value: 'StudioObject',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'QuestionAnswerOption',
            writable: false
        });

        Object.defineProperty(this, 'oid', {
            value: oid,
            writable: false
        });

        Object.defineProperty(this, 'dataType', {
            value: 'Integer',
            writable: false
        });

        Object.defineProperty(this, 'parentQuestion', {
            value: questionOID,
            writable: false
        });

        Object.defineProperty(this, 'label', {
            value: {
                'ptBR': LabelFactory.create(),
                'enUS': LabelFactory.create(),
                'esES': LabelFactory.create()
            },
            writable: true
        });
    }

}());
