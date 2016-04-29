(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('PhoneQuestionFactory', PhoneQuestionFactory);

    PhoneQuestionFactory.$inject = ['UnitFactory'];

    function PhoneQuestionFactory(UnitFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateID, prototype) {
            return new PhoneQuestion(templateID, prototype, UnitFactory);
        }

        return self;
    }

    function PhoneQuestion(templateID, prototype, UnitFactory) {
        var self = this;

        self.extents = prototype.objectType;
        self.objectType = 'PhoneQuestion';
        self.templateID = templateID;
        self.dataType = 'Integer';
        self.label = prototype.label;
        self.metadata = prototype.metadata;
        self.unit = {
            ptBR: UnitFactory.create(),
            enUS: UnitFactory.create(),
            esES: UnitFactory.create()
        };

        self.toJson = toJson;

        function toJson() {
            var json = {};

            json.extents = self.extents;
            json.objectType = self.objectType;
            json.templateID = self.templateID;
            json.dataType = self.dataType;
            json.label = self.label;
            json.metadata = self.metadata;
            json.unit = self.unit;

            return JSON.stringify(json);
        }
    }

}());
