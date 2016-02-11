(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .service('SurveyEditorService', SurveyEditorService);

    SurveyEditorService.$inject = ['SurveyLoaderService', 'EditorEngineService', 'TextQuestionFactory'];

    function SurveyEditorService(SurveyLoaderService, EditorEngineService, TextQuestionFactory) {
        var self = this,
            currentSurvey = null;
            self.currentQuestionList = [];

        /* Public interface */
        self.initializeNewSurvey = initializeNewSurvey;
        self.addQuestion = addQuestion;

        function initializeNewSurvey() {
            currentSurvey = SurveyLoaderService.newSurvey();
            EditorEngineService.init(currentSurvey);
            EditorEngineService.open();
            self.currentQuestionList = [];
            console.info('New survey initialized.');
        }

        function closeSurvey() {
            EditorEngineService.close();
            console.info('Current survey closed.');
        }

        function saveSurvey() {
            EditorEngineService.save();
            console.info('Current survey saved.');
        }

        function loadSurvey() {
            // A persisted survey object should be load here.
            // var survey = SurveyLoader.loadSurvey();
            // initializeEditing(survey);
            console.info('Survey loaded.');
        }

        function getCurrentSurvey() {
            return EditorEngineService.getSurvey();
        }

        function addQuestion(type) {
            self.currentQuestionList.push(TextQuestionFactory.create());
            console.info(type + ' question added.');
            console.log(self.currentQuestionList);
        }
    }

}());
