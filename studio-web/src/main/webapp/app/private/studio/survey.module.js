(function() {

    var module = angular.module('survey', []);

    /*******************************************************************************************************************/
    /* Module services */

    module.service('SurveyDataUpdater', [function() {
        const NAME = 1;
        const PROPERTY = 2;

        var self = this,
            model = [];

        /* Public interface */
        self.update = update;
        self.updateIdentity = updateIdentity;

        /* Public interface implementation */
        function update(newIdentityData, survey) {
            var updateType = identifyUpdateType(newIdentityData.type);
            runUpdater(updateType, newIdentityData, survey);
        }

        function runUpdater(updateType, newIdentityData, survey) {
            self[updateType](newIdentityData, survey);
        }

        function identifyUpdateType(ngModel) {
            model = ngModel.split('.');

            var firstLetter = model[NAME].slice(0, 1),
                restOfString = model[NAME].slice(1);

            return 'update'.concat(firstLetter.toUpperCase().concat(restOfString));
        }

        function updateIdentity(newIdentityData, survey) {
            if (model[NAME] == 'keywords') {
                survey[model[NAME]][model[PROPERTY]] = [];
                var keywordList = newIdentityData.newState.value.split(',');
                keywordList.forEach(function(keyword) {
                    survey[model[NAME]][model[PROPERTY]].push(keyword.trim());
                });
            }
            else {
                survey[model[NAME]][model[PROPERTY]] = newIdentityData.newState.value;
            }
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

}());
