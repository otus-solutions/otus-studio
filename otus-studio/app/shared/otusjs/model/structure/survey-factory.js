(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SurveyFactory', SurveyFactory);

    SurveyFactory.$inject = [
        'SurveyIdentityFactory',
        'SurveyMetaInfoFactory',
        'SurveyUUIDGenerator',
        'NavigationManagerService'
    ];

    function SurveyFactory(SurveyIdentityFactory, SurveyMetaInfoFactory, SurveyUUIDGenerator, NavigationManagerService) {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create(name, acronym) {
            var metainfo = SurveyMetaInfoFactory.create();
            var identity = SurveyIdentityFactory.create(name, acronym);

            return new Survey(metainfo, identity, SurveyUUIDGenerator.generateSurveyUUID(), NavigationManagerService);
        }

        return self;
    }

    function Survey(surveyMetainfo, surveyIdentity, uuid, NavigationManagerService) {
        var self = this;

        self.extents = 'StudioObject';
        self.objectType = 'Survey';
        self.oid = uuid;
        self.identity = surveyIdentity;
        self.metainfo = surveyMetainfo;
        self.questionContainer = [];
        self.NavigationManager = NavigationManagerService;

        self.NavigationManager.init();

        /* Public methods */
        self.addQuestion = addQuestion;
        self.questionsCount = questionsCount;
        self.removeQuestion = removeQuestion;
        self.updateQuestion = updateQuestion;
        self.fetchQuestionById = fetchQuestionById;
        self.toJson = toJson;

        /* Question container methods */
        function questionsCount() {
            var propertyList = Object.keys(self.questionContainer).filter(function filterOnlyFields(property) {
                return ((typeof property) != 'function');
            });
            return propertyList.length;
        }

        function addQuestion(question) {
            self.questionContainer.push(question);
            self.NavigationManager.addNavigation(self.questionContainer);
        }

        function removeQuestion(templateID) {
            var questionToRemove = self.questionContainer.filter(function(question) {
                return question.templateID === templateID;
            });

            var indexToRemove = self.questionContainer.indexOf(questionToRemove[0]);
            if (indexToRemove > -1) self.questionContainer.splice(indexToRemove, 1);

            self.NavigationManager.removeNavigation(questionToRemove[0].templateID);
        }

        function updateQuestion(question) {
            self.navigationList[question.templateID] = question;
        }

        function fetchQuestionById(templateID) {
            var fetch = self.questionContainer.filter(function(question) {
                return question.templateID === templateID;
            });

            return fetch[0];
        }

        function toJson() {
            var json = {};

            json.extents = self.extents;
            json.objectType = self.objectType;
            json.oid = self.oid;
            json.identity = self.identity.toJson();
            json.metainfo = self.metainfo.toJson();
            json.questionContainer = [];
            for (var question in self.questionContainer) {
                json.questionContainer.push(self.questionContainer[question].toJson());
            }
            json.navigationList = [];
            NavigationManagerService.getNavigationList().forEach(function(navigation) {
                json.navigationList.push(navigation.toJson());
            });

            return JSON.stringify(json).replace(/"{/g, '{').replace(/\}"/g, '}').replace(/\\/g, '').replace(/ ":/g, '":');
        }
    }

}());
