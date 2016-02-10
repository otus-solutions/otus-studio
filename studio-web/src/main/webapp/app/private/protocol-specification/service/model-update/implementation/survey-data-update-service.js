(function() {

    angular
        .module('protocolSpecification')
        .service('SurveyDataUpdater', ['StringNormalizer', 'TextQuestionParser', SurveyDataUpdater]);

    function SurveyDataUpdater(StringNormalizer, TextQuestionParser) {
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
            } else {
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
                var question = null;
                if (questionType == 'text') {
                    question = TextQuestionParser.fromDom(data.value);
                } else if (questionType == 'checkbox') {
                    question = CheckboxQuestionParser.fromDom(data.value);
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

}());
