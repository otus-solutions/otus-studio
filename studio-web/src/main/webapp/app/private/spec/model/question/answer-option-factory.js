(function() {
    'use strict';

    angular
        .module('spec')
        .factory('QuestionAnswerOptionFactory', QuestionAnswerOptionFactory);

    QuestionAnswerOptionFactory.$inject = ['LabelFactory'];

    function QuestionAnswerOptionFactory(LabelFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(oid) {
            return new QuestionAnswerOption(oid, LabelFactory);
        }

        return self;
    }

    function QuestionAnswerOption(oid, LabelFactory) {
        var self = this;

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
