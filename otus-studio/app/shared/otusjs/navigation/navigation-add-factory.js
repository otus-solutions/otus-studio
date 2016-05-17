(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .factory('NavigationAddFactory', NavigationAddFactory);

    NavigationAddFactory.$inject = ['NavigationContainerService'];

    function NavigationAddFactory(NavigationContainerService) {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create(questionContainer) {
            return new NavigationAdd(questionContainer, NavigationContainerService);
        }

        return self;
    }

    function NavigationAdd(questionContainer, NavigationContainerService) {
        var self = this;

        self.questionContainer = questionContainer;

        /* Public methods */
        self.execute = execute;

        function execute() {
            var questionCount = self.questionContainer.length;

            if (questionCount > 1) {
                var question = self.questionContainer[questionCount - 2];
                var questionDestination = self.questionContainer[questionCount - 1];

                NavigationContainerService.createNavigationTo(question.templateID, questionDestination.templateID);
            }
        }
    }

}());
