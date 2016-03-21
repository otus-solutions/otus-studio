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

        function create(name, acronym) {
            var metainfo = SurveyMetaInfoFactory.create(),
                identity = SurveyIdentityFactory.create(name, acronym);

            return new Survey(metainfo, identity, UUID.generateUUID());
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
