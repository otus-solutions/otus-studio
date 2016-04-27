(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusTextEditorWidgetFactory', OtusTextEditorWidgetFactory);

    OtusTextEditorWidgetFactory.$inject = [
        'UUID',
        'UpdateQuestionEventFactory'
    ];

    function OtusTextEditorWidgetFactory(UUID, UpdateQuestionEventFactory) {
        var self = this;

        self.create = create;

        function create(bind) {
            bind.scope.widget = new OtusTextEditorWidget(bind, UUID.generateUUID(), UpdateQuestionEventFactory);
            return bind.scope.widget;
        }

        return self;
    }

    function OtusTextEditorWidget(bind, guid, UpdateQuestionEventFactory) {
        var self = this;

        /* Type definitions */
        self.name = 'OtusTextEditor';

        /* Instance definitions */
        self.guid = guid;
        self.ngModel = bind.scope.ngModel;

        /* User definitions */
        self.placeholder = bind.scope.placeholder;

        bind.element.on('focusout', function(event) {
            self.ngModel.ptBR.formattedText = event.target.innerHTML;
            self.ngModel.ptBR.plainText = event.target.innerText;
            UpdateQuestionEventFactory.create().execute(self);
        });
    }

}());
