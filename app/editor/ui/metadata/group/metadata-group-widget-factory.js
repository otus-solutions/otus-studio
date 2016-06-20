(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MetadataGroupWidgetFactory', MetadataGroupWidgetFactory);

    MetadataGroupWidgetFactory.$inject = [
        'MetadataOptionWidgetFactory',
        'AddMetadataAnswerEventFactory',
        'RemoveMetadataOptionEventFactory'
    ];

    function MetadataGroupWidgetFactory(MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory) {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(scope, element) {
            return new MetadataGroupWidget(scope, element, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory);
        }

        return self;
    }

    function MetadataGroupWidget(scope, element, MetadataOptionWidgetFactory, AddMetadataAnswerEventFactory, RemoveMetadataOptionEventFactory) {
        var self = this;
        self.ngModel = scope.ngModel;
        self.options = [];


        /* Public methods */
        self.getClassName = getClassName;
        self.getUUID = getUUID;
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.addOption = addOption;
        self.removeLastOption = removeLastOption;

        _init();

        function _init() {
            if(self.getItem().metadata.options.length > 0) {
                _loadOptions();
            }
        }

        function getClassName() {
            return 'MetadataGroupWidget';
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

        function _loadOptions() {
            self.getItem().metadata.options.forEach(function(option){
                var optionWidget = MetadataOptionWidgetFactory.create(option, self);
                self.options.push(optionWidget);
            });
        }

        function addOption() {
            var newOption = AddMetadataAnswerEventFactory.create().execute(self);
            var optionWidget = MetadataOptionWidgetFactory.create(newOption, self);
            self.options.push(optionWidget);
        }

        function removeLastOption() {
            RemoveMetadataOptionEventFactory.create().execute(self);
            self.options.splice(-1);
        }
    }

}());
