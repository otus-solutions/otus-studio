(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SurveyFactory', SurveyFactory);

    SurveyFactory.$inject = [
        'SurveyIdentityFactory',
        'SurveyMetaInfoFactory',
        'SurveyUUIDGenerator',
        'JsonClonerService'
    ];

    function SurveyFactory(SurveyIdentityFactory, SurveyMetaInfoFactory, SurveyUUIDGenerator, JsonClonerService) {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create(name, acronym) {
            var metainfo = SurveyMetaInfoFactory.create(),
                identity = SurveyIdentityFactory.create(name, acronym);

            return new Survey(metainfo, identity, SurveyUUIDGenerator.generateSurveyUUID());
        }

        return self;
    }

    function Survey(surveyMetainfo, surveyIdentity, uuid) {

        var self = this;
        var extents;
        var objectType;
        var oid;
        var identity;
        var metainfo;
        var questionContainer;
        var navigationList = [];

        init();

        /*Public interface*/
        self.getExtents = getExtents;
        self.getObjectType = getObjectType;
        self.getOID = getOID;
        self.getIdentity = getIdentity;
        self.getMetaInfo = getMetaInfo;
        self.getQuestionContainer = getQuestionContainer;
        self.questionsCount = questionsCount;
        self.addNavigation = addNavigation;
        self.removeNavigation = removeNavigation;
        self.listNavigations = listNavigations;
        self.listNavigation = listNavigation;

        function init() {
            extents = 'StudioObject';
            objectType = 'Survey';
            oid = uuid;
            identity = surveyIdentity;
            metainfo = surveyMetainfo;
            questionContainer = {};
            navigationList = [];
        }

        function getExtents() {
            return extents;
        }

        function getObjectType() {
            return objectType;
        }

        function getOID() {
            return oid;
        }

        function getIdentity() {
            return identity;
        }

        function getMetaInfo() {
            return metainfo;
        }

        function getQuestionContainer() {
            return questionContainer;
        }

        function questionsCount() {
            var propertyList = Object.keys(self.question).filter(function filterOnlyFields(property) {
                return ((typeof property) != 'function');
            });
            return propertyList.length;
        }

        function listNavigations() {
            return navigationList;
        }

        function listNavigation(origin) {
            return fetchByOrigin(origin);
        }

        function addNavigation(navigation) {
            navigation.setIndex(navigationList.length);
            navigationList.push(navigation);
        }

        function removeNavigation(origin) {
            var navigationToRemove = fetchByOrigin(origin);

            var indexToRemove = navigationList.indexOf(navigationToRemove);
            if (indexToRemove > -1) navigationList.splice(indexToRemove, 1);
        }

        function fetchByOrigin(origin) {
            var filteredNavigation = navigationList.filter(function(navigation) {
                return navigation.getOrigin() === origin;
            });

            return filteredNavigation[0];
        }

        function toJson() {
            return JsonClonerService.clone(self);
        }
    }

}());
