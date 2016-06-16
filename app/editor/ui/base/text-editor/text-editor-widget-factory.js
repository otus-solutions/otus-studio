(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusTextEditorWidgetFactory', OtusTextEditorWidgetFactory);

    OtusTextEditorWidgetFactory.$inject = [
        'UpdateQuestionEventFactory'
    ];

    function OtusTextEditorWidgetFactory(UpdateQuestionEventFactory) {
        var self = this;

        self.create = create;

        function create(scope, element) {
            return new OtusTextEditorWidget(scope, element, UpdateQuestionEventFactory);
        }

        return self;
    }

    function OtusTextEditorWidget(scope, element, UpdateQuestionEventFactory) {
        var self = this;

        self.input = angular.element(element.children()[0]);
        self.ngModel = scope.ngModel;
        self.placeholder = scope.placeholder;

        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;

        function getClassName() {
            return 'OtusTextEditorWidget';
        }

        function getUUID() {
            return scope.uuid;
        }

        function getElement() {
            return element;
        }

        function getParent() {
            return scope.$parent.widget;
        }

        function getItem() {
            return getParent().getItem();
        }

        function _populateLabel() {
            self.ngModel.ptBR.formattedText = removeSpecialCharacters(event.target.innerHTML);
            self.ngModel.ptBR.plainText = event.target.innerText;
        }

        function removeSpecialCharacters(value) {
            return value.replace(/"/g, '\'');
        }

        element.on('keyup', function(event) {
            _populateLabel();
            UpdateQuestionEventFactory.create().execute(self);
            this.childNodes[0].addEventListener('blur', function() {
                _populateLabel();
                UpdateQuestionEventFactory.create().execute(self);
            });
        });
    }
}());
