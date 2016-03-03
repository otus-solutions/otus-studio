(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SurveyIdentityFactory', SurveyIdentityFactory);

    function SurveyIdentityFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(name, acronym, version) {
            return new SurveyIdentity(name, acronym, version);
        }

        return self;
    }

    function SurveyIdentity(name, acronym, version) {
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
            value: name,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'acronym', {
            value: acronym,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'version', {
            value: version,
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
