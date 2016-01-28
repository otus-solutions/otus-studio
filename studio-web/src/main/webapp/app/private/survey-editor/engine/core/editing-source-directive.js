(function() {

    angular
        .module('core')
        .directive('EditingSource', ['EventTriggerFactory']);

    function EditingSource(EventTriggerFactory) {
        var controller = function controller($scope, $element, $attrs) {
            var self = this;

            /* Public interface */
            self.applyEventTrigger = applyEventTrigger;

            /* Public interface implementations */
            function applyEventTrigger() {
                var target = null;
                if ($attrs.editingSource.length > 0) {
                    target = $attrs.editingSource.replace(/'/g, "-v-");
                    target = target.replace(/"/g, "'");
                    target = target.replace(/-v-/g, '"');
                    var directive = JSON.parse(target);
                    target = directive.target;
                } else {
                    target = $attrs.ngModel;
                }
                EventTriggerFactory.produce($element, target);
            }
        };

        var directive = {
            controller: controller,
            link: function link(scope, element, attr, controller) {
                controller.applyEventTrigger();
            }
        };

        return directive;
    }

}());
