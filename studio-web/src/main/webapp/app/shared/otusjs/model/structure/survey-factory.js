(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SurveyFactory', SurveyFactory);

    SurveyFactory.$inject = [
        'SurveyIdentityFactory',
        'SurveyMetaInfoFactory'
    ];

    function SurveyFactory(SurveyIdentityFactory, SurveyMetaInfoFactory) {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create(name, acronym, version) {
            var metainfo = SurveyMetaInfoFactory.create(),
                identity = SurveyIdentityFactory.create(name, acronym, version);

            return new Survey(metainfo, identity);
        }

        return self;
    }

    function Survey(metainfo, identity) {
        Object.defineProperty(this, 'extends', {
            value: 'StudioObject',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'Survey',
            writable: false
        });

        Object.defineProperty(this, 'identity', {
            value: identity,
            writable: false
        });

        Object.defineProperty(this, 'metainfo', {
            value: metainfo,
            writable: false
        });

        Object.defineProperty(this, 'question', {
            value: {},
            writable: false
        });
    }

}());
