(function() {
    'use strict';

    angular
        .module('protocolSpecification')
        .factory('SurveyIdentityFactory', SurveyIdentityFactory);

    function SurveyIdentityFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new SurveyIdentity();
        }

        return self;
    }

    function SurveyIdentity() {
        this.objectType = 'SurveyIdentity';
        this.name = '';
        this.acronym = '';
        this.version = '';
        this.recommendedTo = '';
        this.description = '';
        this.keywords = [];
    }

}());
