(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('QuestionNavigationController', QuestionNavigationController);

    QuestionNavigationController.$inject = [
        'QuestionNavigationWidgetFactory',
        'QuestionNavigationExpressionWidgetFactory'
    ];

    function QuestionNavigationController(QuestionNavigationWidgetFactory, QuestionNavigationExpressionWidgetFactory) {
        var self = this;
        var navigations = [];

        /* Public interface */
        self.navigations = navigations;

        /* Initialization */
        init();

        function init() {
            var model = {name:'1', to:'ELEA1'};
            var navigation = QuestionNavigationWidgetFactory.create(model);

            navigation.rules.push(QuestionNavigationExpressionWidgetFactory.create(model));
            navigations.push(navigation);
        }

    }

}());
