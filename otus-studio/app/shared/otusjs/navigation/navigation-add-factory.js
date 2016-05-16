(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .factory('NavigationAddFactory', NavigationAddFactory);

    function NavigationAddFactory() {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create(questionContainer) {
            return new NavigationAdd('ADD', questionContainer);
        }

        return self;
    }

    function NavigationAdd(type, questionContainer) {
        var self = this;

        self.type = type;
        self.questionContainer = questionContainer;
        self.manager = null;

        self.setManager = setManager;
        self.execute = execute;

        function setManager(manager) {
            self.manager = manager;
        }

        function execute() {
            var questionCount = self.questionContainer.length;
            if (questionCount > 1) {
                var question = self.questionContainer[questionCount - 2];
                self.manager.createNavigationTo(question.templateID);
            }
        }
    }

}());
