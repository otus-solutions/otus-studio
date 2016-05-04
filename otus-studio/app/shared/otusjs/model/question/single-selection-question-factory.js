(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('SingleSelectionQuestionFactory', SingleSelectionQuestionFactory);

    SingleSelectionQuestionFactory.$inject = ['AnswerOptionFactory'];

    function SingleSelectionQuestionFactory(AnswerOptionFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(templateID, prototype) {
            return new SingleSelectionQuestion(templateID, prototype, AnswerOptionFactory);
        }

        return self;
    }

    function SingleSelectionQuestion(templateID, prototype, AnswerOptionFactory) {
        var self = this;

        self.extents = prototype.objectType;
        self.objectType = 'SingleSelectionQuestion';
        self.templateID = templateID;
        self.dataType = 'Integer';
        self.label = prototype.label;
        self.option = [];
        self.metadata = prototype.metadata;

        self.addOption = addOption;
        self.removeLastOption = removeLastOption;
        self.toJson = toJson;

        function addOption(option) {
            self.option.push(option);
        }

        function removeLastOption() {
            self.option.splice(-1);
        }

        function toJson() {
            var json = {};

            json.extents = self.extents;
            json.objectType = self.objectType;
            json.templateID = self.templateID;
            json.dataType = self.dataType;
            json.label = self.label;
            json.option = self.option;
            json.metadata = self.metadata;

            return JSON.stringify(json).replace(/"{/g, '{').replace(/\}"/g, '}').replace(/\\/g, '');
        }
    }

}());
