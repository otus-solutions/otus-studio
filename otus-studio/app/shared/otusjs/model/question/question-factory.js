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
        'MetadataGroupFactory',
        'PhoneQuestionFactory'
    ];

    function QuestionFactory(CalendarQuestionFactory, NumericQuestionFactory, SingleSelectionQuestionFactory, TextQuestionFactory, TimeQuestionFactory, LabelFactory, MetadataGroupFactory, PhoneQuestionFactory) {
        var self = this,

            factoryMap = {
                'CalendarQuestion': CalendarQuestionFactory,
                'NumericQuestion': NumericQuestionFactory,
                'SingleSelectionQuestion': SingleSelectionQuestionFactory,
                'TextQuestion': TextQuestionFactory,
                'TimeQuestion': TimeQuestionFactory,
                'PhoneQuestion': PhoneQuestionFactory
            };

        /* Public interface */
        self.create = create;

        function create(questionType, templateID) {
            var question = new Question(templateID, LabelFactory, MetadataGroupFactory);
            return factoryMap[questionType].create(templateID, question);
        }

        return self;
    }

    function Question(templateID, LabelFactory, MetadataGroupFactory) {
        var self = this;

        self.extents = 'StudioObject';
        self.objectType = 'Question';
        self.templateID = templateID;
        self.label = {
            ptBR: LabelFactory.create(),
            enUS: LabelFactory.create(),
            esES: LabelFactory.create()
        };
        self.metadata = MetadataGroupFactory.create();
    }

}());
