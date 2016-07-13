(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PastDateValidatorWidgetFactory', PastDateValidatorWidgetFactory);

    function PastDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope) {
            return new PastDateValidator(scope);
        }

        return self;
    }

    function PastDateValidator(scope) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.date = new Date();
        self.updateData = updateData;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.value = self.date;
        }

        function getRuleType() {
            return parent.fillingRules.options['pastDate'];
        }

        function getTemplate(){
          return '<otus:past-date-validator></otus:past-date-validator>';
        }
        //TODO
    }

}());
