(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .factory('NavigationRemoveFactory', NavigationRemoveFactory);

    function NavigationRemoveFactory() {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create(question) {
            return new NavigationRemove('REMOVE', question);
        }

        return self;
    }

    function NavigationRemove(type, question) {
        var self = this;

        self.type = type;
        self.question = question;
        self.manager = null;

        self.setManager = setManager;
        self.execute = execute;

        function setManager(manager) {
            self.manager = manager;
        }

        function execute() {
            var removedIndex = self.manager.removeNavigationOf(question.templateID);

            if (removedIndex === -1)
                self.manager.removeLastNavigation();
            // else
            //     self.manager.removeNavigationByIndex(removedIndex);
        }
    }

}());
