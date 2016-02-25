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

        Object.defineProperty(this, 'name', {
            value: '',
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'acronym', {
            value: '',
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'version', {
            value: '',
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'recommendedTo', {
            value: '',
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'description', {
            value: '',
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'keywords', {
            value: [],
            writable: true,
            enumerable: true
        });
    }

}());
