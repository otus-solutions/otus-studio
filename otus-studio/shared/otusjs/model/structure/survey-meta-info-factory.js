(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SurveyMetaInfoFactory', SurveyMetaInfoFactory);

    function SurveyMetaInfoFactory() {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create() {
            var otusStudioVersion = "${project.version}";
            var now = new Date(Date.now());
            return new SurveyMetaInfo(now, otusStudioVersion);
        }

        return self;
    }

    function SurveyMetaInfo(creationDatetime, otusStudioVersion) {
        Object.defineProperty(this, 'extends', {
            value: 'StudioObject',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'objectType', {
            value: 'SurveyMetaInfo',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'creationDatetime', {
            value: creationDatetime,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'otusStudioVersion', {
            value: otusStudioVersion,
            writable: false,
            enumerable: true
        });
    }

}());
