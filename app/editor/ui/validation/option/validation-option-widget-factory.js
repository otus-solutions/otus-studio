(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ValidationOptionWidgetFactory', ValidationOptionWidgetFactory);

    function ValidationOptionWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(option, parentGroup) {
            return new ValidationOptionWidget(option, parentGroup);
        }

        return self;
    }

    function ValidationOptionWidget(option, parentGroup) {
        var self = this;

        self.name= 'ValidationOption';
        self.parentGroup = parentGroup;
        self.option = option;
    }

}());
