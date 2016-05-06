(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('EmailQuestionFactory', EmailQuestionFactory);

    function EmailQuestionFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateID, prototype) {
            return new EmailQuestion(templateID, prototype);
        }

        return self;
    }

    function EmailQuestion(templateID, prototype) {
        var self = this;

        self.extents = prototype.objectType;
        self.objectType = 'EmailQuestion';
        self.templateID = templateID;
        self.dataType = 'String';
        self.label = prototype.label;
        self.metadata = prototype.metadata;

        self.toJson = toJson;

        function toJson() {
            var json = {};

            json.extents = self.extents;
            json.objectType = self.objectType;
            json.templateID = self.templateID;
            json.dataType = self.dataType;
            json.label = self.label;
            json.metadata = self.metadata;

            return JSON.stringify(json).replace(/"{/g, '{').replace(/\}"/g, '}').replace(/\\/g, '');
        }
    }

}());
