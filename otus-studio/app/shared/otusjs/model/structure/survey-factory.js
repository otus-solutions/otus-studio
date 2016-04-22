(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SurveyFactory', SurveyFactory);

    SurveyFactory.$inject = [
        'SurveyIdentityFactory',
        'SurveyMetaInfoFactory',
        'SurveyUUIDGenerator'
    ];

    function SurveyFactory(SurveyIdentityFactory, SurveyMetaInfoFactory, SurveyUUIDGenerator) {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create(name, acronym) {
            var metainfo = SurveyMetaInfoFactory.create();
            var identity = SurveyIdentityFactory.create(name, acronym);

            return new Survey(metainfo, identity, SurveyUUIDGenerator.generateSurveyUUID());
        }

        return self;
    }

    function Survey(surveyMetainfo, surveyIdentity, uuid) {

        var self = this;

        self.extents = 'StudioObject';
        self.objectType = 'Survey';
        self.oid = uuid;
        self.identity = surveyIdentity;
        self.metainfo = surveyMetainfo;
        self.questionContainer = {};
        self.navigationList = [];

        self.questionsCount = questionsCount;
        self.addNavigation = addNavigation;
        self.removeNavigation = removeNavigation;
        self.listNavigations = listNavigations;
        self.listNavigation = listNavigation;
        self.listNavigationByIndex = listNavigationByIndex;
        self.toJson = toJson;

        function questionsCount() {
            var propertyList = Object.keys(self.questionContainer).filter(function filterOnlyFields(property) {
                return ((typeof property) != 'function');
            });
            return propertyList.length;
        }

        function listNavigations() {
            var clone = [];

            self.navigationList.forEach(function(navigation) {
                clone.push(navigation);
            });

            return clone;
        }

        function listNavigation(criteria) {
            return fetchByOrigin(criteria);
        }

        function listNavigationByIndex(index) {
            return fetchByIndex(index);
        }

        function addNavigation(navigation) {
            navigation.index = self.navigationList.length;
            self.navigationList.push(navigation);
        }

        function removeNavigation(origin) {
            var navigationToRemove = fetchByOrigin(origin);

            var indexToRemove = self.navigationList.indexOf(navigationToRemove);
            if (indexToRemove > -1) self.navigationList.splice(indexToRemove, 1);
        }

        function fetchByOrigin(origin) {
            var filteredNavigation = self.navigationList.filter(function(navigation) {
                return navigation.origin === origin;
            });

            return filteredNavigation[0];
        }

        function fetchByIndex(index) {
            var filteredNavigation = self.navigationList.filter(function(navigation) {
                return navigation.index === index;
            });

            return filteredNavigation[0];
        }

        function toJson() {
            var json = {};

            json.extents = self.extents;
            json.objectType = self.objectType;
            json.oid = self.oid;
            json.identity = self.identity.toJson();
            json.metainfo = self.metainfo.toJson();
            json.questionContainer = {};
            for (var question in self.questionContainer) {
                json.questionContainer[question] = self.questionContainer[question].toJson();
            }
            json.navigationList = [];
            self.navigationList.forEach(function(navigation) {
                json.navigationList.push(navigation.toJson());
            });

            return JSON.stringify(json).replace(/"{/g, '{').replace(/\}"/g, '}').replace(/\\/g, '');
        }
    }

}());
