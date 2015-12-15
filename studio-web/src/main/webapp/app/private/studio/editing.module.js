(function() {

    var module = angular.module('editing', ['survey', 'memory']);

    /*******************************************************************************************************************/
    /* Module services */

    module.service('EditingService', ['Survey', 'SurveyDataUpdater', 'EditingState', 'MemoryManagement',
        function(Survey, SurveyDataUpdater, EditingState, MemoryManagement) {
            const GENERAL_MEM_SIZE = 2;

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
                console.log(generalEditingMemoryCache.get());

                // apply editingEvent data:
                SurveyDataUpdater.updateIdentity(editingEvent, getSurvey());
                console.log(getSurvey());
            }
        }
    ]);

    module.service('EditingState', [function() {
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
    }]);

    /*******************************************************************************************************************/
    /* Module factories */

    module.factory('EditingEventHandler', ['EditingService',
        function(EditingService){
            return {
                handle: function handle(data) {
                    EditingService.editData(data);
                }
            };
        }
    ]);

    module.factory('EditingEvent', [function() {
        return function() {
            this.type = null,
            this.ngModel = null,
            this.oldState = null,
            this.newState = null
        };
    }]);

    module.factory('DataStrucureFactory', [function() {
        var dataStrucureFactory = {};

        dataStrucureFactory.input = {
            text: function text(element) {
                return {
                    value: element[0].value
                }
            }
        };

        dataStrucureFactory.input.password = dataStrucureFactory.input.text;
        dataStrucureFactory.input.number = dataStrucureFactory.input.text;
        dataStrucureFactory.textarea = { textarea: dataStrucureFactory.input.text };

        dataStrucureFactory.produce = function produce(element) {
            var localName = element[0].localName,
                type = element[0].type;

            if (!type)
                return this[localName](element);
            else
                return this[localName][type](element);
        };

        return dataStrucureFactory;
    }]);

    module.factory('FocusProcessor', ['EditingEvent', 'EditingEventHandler', 'DataStrucureFactory',
        function(EditingEvent, EditingEventHandler, DataStrucureFactory) {
            return {
                event: new EditingEvent(),
                storeOldState: function storeOldState(dataStructure) {
                    var data = DataStrucureFactory.produce(dataStructure);
                    this.event.oldState = data;
                },
                storeNewState: function storeNewState(dataStructure) {
                    var data = DataStrucureFactory.produce(dataStructure);
                    this.event.newState = data;
                },
                fireEditingEvent: function fireEditingEvent(ngModel) {
                    this.event.type = 'update';
                    this.event.ngModel = ngModel;
                    EditingEventHandler.handle(this.event);
                    this.event = new EditingEvent();
                }
            };
        }
    ]);

    module.factory('EventTriggerFactory', ['FocusProcessor', function(FocusProcessor) {
        var eventTriggerFactory = {};

        eventTriggerFactory.produce = function produce(element, ngModel) {
            var localName = element[0].localName,
                type = element[0].type;

            if (!type) {
                console.log(this);
                return this[localName](element, ngModel);
            }
            else {
                console.log(this);
                return this[localName][type](element, ngModel);
            }
        };

        eventTriggerFactory.input = {
            text: function text(element, ngModel) {
                element.on('focus', function setOnFocus() {
                    FocusProcessor.storeOldState(element);
                });

                element.on('blur', function setOnBlur() {
                    FocusProcessor.storeNewState(element);
                    FocusProcessor.fireEditingEvent(ngModel);
                });
            }
        };

        eventTriggerFactory.button = {
            button: function button(element, ngModel) {
                element.on('click', function setOnClick(event) {});
            }
        };

        eventTriggerFactory.input.password = eventTriggerFactory.input.text;
        eventTriggerFactory.input.number = eventTriggerFactory.input.text;
        eventTriggerFactory.textarea = { textarea: eventTriggerFactory.input.text };

        return eventTriggerFactory;
    }]);

    /*******************************************************************************************************************/
    /* Module directives */

    module.directive('editingSource', ['EventTriggerFactory',
        function(EventTriggerFactory) {
            var controller = function controller($scope, $element, $attrs) {
                var self = this;

                /* Public interface */
                self.applyEventTriggers = applyEventTriggers;

                /* Public interface implementations */
                function applyEventTriggers() {
                    EventTriggerFactory.produce($element, $attrs.ngModel);
                }
            };

            return {
                controller: controller,
                link: function link(scope, element, attr, controller) {
                    controller.applyEventTriggers();
                }
            };
        }
    ]);

}());
