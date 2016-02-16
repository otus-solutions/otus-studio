(function() {

    angular
        .module('spec')
        .factory('QuestionFactory', QuestionFactory);

    QuestionFactory.$inject = [
        'CalendarQuestionFactory',
        'NumericQuestionFactory',
        'SingleSelectionQuestionFactory',
        'TextQuestionFactory',
        'TimeQuestionFactory'
    ];

    function QuestionFactory(CalendarQuestionFactory, NumericQuestionFactory, SingleSelectionQuestionFactory, TextQuestionFactory, TimeQuestionFactory) {
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
            return factoryMap[questionType].create(oid);
        }

        return self;
    }

}());
