(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SurveyMetaInfoFactory', SurveyMetaInfoFactory);

    SurveyMetaInfoFactory.$inject = ['OIDHashGenerator'];

    function SurveyMetaInfoFactory(OIDHashGenerator) {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create() {
            var now = new Date(Date.now());
            return new SurveyMetaInfo(now, OIDHashGenerator.generateHash(now.toString()));
        }

        return self;
    }

    function SurveyMetaInfo(creationDatetime, oidHash) {
        Object.defineProperty(this, 'extends', {
            value: 'StudioObject',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'SurveyMetaInfo',
            writable: false
        });

        Object.defineProperty(this, 'oid', {
            value: oidHash,
            writable: false
        });

        Object.defineProperty(this, 'creationDatetime', {
            value: creationDatetime,
            writable: false
        });
    }

}());
