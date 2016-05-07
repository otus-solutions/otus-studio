(function() {

    angular
        .module('ui.components')
        .directive('otusAccordion', otusAccordion);

    otusAccordion.$inject = ['OtusAccordionWidgetFactory'];

    function otusAccordion(OtusAccordionWidgetFactory) {
        var directive = {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/shared/ui-components/accordion/accordion-template.html',
            scope: {},
            link: function(scope, template, attrs, controller, transclude) {
                var userHeader, userContent;
                var templateHeader = angular.element(template.children()[0]);
                var templateContent = angular.element(template.children()[1]);

                transclude(function(clone, cloneScope) {
                    userHeader = angular.element(clone[1]);
                    userContent = angular.element(clone[3]);
                });

                userHeader.children().insertBefore(templateHeader.children());
                templateContent.append(userContent.children());

                scope.widget = OtusAccordionWidgetFactory.create(scope, attrs, scope.$parent);
            }
        };

        return directive;
    }

}());
