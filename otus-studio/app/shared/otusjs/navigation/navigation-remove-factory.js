(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .factory('NavigationRemoveFactory', NavigationRemoveFactory);

    NavigationRemoveFactory.$inject = ['NavigationContainerService'];

    function NavigationRemoveFactory(NavigationContainerService) {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create(question) {
            return new NavigationRemove(question, NavigationContainerService);
        }

        return self;
    }

    function NavigationRemove(question, NavigationContainerService) {
        var self = this;

        self.question = question;

        /* Public methods */
        self.execute = execute;

        function execute() {
            var removedIndex = NavigationContainerService.removeNavigationOf(question.templateID);

            if (removedIndex === -1)
                NavigationContainerService.removeLastNavigation();
        }
    }

}());
