(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('QuestionNavigationController', QuestionNavigationController);

    QuestionNavigationController.$inject = [
        'QuestionNavigationWidgetFactory',
        'QuestionNavigationConditionWidgetFactory'
    ];

    function QuestionNavigationController(QuestionNavigationWidgetFactory, QuestionNavigationConditionWidgetFactory) {
        var self = this;
        var navigations = [];

        /* Public interface */
        self.navigations = navigations;

        /* Initialization */
        init();

        function init() {
            var modelNavigation = {name:'1', origin:'ELEA1', destination:'ELEA2'};
            var navigation = QuestionNavigationWidgetFactory.create(modelNavigation);

            var modelCondition = {when:'Equal', answer:'1'};
            var modelConditionTwo = {when:'Less', answer:'2'};
            var modelConditionThree = {when:'Equal', answer:'YES'};
            navigation.conditionSet.push(QuestionNavigationConditionWidgetFactory.create(modelCondition));
            navigation.conditionSet.push(QuestionNavigationConditionWidgetFactory.create(modelConditionTwo));
            navigation.conditionSet.push(QuestionNavigationConditionWidgetFactory.create(modelConditionThree));

            navigations.push(navigation);
        }
    }

}());
