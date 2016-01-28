var app = angular.module('ui.components');
app.directive("removeMe", function($rootScope) {
    return {
        link: function(scope, element, attrs) {
            scope.remove = function() {
                console.log("olá mundo");
            };
        }
    };
});
