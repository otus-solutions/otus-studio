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
            var otusStudioVersion = '${project.version}';
            var now = Date.now();
            return new SurveyMetaInfo(now, otusStudioVersion);
        }

        return self;
    }

    function SurveyMetaInfo(creationDatetime, otusStudioVersion) {
        var self = this;

        self.extents = 'StudioObject';
        self.objectType = 'SurveyMetaInfo';
        self.creationDatetime = creationDatetime;
        self.otusStudioVersion = otusStudioVersion;

        self.toJson = toJson;

        function toJson() {
            var json = {};

            json.extents = self.extents;
            json.objectType = self.objectType;
            json.creationDatetime = self.creationDatetime;
            json.otusStudioVersion = self.otusStudioVersion;

            return JSON.stringify(json);
        }
    }

}());
