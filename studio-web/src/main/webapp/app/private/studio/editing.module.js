(function() {

    var module = angular.module('editing', ['survey', 'memory']);

    /*******************************************************************************************************************/
    /* studio.editing */

    module.service('EditingService', ['Survey', 'SurveyDataUpdater', 'EditingState', 'MemoryManagement',
        function(Survey, SurveyDataUpdater, EditingState, MemoryManagement) {
            const GENERAL_MEM_SIZE = 30;

            var self = this;
            var surveyMemoryCache, generalEditingMemoryCache;

            /* Public interface */
            self.init = init;
            self.open = open;
            self.close = close;
            self.save = save;
            self.editData = editData;
            self.getSurvey = getSurvey;

            /* Public interface implementation */
            function init(survey) {
                self.survey = survey;
                surveyMemoryCache = new MemoryManagement();
                generalEditingMemoryCache = new MemoryManagement(GENERAL_MEM_SIZE);
            }

            function open() {
                var state = EditingState.generateOpen(self.survey);
                surveyMemoryCache.storeState(state);
            }

            function close() {
                EditingState.generateClose(self.survey);
            }

            function save() {
                var state = EditingState.generateSave(self.survey);
                surveyMemoryCache.storeState(state);
            }

            function getSurvey() {
                return surveyMemoryCache.getMostRecentState().data;
            }

            function editData(editingEvent) {
                // validate editingEvent
                // log editingEvent
                generalEditingMemoryCache.storeState(editingEvent);

                // apply editingEvent data:
                SurveyDataUpdater.update(editingEvent, getSurvey());
                console.log(getSurvey());
            }
        }
    ]);

    module.service('EditingState', [
        function() {
            var self = this;

            /* Public interface */
            self.generateOpen = generateOpen;
            self.generateClose = generateClose;
            self.generateSave = generateSave;

            /* Public interface implementation */
            function generateOpen(data) {
                return createState('OPENED', data)
            }

            function generateClose(data) {
                return createState('CLOSED', data);
            }

            function generateSave(data) {
                return createState('SAVED', data);
            }

            function createState(value, data) {
                return {
                    timestamp: Date.now(),
                    value: value,
                    data: data
                };
            }
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
        return function() {
            this.type,
            this.ngModel,
            this.oldState,
            this.newState
        };
    }]);

    /*******************************************************************************************************************/
    /* studio.editing.data */

    module.factory('DataStructureFactory', ['DataStructureTree', function(DataStructureTree) {
        var factory = {
            identifyComponent: function(element) {
                return element.localName;
            },
            identifyType: function(element) {
                return element.type;
            },
            selectDataStructure: function(component, type, data, ngModel) {
                if (type)
                    return DataStructureTree[component][type](data, ngModel);
                else
                    return DataStructureTree[component](data, ngModel);
            },
            produce: function produce(element, ngModel) {
                var component = this.identifyComponent(element),
                    type = this.identifyType(element);

                return this.selectDataStructure(component, type, element, ngModel);
            }
        };

        return factory;
    }]);

    module.factory('DataStructureTree', [function() {
        /* Data structure models */
        function DataStructure() {
            this.domId;
            this.ngModel;
            this.value;
        }

        /* Register builders to data structures */
        var tree = {};

        tree.input = {
            text: function buildTextStructure(element, ngModel) {
                var structure = new DataStructure();
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

        return tree;
    }]);

    /*******************************************************************************************************************/
    /* studio.editing.event.trigger */

    module.factory('EventTriggerFactory', ['HtmlEventTriggerFactory', 'QuestionEventTriggerFactory',
        function(HtmlEventTriggerFactory, QuestionEventTriggerFactory) {
            var factoryIndex = {
                input: 'html',
                textarea: 'html',
                text: 'question',
                number: 'question',
                date: 'question',
                time: 'question',
                singleSelection: 'question'
            };

            var factoryMap = {
                html: HtmlEventTriggerFactory,
                question: QuestionEventTriggerFactory
            };

            var factory = {
                identifyFactory: function(element) {
                    return factoryIndex[element.localName];
                },
                selectFactory: function(type) {
                    return factoryMap[type];
                },
                produce: function produce(element, ngModel) {
                    var factoryType = this.identifyFactory(element[0]);
                    var selectedFactory = this.selectFactory(factoryType);
                    selectedFactory.produce(element, ngModel);
                }
            };

            return factory;
        }
    ]);

    module.factory('HtmlEventTriggerFactory', ['EventTriggerTree', function(EventTriggerTree) {
        var factory = {
            identifyComponent: function(element) {
                return element.localName;
            },
            identifyType: function(element) {
                return element.type;
            },
            selectEventTrigger: function(component, type, data, ngModel) {
                if (type)
                    EventTriggerTree[component][type](data, ngModel);
                else
                    EventTriggerTree[component](data, ngModel);
            },
            produce: function produce(element, ngModel) {
                var component = this.identifyComponent(element[0]),
                    type = this.identifyType(element[0]);

                this.selectEventTrigger(component, type, element, ngModel);
            }
        };

        return factory;
    }]);

    module.factory('QuestionEventTriggerFactory', ['EventTriggerTree', function(EventTriggerTree) {
        var factory = {
            identifyComponent: function(element) {
                return element.localName;
            },
            identifyType: function(element) {
                return element.type;
            },
            selectEventTrigger: function(component, type, data, ngModel) {
                if (type)
                    EventTriggerTree[component][type](data, ngModel);
                else
                    EventTriggerTree[component](data, ngModel);
            },
            produce: function produce(element, ngModel) {
                var component = this.identifyComponent(element[0]),
                    type = this.identifyType(element[0]);

                this.selectEventTrigger(component, type, element, ngModel);
            }
        };

        return factory;
    }]);

    module.factory('QuestionEventTriggerTree', [function(InputTextEventTrigger) {
        var tree = {};

        // tag-name/type
        tree.input = {
            text: function(data, ngModel) {
                InputTextEventTrigger(data, ngModel);
            }
        };

        tree.input.password = tree.input.text;
        tree.input.number = tree.input.text;
        tree.textarea = { textarea: tree.input.text };

        return tree;
    }]);

    module.factory('EventTriggerTree', ['InputTextEventTrigger', function(InputTextEventTrigger) {
        var tree = {};

        // tag-name/type
        tree.input = {
            text: function(data, ngModel) {
                InputTextEventTrigger(data, ngModel);
            }
        };

        tree.input.password = tree.input.text;
        tree.input.number = tree.input.text;
        tree.textarea = { textarea: tree.input.text };

        return tree;
    }]);

    module.factory('InputTextEventTrigger', ['EventTriggerProcessor', function(EventTriggerProcessor) {
        return function InputTextTrigger(element, ngModel) {
            var processor = new EventTriggerProcessor(ngModel);

            element.on('focus', function setOnFocus() {
                processor.storeOldState(element);
            });

            element.on('blur', function setOnBlur() {
                processor.storeNewState(element);
                processor.run();
            });
        };
    }]);

    module.factory('EventTriggerProcessor', ['EditingEvent', 'EditingEventHandler', 'DataStructureFactory',
        function(EditingEvent, EditingEventHandler, DataStructureFactory) {
            return function EventTriggerProcessor(ngModel) {
                var ngModel = ngModel,
                    event = new EditingEvent();

                this.storeOldState = function storeOldState(dataStructure) {
                    var data = DataStructureFactory.produce(dataStructure[0], ngModel);
                    event.oldState = data;
                };
                this.storeNewState = function storeNewState(dataStructure) {
                    var data = DataStructureFactory.produce(dataStructure[0], ngModel);
                    event.newState = data;
                };
                this.run = function run() {
                    event.type = ngModel;
                    event.ngModel = ngModel;
                    EditingEventHandler.handle(event);
                    event = new EditingEvent();
                };
            };
        }
    ]);

    /*******************************************************************************************************************/
    /* studio.editing.event.question.trigger */

    module.factory('QuestionEventTriggerTree', [function() {
        var tree = {};

        // question-type/
        tree.text = function() {};
        tree.number = function() {};
        tree.singleSelection = function() {};
        tree.date = function() {};
        tree.time = function() {};
        tree.checkbox = function() {};

        return tree;
    }]);

    module.factory('QuestionEventTriggerFactory', ['QuestionEventTriggerTree', function(QuestionEventTriggerTree) {
        var factory = {
            identifyComponent: function(element) {
                return element.localName;
            },
            identifyType: function(element) {
                return element.type;
            },
            selectEventTrigger: function(component, type, data, ngModel) {
                if (type)
                    QuestionEventTriggerTree[component][type](data, ngModel);
                else
                    QuestionEventTriggerTree[component](data, ngModel);
            },
            produce: function produce(element, ngModel) {
                var component = this.identifyComponent(element[0]),
                    type = this.identifyType(element[0]);

                this.selectEventTrigger(component, type, element, ngModel);
            }
        };

        return factory;
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
                    EventTriggerFactory.produce($element, $attrs.ngModel);
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

}());
