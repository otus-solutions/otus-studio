(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('QuestionFactory', QuestionFactory);

    QuestionFactory.$inject = [
        'CalendarQuestionFactory',
        'NumericQuestionFactory',
        'SingleSelectionQuestionFactory',
        'TextQuestionFactory',
        'TimeQuestionFactory',
        'LabelFactory',
        'MetadataGroupFactory'
    ];

    function QuestionFactory(CalendarQuestionFactory, NumericQuestionFactory, SingleSelectionQuestionFactory, TextQuestionFactory, TimeQuestionFactory, LabelFactory, MetadataGroupFactory) {
        var self = this,

            factoryMap = {
                'calendar-question': CalendarQuestionFactory,
                'numeric-question': NumericQuestionFactory,
                'single-selection-question': SingleSelectionQuestionFactory,
                'text-question': TextQuestionFactory,
                'time-question': TimeQuestionFactory
            };

        /* Public interface */
        self.create = create;

        function create(questionType, oid) {
            var question = new Question(oid, LabelFactory, MetadataGroupFactory);
            return factoryMap[questionType].create(oid, question);
        }

        return self;
    }

    function Question(oid, LabelFactory, MetadataGroupFactory) {
        Object.defineProperty(this, 'extends', {
            value: 'StudioObject',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'objectType', {
            value: 'Question',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'oid', {
            value: oid,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'label', {
            value: {
                'ptBR': LabelFactory.create(),
                'enUS': LabelFactory.create(),
                'esES': LabelFactory.create()
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
