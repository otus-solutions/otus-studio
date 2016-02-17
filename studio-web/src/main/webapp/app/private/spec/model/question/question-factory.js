(function() {

    angular
        .module('spec')
        .factory('QuestionFactory', QuestionFactory);

    QuestionFactory.$inject = [
        'CalendarQuestionFactory',
        'NumericQuestionFactory',
        'SingleSelectionQuestionFactory',
        'TextQuestionFactory',
        'TimeQuestionFactory',
        'LabelFactory'
    ];

    function QuestionFactory(CalendarQuestionFactory, NumericQuestionFactory, SingleSelectionQuestionFactory, TextQuestionFactory, TimeQuestionFactory, LabelFactory) {
        var self = this,

            factoryMap = {
                'calendar-question': CalendarQuestionFactory,
                'numeric-question': NumericQuestionFactory,
                'single-selection-question': SingleSelectionQuestionFactory,
                'text-question': TextQuestionFactory,
                'time-question': TimeQuestionFactory,
            };

        /* Public interface */
        self.create = create;

        function create(questionType, oid) {
            var question = new Question(oid, LabelFactory);
            return factoryMap[questionType].create(oid, question);
        }

        return self;
    }

    function Question(oid, LabelFactory) {
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: 'StudioObject',
            writable: true
        });

        Object.defineProperty(this, 'objectType', {
            value: 'Question',
            writable: true
        });

        Object.defineProperty(this, 'oid', {
            value: oid,
            writable: true
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
