(function() {
    var app = angular.module('ui.components');

    app.directive("removeMe", function($rootScope) {

        function remove(element) {
            element.remove();
        }

        return {
            link: function(scope, element, attrs) {
                scope.removeQuestion = function() {
                    remove(element);
                };
            }
        };
    });
}());

/**

(function() {

var app = angular.module('ui.components');
app.directive("removeMe", function($rootScope) {

      function remove(element) {
          element.remove();
      }

      return {
        link:function(scope,element,attrs)
        {
          scope.removeQuestion = function() {
            remove(element);
          };
        }
      }
});

}());

**/
