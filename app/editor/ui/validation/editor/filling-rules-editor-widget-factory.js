(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('FillingRulesEditorWidgetFactory', FillingRulesEditorWidgetFactory);

    FillingRulesEditorWidgetFactory.$inject = [
        'AddFillingRulesEventFactory',
        'RemoveFillingRulesEventFactory',
        'OtusFillingRulesWidgetFactory',
        '$compile',
        'UpdateFillingRulesEventFactory'

    ];

    function FillingRulesEditorWidgetFactory(AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateFillingRulesEventFactory) {
        var self = this;

        /*Public interface*/
        self.create = create;

        function create(scope, element) {
            return new FillingRulesEditorWidget(scope, element, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateFillingRulesEventFactory);
        }

        return self;

    }

    function FillingRulesEditorWidget(scope, element, AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, OtusFillingRulesWidgetFactory, $compile, UpdateFillingRulesEventFactory) {
        var self = this;
        self.ngModel = scope.ngModel;

        /* Public methods */
        self.getElement = getElement;
        self.getParent = getParent;
        self.getItem = getItem;
        self.addValidator = addValidator;
        self.checkIfShow = checkIfShow;
        self.deleteValidator = deleteValidator;
        self.updateFillingRules = updateFillingRules;
        self.menuDisabler = menuDisabler;

        _init();

        function _init() {
            showList = showListFeeder();
            if (Object.keys(self.getItem().fillingRules.options).length > 0) {
                _loadOptions();
            } else {
                addValidator('mandatory');
                addValidator('accept');
            }
        }
        var showList;

        function showListFeeder() {
            var showList = getItem().validators();
            return showList;
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
            Object.keys(self.getItem().fillingRules.options).forEach(function(validatorToLoad) {
                appendFillingRules(validatorToLoad);
            });
        }

        function addValidator(validator) {
          console.log(validator);
            AddFillingRulesEventFactory.create().execute(getItem(), validator);
            appendFillingRules(validator);
        }

        function appendFillingRules(validator) {
            showList.splice(showList.indexOf(validator), 1);
            var template = OtusFillingRulesWidgetFactory.create(validator);
            var validatorsColumn = element.find('#validators-column');
            var validatorTemplate = $compile(template)(scope);
            validatorsColumn.append(validatorTemplate);
        }

        function deleteValidator(validator) {
            showList.push(validator);
            RemoveFillingRulesEventFactory.create().execute(self, validator);
        }


        function updateFillingRules() {
            UpdateFillingRulesEventFactory.create().execute();
        }


        function checkIfShow(fillingRule) {
            if (showList.indexOf(fillingRule) > -1) {
                return true;
            } else {
                return false;
            }
        }

        function menuDisabler() {
            if (showList.length > 0) {
                return false;
            } else {
                return true;
            }
        }

    }

}());
