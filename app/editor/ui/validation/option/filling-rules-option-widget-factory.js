(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('FillingRulesOptionWidgetFactory', FillingRulesOptionWidgetFactory);

    function FillingRulesOptionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(option, parentGroup) {
            return new FilingRulesOptionWidget(option, parentGroup);
        }

        return self;
    }

    function FilingRulesOptionWidget(option, parentGroup) {
        var self = this;
        self.name= 'FilingRules';
        self.parentGroup = parentGroup;
        self.option = option;
    }

}());
