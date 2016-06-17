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

        init();

        function init() {
            console.log(getItem().metadata.options);
            getItem().metadata.options.forEach(function(option){
                _loadOption(option);
            });
            //self.options = getItem().metadata.options;
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

        function _loadOption(option) {
            var newOption = AddMetadataAnswerEventFactory.create().execute(self);
            newOption = option;
            MetadataOptionWidgetFactory.create(newOption, self);
            self.options.push(newOption);
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
