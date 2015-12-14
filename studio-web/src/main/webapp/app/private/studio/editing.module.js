(function() {

    var module = angular.module('editing', ['survey', 'memory']);

    /* Module services */

    module.service('EditingService', ['Survey', 'SurveyState', 'MemoryService',
        function(Survey, EditingState, MemoryService) {
            var self = this;

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
            }

            function open() {
                var state = SurveyState.generateOpen(self.survey);
                MemoryService.storeState(state);
            }

            function close() {
                SurveyState.generateClose(self.survey);
            }

            function save() {
                var state = SurveyState.generateSave(self.survey);
                MemoryService.storeState(state);
            }

            function getSurvey() {
                return getCurrentState().survey;
            }

            function getCurrentState() {
                return MemoryService.getMostRecentState();
            }

            function editData(editingEvent) {
                console.log(editingEvent);
            }
        }
    ]);

    module.service('SurveyState', [function() {
        var self = this;

        /* Public interface */
        self.generateOpen = generateOpen;
        self.generateClose = generateClose;
        self.generateSave = generateSave;

        /* Public interface implementation */
        function generateOpen(survey) {
            return createState('OPENED', survey)
        }

        function generateClose(survey) {
            return createState('CLOSED', survey);
        }

        function generateSave(survey) {
            return createState('SAVED', survey);
        }

        function createState(value, survey) {
            return {
                timestamp: Date.now(),
                value: value,
                survey: survey
            };
        }
    }]);

    /* Module factories */

    module.factory('EditingEvent', [function() {
        return function() {
            this.type = null,
            this.oldState = null,
            this.newState = null
        };
    }]);

    module.factory('EditingDataHandler', ['EditingService',
        function(EditingService){
            return {
                handle: function(data) {
                    EditingService.editData(data);
                }
            };
        }
    ]);

    module.factory('DataStrucureWrapper', [function() {
        var wrapperFactory = {
            wrap: function(dataStructure) {
                if (dataStructure.localName == 'input') {
                    return this.inputText(dataStructure);
                }
            },
            inputText: function(dataStructure) {
                return {
                    value: dataStructure.value
                }
            }
        };

        return wrapperFactory;
    }]);

    /* Module directives */

    module.directive('editingSource', ['EditingDataHandler', 'EditingEvent', 'DataStrucureWrapper',
        function(EditingDataHandler, EditingEvent, DataStrucureWrapper) {
            var dirController = function($scope, $element, $attrs) {
                var self = this;

                // self.dataHandler = new EditingDataHandler();

                /* Public interface */
                self.storeOldState = storeOldState;
                self.storeNewState = storeNewState;
                self.fireEditingEvent = fireEditingEvent;

                /* Public interface implementations */
                function storeOldState(dataStructure) {
                    var data = DataStrucureWrapper.wrap(dataStructure);
                    self.event = new EditingEvent();
                    self.event.oldState = data;
                }

                function storeNewState(dataStructure) {
                    var data = DataStrucureWrapper.wrap(dataStructure);
                    self.event.newState = data;
                }

                function fireEditingEvent() {
                    self.event.type = 'update';
                    EditingDataHandler.handle(self.event);
                }
            };

            return {
                controller: dirController,
                link: function(scope, element, attr, controller) {
                    element.on('focus', function() {
                        controller.storeOldState(this);
                    });

                    element.on('blur', function() {
                        controller.storeNewState(this);
                        controller.fireEditingEvent();
                    });
                }
            };
        }
    ]);

}());
