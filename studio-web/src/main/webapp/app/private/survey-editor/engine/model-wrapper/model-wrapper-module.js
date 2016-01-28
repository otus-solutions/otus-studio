(function() {

    var module = angular.module('model.wrapper', []);

    /*******************************************************************************************************************/
    /* Module services */

    module.service('SurveyDataUpdater', ['StringNormalizer', 'TextQuestionParser', 'CheckboxQuestionParser',
        function(StringNormalizer, TextQuestionParser, CheckboxQuestionParser) {
            const NAME = 1;
            const PROPERTY = 2;

            var self = this,
                model = [];

            /* Public interface */
            self.update = update;
            self.updateIdentity = updateIdentity;
            self.updateQuestions = updateQuestions;

            /* Public interface implementation */
            function update(editingEvent, survey) {
                var updateType = identifyUpdateType(editingEvent.target, editingEvent.type);
                runUpdater(updateType, editingEvent, survey);
            }

            function identifyUpdateType(target, type) {
                var model = target.split('.');
                var firstLetter = model[NAME].slice(0, 1),
                    restOfString = model[NAME].slice(1);

                return 'update'.concat(firstLetter.toUpperCase().concat(restOfString)).replace(/\[.\]/, '');
            }

            function runUpdater(updateType, data, survey) {
                self[updateType](data, survey);
            }

            function updateIdentity(editingEvent, survey) {
                var data = editingEvent.newState,
                    model = data.ngModel.split('.');

                if (model[NAME] == 'keywords') {
                    survey[model[NAME]][model[PROPERTY]] = [];
                    var keywordList = identityData.newState.value.split(',');
                    keywordList.forEach(function(keyword) {
                        survey[model[NAME]][model[PROPERTY]].push(keyword.trim());
                    });
                }
                else {
                    survey[model[NAME]][model[PROPERTY]] = data.value;
                }
            }

            function updateQuestions(editingEvent, survey) {
                var data = editingEvent.newState;

                var questionType = data.value.attributes.type.nodeValue,
                    modelList = data.ngModel.split('.'),
                    questionIndex, labelIndex, contentIndex;

                modelList.shift();
                modelList.forEach(function(m) {
                    var model = extractModel(m),
                        index = extractModelIndex(m);

                    if (index || index === 0) {
                        if (model == 'questions') questionIndex = index;
                        else if (model == 'labels') labelIndex = index;
                        else if (model == 'content') contentIndex = index;
                    }
                });

                if (survey.questions.length > 0 && (questionIndex || questionIndex === 0)) {
                    survey.questions[questionIndex].labels[labelIndex].content[contentIndex].text = data.value;
                }

                if (editingEvent.target == 'survey.questions') {
                    if (questionType == 'text') {
                        var question = TextQuestionParser.fromDom(data.value);
                    } else if (questionType == 'checkbox') {
                        var question = CheckboxQuestionParser.fromDom(data.value);
                    }

                    survey.questions.push(question);
                }
            }

            function extractModel(modelName) {
                return modelName.replace(/\[.\]/, '');
            }

            function extractModelIndex(modelName) {
                var index = modelName.replace(/(.*\[)/, '');
                    index = index.replace(/(\])/, '');
                return parseInt(index);
            }
        }
    ]);

    module.service('SurveyLoader', ['Survey', function(Survey) {
        var self = this;

        /* Public interface */
        self.newSurvey = newSurvey;

        /* Public interface implementation */
        function newSurvey() {
            return new Survey();
        }
    }]);

    /*******************************************************************************************************************/
    /* Module factories */

    module.factory('Survey', ['SurveyIdentity', function(SurveyIdentity) {
        return function Survey() {
            this.objectType = 'Survey';
            this.identity = new SurveyIdentity();
            this.questions = [];

            this.getQuestion = function getQuestion(index) {
                return this.questions[index];
            }
        };
    }]);

    module.factory('SurveyIdentity', [function() {
        return function SurveyIdentity() {
            this.objectType = 'SurveyIdentity';
            this.name = '';
            this.acronym = '';
            this.version = '';
            this.recommendedTo = '';
            this.description = '';
            this.keywords = [];
        };
    }]);

    module.service('TextQuestionParser', ['TextQuestion', function(TextQuestion) {
        var self = this;

        self.fromDom = fromDom;

        function fromDom(dom) {
            var question = new TextQuestion();
            question.labels[0].content[0].text = dom.children[0].children[0].children[1].value;
            return question;
        }
    }]);

    module.service('CheckboxQuestionParser', ['CheckboxQuestion', function(CheckboxQuestion) {
        var self = this;

        self.fromDom = fromDom;

        function fromDom(dom) {
            var question = new CheckboxQuestion();
            question.labels[0].content[0].text = dom.children[0].children[1].children[1].value;
            return question;
        }
    }]);

    module.factory('TextQuestion', ['Label', function(Label) {
        return function TextQuestion() {
            this.extends = 'Question';
            this.objectType = 'TextQuestion';
            this.dataType = 'String';
            this.oid = '';
            this.labels = [new Label()];

            this.getLabel = function getLabel(index) {
                return this.labels[index];
            }
        };
    }]);

    module.factory('CheckboxQuestion', ['Label', function(Label) {
        return function CheckboxQuestion() {
            this.extends = 'Question';
            this.objectType = 'CheckboxQuestion';
            this.dataType = 'Boolean';
            this.oid = '';
            this.labels = [new Label()];

            this.getLabel = function getLabel(index) {
                return this.labels[index];
            }
        };
    }]);

    module.factory('Label', ['LabelContent', function(LabelContent) {
        return function Label() {
            this.extends = 'StudioObject';
            this.objectType = 'Label';
            this.oid = '';
            this.content = [new LabelContent()];

            this.getContent = function getContent(index) {
                return this.content[index];
            }
        };
    }]);

    module.factory('LabelContent', [function() {
        return function LabelContent() {
            this.extends = 'StudioObject';
            this.objectType = 'LabelContent';
            this.oid = '';
            this.locale = 'pt_BR';
            this.text = '';
        };
    }]);

}());
