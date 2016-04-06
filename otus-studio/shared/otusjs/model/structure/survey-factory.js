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
            var metainfo = SurveyMetaInfoFactory.create(),
                identity = SurveyIdentityFactory.create(name, acronym);

            return new Survey(metainfo, identity, SurveyUUIDGenerator.generateSurveyUUID());
        }

        return self;
    }

    function Survey(metainfo, identity, uuid) {
        var self = this;
        var navigations = [];

        Object.defineProperty(self, 'extends', {
            value: 'StudioObject',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'objectType', {
            value: 'Survey',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'oid', {
            value: uuid,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'identity', {
            value: identity,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'metainfo', {
            value: metainfo,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'question', {
            value: {},
            writable: false,
            enumerable: true
        });

        /*Public interface*/
        self.questionsCount = questionsCount;
        self.addNavigation = addNavigation;
        self.removeNavigation = removeNavigation;
        self.listNavigations = listNavigations;
        self.listNavigation = listNavigation;

        function questionsCount() {
            var propertyList = Object.keys(self.question).filter(function filterOnlyFields(property) {
                return ((typeof property) != 'function');
            });
            return propertyList.length;
        }

        function listNavigations() {
            return navigations;
        }

        function listNavigation(origin) {
            return fetchByOrigin(origin);
        }

        function addNavigation(navigation) {
            navigation.setIndex(navigations.length);
            navigations.push(navigation);
        }

        function removeNavigation(origin) {
            var navigationToRemove = fetchByOrigin(origin);

            var indexToRemove = navigations.indexOf(navigationToRemove);
            if (indexToRemove > -1) navigations.splice(indexToRemove, 1);
        }

        function fetchByOrigin(origin) {
            var filteredNavigation = navigations.filter(function(navigation) {
                return navigation.getOrigin() === origin;
            });

            return filteredNavigation[0];
        }
    }

}());
