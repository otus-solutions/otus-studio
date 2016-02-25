(function() {
    'use strict';

    angular
        .module('otusjs.model')
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
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: 'StudioObject',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'SurveyIdentity',
            writable: false
        });

        Object.defineProperty(this, 'oid', {
            value: '',
            writable: false
        });

        self.name = '';
        self.acronym = '';
        self.version = '';
        self.recommendedTo = '';
        self.description = '';
        self.keywords = [];
    }

}());
