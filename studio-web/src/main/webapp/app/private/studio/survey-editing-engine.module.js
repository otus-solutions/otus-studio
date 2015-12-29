(function() {

    var module = angular.module('surveyEditing', ['survey', 'memory']);

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
                console.log(editingEvent);
                // validate editingEvent
                // log editingEvent
                generalEditingMemoryCache.storeState(editingEvent);

                if (editingEvent.type == 'update-model') {
                    SurveyDataUpdater.update(editingEvent, getSurvey());
                }
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
                        var processor = new EventTriggerProcessor('survey.questions', 'update-model');
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
