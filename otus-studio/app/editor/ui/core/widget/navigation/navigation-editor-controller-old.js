(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = [
        '$scope',
        '$element',
        'ModelBuilderHubService',
        'NavigationEditorContentService'
    ];

    function NavigationController($scope, $element, ModelBuilderHubService, NavigationEditorContentService) {
        var self = this;
        var navigations = [];

        /* Public interface */
        self.navigations = navigations;

        /* Initialization */
        init();

        function init() {
            ModelBuilderHubService.plugToNavigationBuilder(self);

            NavigationEditorContentService.init($scope, $element);
            // var modelNavigation = {name:'1', origin:'ELEA1', destination:'ELEA2'};
            // var navigation = QuestionNavigationWidgetFactory.create(modelNavigation);
            //
            // var modelCondition = {when:'Equal', answer:'1'};
            // var modelConditionTwo = {when:'Less', answer:'2'};
            // var modelConditionThree = {when:'Equal', answer:'YES'};
            // navigation.conditionSet.push(QuestionNavigationConditionWidgetFactory.create(modelCondition));
            // navigation.conditionSet.push(QuestionNavigationConditionWidgetFactory.create(modelConditionTwo));
            // navigation.conditionSet.push(QuestionNavigationConditionWidgetFactory.create(modelConditionThree));
            //
            // navigations.push(navigation);
        }

        function update(update) {
            var uiUpdateCommand = UIUpdateCommandFactory.create(update);
            uiUpdateCommand.execute();
        }
    }

}());
