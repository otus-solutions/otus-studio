(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SurveyFactory', SurveyFactory);

    SurveyFactory.$inject = ['SurveyIdentityFactory'];

    function SurveyFactory(SurveyIdentityFactory) {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create(name, acronym, version) {
            var identity = SurveyIdentityFactory.create();
            identity.name = name;
            identity.acronym = acronym;
            identity.version = version;
            return new Survey(identity);
        }

        return self;
    }

    function Survey(identity) {
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

        Object.defineProperty(this, 'question', {
            value: {},
            writable: false
        });
    }

}());
