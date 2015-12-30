(function() {

    var module = angular.module('editingEngine', ['surveyEditing', 'utils']);

    /*******************************************************************************************************************/
    /* studio.editing.data */

    module.factory('EditingStateFactory', ['EditingStateTree', function(EditingStateTree) {
        var factory = {
            identifyComponent: function identifyComponent(element) {
                return element.localName;
            },
            identifyType: function identifyType(element) {
                if (element.localName != 'question') {
                    return element.type;
                } else {
                    return element.attributes.type.nodeValue;
                }
            },
            selectDataStructure: function selectDataStructure(component, type, data, ngModel) {
                if (type)
                    return EditingStateTree[component][type](data, ngModel);
                else
                    return EditingStateTree[component](data, ngModel);
            },
            produce: function produce(element, ngModel) {
                var component = this.identifyComponent(element),
                    type = this.identifyType(element);

                return this.selectDataStructure(component, type, element, ngModel);
            }
        };

        return factory;
    }]);

    module.factory('EditingStateTree', [function() {
        /* Editing state model */
        function EditingState() {
            this.domId;
            this.ngModel;
            this.value;
        }

        /* Register builders to data structures */
        var tree = {};

        tree.input = {
            text: function buildTextStructure(element, ngModel) {
                var structure = new EditingState();
                structure.domId = element.id;
                structure.ngModel = ngModel;
                structure.value = element.value;
                return structure;
            }
        };
        tree.input.password = tree.input.text;
        tree.input.number = tree.input.text;
        tree.textarea = {
            textarea: tree.input.text
        };
        tree.button = {
            button: function buildButtonStructure(element, ngModel) {
                var structure = new EditingState();
                structure.domId = element.id;
                structure.ngModel = element.attributes.target;
                structure.value = element.attributes.action.value;
                return structure;
            }
        };
        tree.question = {
            text: function buildTextQuestionStructure(element, ngModel) {
                var structure = new EditingState();
                structure.domId = element.id;
                structure.ngModel = ngModel;
                structure.value = element;
                return structure;
            },
            checkbox: function buildCheckboxQuestionStructure(element, ngModel) {
                var structure = new EditingState();
                structure.domId = element.id;
                structure.ngModel = ngModel;
                structure.value = element;
                return structure;
            }
        }

        return tree;
    }]);

    /*******************************************************************************************************************/
    /* studio.editing.directive */

    module.directive('editingSource', ['EventTriggerFactory',
        function(EventTriggerFactory) {
            var controller = function controller($scope, $element, $attrs) {
                var self = this;

                /* Public interface */
                self.applyEventTrigger = applyEventTrigger;

                /* Public interface implementations */
                function applyEventTrigger() {
                    if ($attrs.editingSource.length > 0) {
                        var target = $attrs.editingSource.replace(/'/g, "-v-");
                        target = target.replace(/"/g, "'");
                        target = target.replace(/-v-/g, '"');
                        var directive = JSON.parse(target);
                        var target = directive.target;
                    } else {
                        var target = $attrs.ngModel;
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
    ]);

    /*******************************************************************************************************************/
    /* studio.editing.event */

    module.service('EditingEventHandler', ['EditingService',
        function(EditingService) {
            var self = this;

            /* PUblic interface */
            self.handle = handle;

            /* Public interface implementation */
            function handle(data) {
                EditingService.editData(data);
            }
        }
    ]);

    module.factory('EditingEvent', [function() {
        return function EditingEvent() {
            this.type,
            this.target,
            this.modelType,
            this.oldState,
            this.newState
        };
    }]);

    /*******************************************************************************************************************/
    /* studio.editing.event.trigger */

    module.factory('EventTriggerProcessor', ['EditingEvent', 'EditingEventHandler', 'EditingStateFactory',
        function(EditingEvent, EditingEventHandler, EditingStateFactory) {
            return function EventTriggerProcessor(target, eventType) {
                var target = target,
                    type = eventType,
                    event = new EditingEvent();

                this.storeOldState = function storeOldState(dataStructure) {
                    this.data = EditingStateFactory.produce(dataStructure[0], target);
                    event.oldState = this.data;
                };
                this.storeNewState = function storeNewState(dataStructure) {
                    this.data = EditingStateFactory.produce(dataStructure[0], target);
                    event.newState = this.data;
                };
                this.run = function run() {
                    event.target = target;
                    event.type = type;
                    EditingEventHandler.handle(event);
                    event = new EditingEvent();
                };
            };
        }
    ]);

    module.service('EventTriggerRegister', ['HtmlEventTriggerTree', 'QuestionEventTriggerTree',
        function(HtmlEventTriggerTree, QuestionEventTriggerTree) {
            var self = this;
            var provider = {
                html: new HtmlEventTriggerTree()
            };

            self.setEventTrigger = setEventTrigger;
            self.getEventTriggerTree = getEventTriggerTree;

            function setEventTrigger(eventTrigger) {
                var triggerTree = provider[eventTrigger.type];
                var triggerType = triggerTree.getTriggerType(eventTrigger.source);
                triggerType.registerEventTrigger(eventTrigger);
            }

            function getEventTriggerTree(tree) {
                return provider[tree];
            }
        }
    ]);

    module.factory('EventTriggerFactory', [
        'HtmlEventTriggerFactory',
        'QuestionEventTriggerFactory',
        'SurveyEventTriggerFactory',
        'StringNormalizer',
        function(HtmlEventTriggerFactory, QuestionEventTriggerFactory, SurveyEventTriggerFactory, StringNormalizer) {
            var factoryMap = {
                input: HtmlEventTriggerFactory,
                textarea: HtmlEventTriggerFactory,
                button: HtmlEventTriggerFactory,
                text: QuestionEventTriggerFactory,
                number: QuestionEventTriggerFactory,
                date: QuestionEventTriggerFactory,
                time: QuestionEventTriggerFactory,
                surveyPage: SurveyEventTriggerFactory,

                get: function get(elementName) {
                    return this[elementName];
                }
            };

            /* Factory interface */
            var factory = {
                selectFactory: function selectFactory(element) {
                    var elementName = StringNormalizer.normalizeString(element.localName);
                    return factoryMap[elementName];
                },
                produce: function produce(element, ngModel) {
                    var selectedFactory = this.selectFactory(element[0]);
                    selectedFactory.produce(element, ngModel);
                }
            };

            return factory;
        }
    ]);

    module.factory('EventTriggerTree', [function() {
        function TriggerType() {
            this.triggers = [];

            this.registerEventTrigger = function registerEventTrigger(eventTrigger) {
                this.triggers.push(eventTrigger);
            };

            this.init = function init(data, ngModel) {
                this.triggers.forEach(function(trigger) {
                    trigger.init(data, ngModel);
                });
            }
        }

        var tree = function EventTriggerTree(tree) {
            this.input = {
                text: new TriggerType(),
                password: new TriggerType(),
                number: new TriggerType()
            };
            this.textarea = {
                textarea: new TriggerType()
            };
            this.button = {
                button: new TriggerType()
            };

            this.getTriggerType = function getTriggerType(triggerPath) {
                var pathTokens = triggerPath.split('.');
                var reference = this;

                pathTokens.forEach(function(token) {
                    reference = reference[token];
                });

                return reference;
            }
        };

        return tree;
    }]);

    /*******************************************************************************************************************/
    /* studio.editing.event.trigger.html */

    module.factory('HtmlEventTriggerFactory', ['EventTriggerRegister', 'InputTextEventTrigger', 'ButtonEventTrigger',
        function(EventTriggerRegister, InputTextEventTrigger, ButtonEventTrigger) {
            var factory = {
                identifyComponent: function(element) {
                    return element.localName;
                },
                identifyType: function(element) {
                    return element.type;
                },
                selectEventTrigger: function(component, type, data, ngModel) {
                    var tree = EventTriggerRegister.getEventTriggerTree('html');

                    if (type)
                        var eventTrigger = tree[component][type];
                    else
                        var eventTrigger = tree[component];

                    return eventTrigger;
                },
                produce: function produce(element, ngModel) {
                    var component = this.identifyComponent(element[0]),
                        type = this.identifyType(element[0]),
                        eventTrigger = this.selectEventTrigger(component, type, element, ngModel);

                    eventTrigger.init(element, ngModel);
                }
            };

            return factory;
        }
    ]);

    module.factory('HtmlEventTriggerTree', [function() {
        function TriggerType() {
            this.triggers = [];

            this.registerEventTrigger = function registerEventTrigger(eventTrigger) {
                this.triggers.push(eventTrigger);
            };

            this.init = function init(data, ngModel) {
                this.triggers.forEach(function(trigger) {
                    trigger.init(data, ngModel);
                });
            }
        }

        var tree = function HtmlEventTriggerTree() {
            this.input = {
                text: new TriggerType(),
                password: new TriggerType(),
                number: new TriggerType()
            };
            this.textarea = {
                textarea: new TriggerType()
            };
            this.button = {
                button: new TriggerType()
            };

            this.getTriggerType = function getTriggerType(triggerPath) {
                var pathTokens = triggerPath.split('.');
                var reference = this;

                pathTokens.forEach(function(token) {
                    reference = reference[token];
                });

                return reference;
            }
        };

        return tree;
    }]);

    module.service('ButtonEventTrigger', ['EventTriggerProcessor', 'EventTriggerRegister',
        function(EventTriggerProcessor, EventTriggerRegister) {
            var self = this;

            self.type = 'html';
            self.source = 'button.button';
            self.init = init;

            function init(element, ngModel) {
                var processor = new EventTriggerProcessor(element[0].attributes.action.nodeValue, 'action');

                element.on('click', function setOnFocus() {
                    processor.storeNewState(element);
                    processor.run();
                });
            }

            EventTriggerRegister.setEventTrigger(self);
        }
    ]);

    module.service('InputTextEventTrigger', ['EventTriggerProcessor', 'EventTriggerRegister',
        function(EventTriggerProcessor, EventTriggerRegister) {
            var self = this;

            self.type = 'html';
            self.source = 'input.text';
            self.init = init;

            function init(element, ngModel) {
                var processor = new EventTriggerProcessor(ngModel, 'update-model');

                element.on('focus', function setOnFocus() {
                    processor.storeOldState(element);
                });

                element.on('blur', function setOnBlur() {
                    processor.storeNewState(element);
                    processor.run();
                });
            }

            EventTriggerRegister.setEventTrigger(self);
        }
    ]);

}());
