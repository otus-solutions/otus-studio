(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusButtonContextFactory', OtusButtonContextFactory);

    function OtusButtonContextFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(configuration) {
            return new OtusButtonContext(configuration);
        }

        return self;
    }

    function OtusButtonContext(configuration) {
        var self = this;

        self.context = configuration.context;
        self.addAction = configuration.addAction;
        self.removeAction = configuration.removeAction;

        self.add = add;
        self.remove = remove;

        function add(element) {
            self.context[self.addAction](element);
        }

        function remove(element) {
            self.context[self.removeAction](element);
        }
    }

}());
