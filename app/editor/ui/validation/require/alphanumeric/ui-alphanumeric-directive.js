(function() {
    'use strict';

    angular.module("editor.ui").directive("uiAlphanumeric", function() {
        return {
            link: function($scope, element, attrs, ngModelCtrl) {
                var lastValidValue;

                element.on('keydown', shouldPrintChar);

                function shouldPrintChar(event) {
                    var element = angular.element(event.currentTarget);
                    var keycode = event.which;
                    return (isAlphanumericKey(keycode) || isValidKey(keycode));
                }

                element.on('keyup', formatedAlphanumeric);

                function formatedAlphanumeric(event) {
                    var element = angular.element(event.currentTarget);
                    var keycode = event.which;
                    var currentValue = element.val();

                    if (currentValue.length === 0) {
                        lastValidValue = '';
                    } else if (isAlphanumericKey(keycode) || isValidKey(keycode)) {
                        lastValidValue = element.val();
                    } else if (!isValidKey(keycode)) {
                        element.val(lastValidValue);
                    }
                }

                function isAlphanumericKey(keycode) {
                    return ((keycode > 47 && keycode < 58) || (keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 105)) ? true : false;
                }

                function isValidKey(keycode) {
                    var shiftKey = (keycode === 16);
                    var backspaceKey = (keycode === 8);
                    var homeKey = (keycode === 36);
                    var endKey = (keycode === 35);
                    var deleteKey = (keycode === 46);
                    var leftKey = (keycode === 37);
                    var rightKey = (keycode === 39);

                    return (shiftKey || backspaceKey || homeKey || endKey || deleteKey || leftKey || rightKey);
                }
            }
        }
    });
});
