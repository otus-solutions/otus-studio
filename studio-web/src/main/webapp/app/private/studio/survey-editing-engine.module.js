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

            function getCurrentQuestion() {

            }

            function editData(editingEvent) {
                console.info('Editing event: ');
                console.log(editingEvent);

                // validate editingEvent
                // log editingEvent
                generalEditingMemoryCache.storeState(editingEvent);
                SurveyDataUpdater.update(editingEvent, getSurvey());

                // console.info('Log da survey');
                // console.log(getSurvey());
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
    /* studio.editing.data */

    module.factory('DataStructureFactory', ['DataStructureTree', function(DataStructureTree) {
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
        tree.button = {
            button: function buildButtonStructure(element, ngModel) {
                var structure = new DataStructure();
                structure.domId = element.id;
                structure.ngModel = element.attributes.target;
                structure.value = element.attributes.action.value;
                return structure;
            }
        };
        tree.question = {
            text: function buildTextQuestionStructure(element, ngModel) {
                var structure = new DataStructure();
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

    /*
    module.provider('EventTriggerProvider', function EventTriggerProvider() {
        function eventTrigger(trigger) {
            console.log(trigger);
            return this;
        };

        return {
            eventTrigger: eventTrigger,
            $get: function () {
                return ('coisas');
            }
        }
    });
    */

    /*******************************************************************************************************************/
    /* studio.editing.event.trigger */

    module.factory('EventTriggerProcessor', ['EditingEvent', 'EditingEventHandler', 'DataStructureFactory',
        function(EditingEvent, EditingEventHandler, DataStructureFactory) {
            return function EventTriggerProcessor(ngModel, context) {
                var ngModel = ngModel,
                    event = new EditingEvent(),
                    data;

                this.storeOldState = function storeOldState(dataStructure) {
                    data = DataStructureFactory.produce(dataStructure[0], ngModel);
                    event.oldState = data;
                };
                this.storeNewState = function storeNewState(dataStructure) {
                    data = DataStructureFactory.produce(dataStructure[0], ngModel);
                    event.newState = data;
                };
                this.run = function run() {
                    event.type = data.ngModel;
                    event.ngModel = data.ngModel;
                    EditingEventHandler.handle(event);
                    event = new EditingEvent();
                };
            };
        }
    ]);

    module.service('EventTriggerRegister', ['HtmlEventTriggerTree', 'QuestionEventTriggerTree',
        function(HtmlEventTriggerTree, QuestionEventTriggerTree) {
            var self = this;
            var provider = {};
            provider.html = new HtmlEventTriggerTree();
            // provider.question = new QuestionEventTriggerTree();

            self.setEventTrigger = setEventTrigger;
            self.getEventTriggerTree = getEventTriggerTree;

            function setEventTrigger(eventTrigger) {
                var triggerTree = provider[eventTrigger.type];
                var triggerType = triggerTree.getTriggerType(eventTrigger.target);
                triggerType.registerEventTrigger(eventTrigger);
            }

            function getEventTriggerTree(tree) {
                return provider[tree];
            }
        }
    ]);

    module.factory('EventTriggerFactory', ['HtmlEventTriggerFactory', 'QuestionEventTriggerFactory', 'SurveyEventTriggerFactory',
        function(HtmlEventTriggerFactory, QuestionEventTriggerFactory, SurveyEventTriggerFactory) {
            var factoryIndex = {
                input: 'html',
                textarea: 'html',
                button: 'html',
                text: 'question',
                number: 'question',
                date: 'question',
                time: 'question',
                singleSelection: 'question',
                surveyPage: 'survey'
            };

            var factoryMap = {
                html: HtmlEventTriggerFactory,
                question: QuestionEventTriggerFactory,
                survey: SurveyEventTriggerFactory
            };

            /* Factory interface */
            var factory = {
                identifyFactory: function identifyFactory(element) {
                    return factoryIndex[this.normalizeString(element.localName)];
                },
                selectFactory: function selectFactory(type) {
                    return factoryMap[type];
                },
                normalizeString: function normalizeString(directiveName) {
                    var directiveParts = directiveName.split('-'),
                        loopSize = directiveParts.length,
                        normalizedString = directiveParts[0].toLowerCase();

                    for (var i = 1; i < loopSize; i++) {
                        var firstLetter = directiveParts[i].slice(0, 1),
                            restOfString = directiveParts[i].slice(1);
                        normalizedString = normalizedString.concat(firstLetter.toUpperCase().concat(restOfString.toLowerCase()));
                    }
                    return normalizedString;
                },
                produce: function produce(element, ngModel) {
                    var factoryType     = this.identifyFactory(element[0]),
                        selectedFactory = this.selectFactory(factoryType);

                    selectedFactory.produce(element, ngModel);
                }
            };

            return factory;
        }
    ]);

    module.factory('EventTriggerTree', [function() {
        var tree = function EventTriggerTree(tree) {
            // tag-name/type
            this.input = {
                text: {
                    triggers: [],
                    registerEventTrigger: function registerEventTrigger(eventTrigger) {
                        this.triggers.push(eventTrigger);
                    },
                    init: function init(data, ngModel) {
                        var triggerInstance;
                        this.triggers.forEach(function(trigger) {
                            trigger.init(data, ngModel);
                        });
                    }
                }
            };
            this.input.password = this.input.text;
            this.input.number = this.input.text;
            this.textarea = { textarea: this.input.text };
            this.button = {
                button: {
                    triggers: [],
                    registerEventTrigger: function registerEventTrigger(eventTrigger) {
                        this.triggers.push(eventTrigger);
                    },
                    init: function init(data, ngModel) {
                        var triggerInstance;
                        this.triggers.forEach(function(trigger) {
                            trigger.init(data, ngModel);
                        });
                    }
                }
            }

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
                var triggerInstance;
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
            self.target = 'button.button';
            self.init = init;

            function init(element, ngModel) {
                var processor = new EventTriggerProcessor(ngModel);

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
            self.target = 'input.text';
            self.init = init;

            function init(element, ngModel) {
                var processor = new EventTriggerProcessor(ngModel);

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

    module.factory('InputCheckboxEventTrigger', ['EventTriggerProcessor', 'EventTriggerRegister',
        function(EventTriggerProcessor, EventTriggerRegister) {
            var self = this;

            self.type = 'html';
            self.target = 'input.checkbox';
            self.init = init;

            function init(element, ngModel) {
                var processor = new EventTriggerProcessor(ngModel);

                element.on('focus', function setOnFocus() {
                    processor.storeOldState(element);
                });

                element.on('change', function setOnBlur() {
                    processor.storeNewState(element);
                    processor.run();
                });
            }

            EventTriggerRegister.setEventTrigger(self);
        }
    ]);

    module.factory('InputRadioEventTrigger', ['EventTriggerProcessor', 'EventTriggerRegister',
        function(EventTriggerProcessor, EventTriggerRegister) {
            var self = this;

            self.type = 'html';
            self.target = 'input.radio';
            self.init = init;

            function init(element, ngModel) {
                var processor = new EventTriggerProcessor(ngModel);

                element.on('focus', function setOnFocus() {
                    processor.storeOldState(element);
                });

                element.on('mouseup', function setOnBlur() {
                    processor.storeNewState(element);
                    processor.run();
                });
            }

            EventTriggerRegister.setEventTrigger(self);
        }
    ]);

    module.factory('SelectEventTrigger', ['EventTriggerProcessor', 'EventTriggerRegister',
        function(EventTriggerProcessor, EventTriggerRegister) {
            var self = this;

            self.type = 'html';
            self.target = 'select';
            self.init = init;

            function init(element, ngModel) {
                var processor = new EventTriggerProcessor(ngModel);

                element.on('focus', function setOnFocus() {
                    processor.storeOldState(element);
                });

                element.on('change', function setOnBlur() {
                    processor.storeNewState(element);
                    processor.run();
                });
            }

            EventTriggerRegister.setEventTrigger(self);
        }
    ]);

    module.factory('TextAreaEventTrigger', ['InputTextEventTrigger',
        function(InputTextEventTrigger) {
            var self = this;

            self.type = 'html';
            self.target = 'textarea.textarea';
            self.init = init;

            function init(element, ngModel) {
                var processor = new EventTriggerProcessor(ngModel);

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

    /*******************************************************************************************************************/
    /* studio.editing.event.trigger.question */

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

    // module.factory('QuestionEventTrigger', [function() { ... }]);

    // module.factory('BooleanQuestionEventTrigger', [function() { ... }]);

    // module.factory('DateQuestionEventTrigger', [function() { ... }]);

    // module.factory('NumberQuestionEventTrigger', [function() { ... }]);

    // module.factory('SingleSelectionQuestionEventTrigger', [function() { ... }]);

    // module.factory('TextQuestionEventTrigger', [function() { ... }]);

    // module.factory('TimeQuestionEventTrigger', [function() { ... }]);

    // module.factory('SelectCardQuestionEventTrigger', [function() { ... }]);

    /*******************************************************************************************************************/
    /* studio.editing.event.trigger.survey */

    module.factory('SurveyEventTriggerFactory', ['SurveyEventTriggerService', function(SurveyEventTriggerService) {
        var factory = {
            identifyComponent: function(element) {
                return element.localName;
            },
            identifyType: function(element) {
                return element.type;
            },
            selectEventTrigger: function(component, type, data, ngModel) {
                if (type)
                    SurveyEventTriggerTree['loadSurveyPageEvents'][type](data, ngModel);
                else
                    SurveyEventTriggerTree['loadSurveyPageEvents'](data, ngModel);
            },
            produce: function produce(element, ngModel) {
                SurveyEventTriggerService.init();
            }
        };

        return factory;
    }]);

    module.service('SurveyEventTriggerService', ['EventTriggerProcessor', function(EventTriggerProcessor) {
        var self = this;

        self.init = init;

        function init() {
            var target = document.querySelector('survey-page');
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type == 'childList') {
                        var processor = new EventTriggerProcessor('survey.questions');
                        processor.storeNewState(mutation.addedNodes);
                        processor.run();
                    }
                });
            });
            // configuration of the observer:
            var config = { attributes: true, childList: true, characterData: true, subtree: true };
            // pass in the target node, as well as the observer options
            observer.observe(target, config);
        }
    }]);

}());
