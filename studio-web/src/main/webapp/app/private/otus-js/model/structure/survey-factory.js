(function() {
    'use strict';

    angular
        .module('otusjs')
        .factory('SurveyFactory', SurveyFactory);

    SurveyFactory.$inject = ['SurveyIdentityFactory'];

    function SurveyFactory(SurveyIdentityFactory) {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create() {
            return new Survey(SurveyIdentityFactory);
        }

        return self;
    }

    function Survey(SurveyIdentityFactory) {
        Object.defineProperty(this, 'extends', {
            value: 'StudioObject',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'Survey',
            writable: false
        });

        Object.defineProperty(this, 'identity', {
            value: SurveyIdentityFactory.create(),
            writable: false
        });

        Object.defineProperty(this, 'question', {
            value: {},
            writable: false
        });
    }

}());
