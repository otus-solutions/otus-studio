(function() {

    angular
        .module('ui.components')
        .directive('uiAccordion', [
            '$compile',
            '$templateRequest',
            '$templateCache',
            'StateChangerButton',
            'ContentContainer',
            function($compile, $templateRequest, $templateCache, StateChangerButton, ContentContainer) {
                var directive = {
                    controller: controller,
                    controllerAs: 'ctrl',
                    restrict: 'E',
                    transclude: true,
                    templateUrl: 'shared/ui-components/accordion/accordion-template.html',
                    scope: {
                        title: '@',
                        widget: '='
                    },
                    link: function(scope, element, attrs, controller, transclude) {
                        var content = angular.element(transclude()[1]);
                        content.addClass('hidden');
                        element.append(content);
                    }
                };

                function controller($scope, $element) {
                    var self = this;

                    self.stateChangerButton = new StateChangerButton($element, self);
                    self.update = update;

                    function update() {
                        if (!self.contentContainer)
                            self.contentContainer = new ContentContainer($element);

                        self.contentContainer.changeState();
                    }
                }

                return directive;
            }
        ]);

    angular
        .module('ui.components')
        .factory('StateChangerButton', [
            function() {
                var button = function(element, controller) {
                    var CLOSED = 0;
                    var OPENED = 1;
                    var CHEVRON_UP = 'chevron-up';
                    var CHEVRON_DOWN = 'chevron-down';

                    var self = this;

                    /* Private scope */
                    var reference = element.children().children();
                    var state = CLOSED;

                    /* Public scope */
                    self.icon = CHEVRON_UP;
                    self.click = click;

                    /* Private methods */
                    function click() {
                        changeState();
                        controller.update();
                    }

                    function changeState() {
                        if (state == CLOSED) {
                            state = OPENED;
                            switchIcon(CHEVRON_DOWN);
                        } else {
                            state = CLOSED;
                            switchIcon(CHEVRON_UP);
                        }
                    }

                    function switchIcon(newIcon) {
                        self.icon = newIcon;
                    }
                };

                return button;
            }
        ]);

    angular
        .module('ui.components')
        .factory('ContentContainer', [
            function() {
                var content = function(element) {
                    var HIDDEN = 'hidden';
                    var VISIBLE = 'visible';

                    /* Private scope */
                    var self = this,
                        state = HIDDEN,
                        reference = angular.element(element.children()[1]);

                    /* Public scope */
                    self.changeState = changeState;
                    self.isOpen = isOpen;

                    /* Private methods */
                    function changeState() {
                        if (state == HIDDEN)
                            show();
                        else
                            hide();
                    }

                    function show() {
                        reference.addClass(VISIBLE);
                        reference.removeClass(HIDDEN);
                        state = VISIBLE;
                    }

                    function hide() {
                        reference.addClass(HIDDEN);
                        reference.removeClass(VISIBLE);
                        state = HIDDEN;
                    }

                    function isOpen() {
                        return (state == OPENEND);
                    }
                };

                return content;
            }
        ]);

}());
