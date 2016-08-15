(function() {
    'use strict';

    angular.module("editor.ui").directive("uiSpecials", function() {
        return {
            link: function($scope, element, attrs, ngModelCtrl) {
                var lastValidValue;

                element.on('keydown', shouldPrintChar);

                function shouldPrintChar(event) {
                    var element = angular.element(event.currentTarget);
                    var keycode = event.which;
                    return (isSpecialsKey(keycode) || isValidKey(keycode));
                }

                element.on('keyup', formatedSpecials);

                function formatedSpecials(event) {
                    var element = angular.element(event.currentTarget);
                    var keycode = event.which;
                    var currentValue = element.val();

                    if (currentValue.length === 0) {
                        lastValidValue = '';
                    } else if (isSpecialsKey(keycode) || isValidKey(keycode)) {
                        lastValidValue = element.val();
                    } else if (!isValidKey(keycode)) {
                        element.val(lastValidValue);
                    }
                }

                function isSpecialsKey(keycode) {
                    return ((keycode >= 48 && keycode <= 57) || (keycode >= 190 && keycode <= 192)(keycode >= 219 && keycode <= 222) || (keycode = 188)) ? true : false;
                }

                function isValidKey(keycode) {
                    var shiftKey = (keycode === 16);
                    var ctrlkey = (keycode === 17);
                    var backspaceKey = (keycode === 8);
                    var homeKey = (keycode === 36);
                    var endKey = (keycode === 35);
                    var deleteKey = (keycode === 46);
                    var leftKey = (keycode === 37);
                    var rightKey = (keycode === 39);

                    return (shiftKey || ctrlkey || backspaceKey || homeKey || endKey || deleteKey || leftKey || rightKey);
                }
            }
        }
    });
}());
