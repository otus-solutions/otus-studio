(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MetadataAnswerOptionWidgetFactory', MetadataAnswerOptionWidgetFactory);

    function MetadataAnswerOptionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(model) {
            return new MetadataAnswerOptionWidget(model);
        }

        return self;
    }

    function MetadataAnswerOptionWidget(model) {
        Object.defineProperty(this, 'model', {
            value: model,
            writable: false
        });

        Object.defineProperty(this, 'id', {
            value: model.oid,
            writable: false
        });

        Object.defineProperty(this, 'esId', {
            value: 'metadata-' + model.parentQuestionID + '-option-' + model.value,
            writable: false
        });

        Object.defineProperty(this, 'esTarget', {
            value: 'survey.question.' + model.parentQuestionID + '.metadata.option.' + model.value,
            writable: false
        });

        Object.defineProperty(this, 'addButtonTarget', {
            value: 'survey.question.' + model.parentQuestionID + '.metadata.option.',
            writable: false
        });

        Object.defineProperty(this, 'removeButtonTarget', {
            value: 'survey.question.' + model.parentQuestionID + '.metadata.option.' + model.value,
            writable: false
        });
    }

}());
