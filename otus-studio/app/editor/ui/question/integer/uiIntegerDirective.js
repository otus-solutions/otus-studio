(function() {
    'use strict';

    angular.module("editor.ui").directive("uiInteger", function() {
        return {
                link: function($scope, element, attrs, ngModelCtrl) {

                element.on('keyup', formatedInteger);

                function formatedInteger(e) {
                  element = angular.element(e.currentTarget);

                    var transformedInput = element.val().replace(/[^0-9]+/g, "");
                    element.val(transformedInput);
                }
            }
        };
    });

}());
