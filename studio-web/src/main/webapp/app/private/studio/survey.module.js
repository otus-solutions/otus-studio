(function() {

    var module = angular.module('survey', []);

    /*******************************************************************************************************************/
    /* Module services */

    module.service('SurveyDataUpdater', ['TextQuestionParser', function(TextQuestionParser) {
        const NAME = 1;
        const PROPERTY = 2;

        var self = this,
            model = [];

        /* Public interface */
        self.update = update;
        self.updateIdentity = updateIdentity;
        self.updateQuestions = updateQuestions;

        /* Public interface implementation */
        function update(data, survey) {
            var updateType = identifyUpdateType(data.type);
            runUpdater(updateType, data, survey);
        }

        function runUpdater(updateType, data, survey) {
            self[updateType](data, survey);
        }

        function identifyUpdateType(ngModel) {
            model = ngModel.split('.');

            var firstLetter = model[NAME].slice(0, 1),
                restOfString = model[NAME].slice(1);

            return 'update'.concat(firstLetter.toUpperCase().concat(restOfString));
        }

        function updateIdentity(identityData, survey) {
            if (model[NAME] == 'keywords') {
                survey[model[NAME]][model[PROPERTY]] = [];
                var keywordList = identityData.newState.value.split(',');
                keywordList.forEach(function(keyword) {
                    survey[model[NAME]][model[PROPERTY]].push(keyword.trim());
                });
            }
            else {
                survey[model[NAME]][model[PROPERTY]] = identityData.newState.value;
            }
        }

        function updateQuestions(question, survey) {
            survey.questions.push(question);
            TextQuestionParser.fromDom(question.newState.value);
        }
    }]);

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
        return function() {
            this.objectType = 'Survey';
            this.identity = new SurveyIdentity();
            this.questions = [];
        };
    }]);

    module.factory('SurveyIdentity', [function() {
        return function() {
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
            console.log(question);
        }
    }]);

    module.factory('TextQuestion', ['Label', function(Label) {
        return function() {
            this.extends = 'Question';
            this.objectType = 'TextQuestion';
            this.dataType = 'String';
            this.oid = '';
            this.labels = [new Label()];
        };
    }]);

    module.factory('Label', ['LabelContent', function(LabelContent) {
        return function() {
            this.extends = 'StudioObject';
            this.objectType = 'Label';
            this.oid = '';
            this.content = [new LabelContent()];
        };
    }]);

    module.factory('LabelContent', [function() {
        return function() {
            this.extends = 'StudioObject';
            this.objectType = 'LabelContent';
            this.oid = '';
            this.locale = 'pt_BR';
            this.text = '';
        };
    }]);

}());
