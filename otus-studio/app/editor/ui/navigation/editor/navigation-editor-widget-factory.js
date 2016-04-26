(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('NavigationWidgetFactory', NavigationWidgetFactory);

    function NavigationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(parentWidget, navigation) {
            return new NavigationWidget(parentWidget, navigation);
        }

        return self;
    }

    function NavigationWidget(parentWidget, navigation) {
        var self = this;

        self.name = 'Navigation';
        self.parentWidget = parentWidget;
        self.question = parentWidget.question;
        self.navigation = navigation;
        self.routes = [];
    }

}());
