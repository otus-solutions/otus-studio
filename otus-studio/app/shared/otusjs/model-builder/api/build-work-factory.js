(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('BuildWorkFactory', BuildWorkFactory);

    BuildWorkFactory.$inject = [
        'WorkspaceService',
        'QuestionFactory'
    ];

    function BuildWorkFactory(WorkspaceService, QuestionFactory) {
        var self = this;

        /* Public interface */
        self.create = create;
        self.createAddQuestionWork = createAddQuestionWork;

        function create() {
            return new BuildWork();
        }

        function createAddQuestionWork() {
            return new AddQuestionWork(WorkspaceService.workspace.project.survey, QuestionFactory);
        }

        return self;
    }

    function BuildWork() {
        Object.defineProperty(this, 'survey', {
            value: null,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'data', {
            value: null,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'type', {
            value: null,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'id', {
            value: null,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'target', {
            value: null,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'model', {
            value: null,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'context', {
            value: null,
            writable: true,
            enumerable: true
        });
    }

    function AddQuestionWork(survey, QuestionFactory) {
        var self = this;

        self.survey = survey;
        self.questionType = null;
        self.questionID = null;

        self.execute = execute;

        function execute(data) {
            var newQuestion = QuestionFactory.create(data.ngModel, survey.identity.acronym + survey.questionsCount());
            self.survey.addQuestion(newQuestion);
            return newQuestion;
        }
    }

}());
