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

        function create(name, acronym, version) {
            var metainfo = SurveyMetaInfoFactory.create(),
                identity = SurveyIdentityFactory.create(name, acronym, version);

            return new Survey(metainfo, identity, SurveyUUIDGenerator.generateSurveyUUID());
        }

        return self;
    }

    function Survey(metainfo, identity, uuid) {
        Object.defineProperty(this, 'extends', {
            value: 'StudioObject',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'objectType', {
            value: 'Survey',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'oid', {
            value: uuid,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'identity', {
            value: identity,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'metainfo', {
            value: metainfo,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'question', {
            value: {},
            writable: false,
            enumerable: true
        });
    }

}());
