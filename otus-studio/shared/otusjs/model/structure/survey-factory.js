(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SurveyFactory', SurveyFactory);

    SurveyFactory.$inject = [
        'SurveyIdentityFactory',
        'SurveyMetaInfoFactory',
        'UUID'
    ];

    function SurveyFactory(SurveyIdentityFactory, SurveyMetaInfoFactory, UUID) {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create(name, acronym, version) {
            var metainfo = SurveyMetaInfoFactory.create(),
                identity = SurveyIdentityFactory.create(name, acronym, version);

            return new Survey(metainfo, identity, UUID.generateUUID());
        }

        return self;
    }

    function Survey(metainfo, identity, uuid) {
        var self = this;

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

        function questionsCount() {
            var propertyList = Object.keys(self.question).filter(function filterOnlyFields(property) {
                return ((typeof property) != 'function');
            });
            return propertyList.length;
        }
    }

}());
