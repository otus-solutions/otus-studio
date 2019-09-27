(function() {
    'use strict';

    angular
        .module('otus.textEdition')
        .service('otus.textEdition.ColorContext', service);

    function service() {
        var self = this;

        self.backgroundColor = '#448aff';
        self.textColor = '#737373';

    }

}());
