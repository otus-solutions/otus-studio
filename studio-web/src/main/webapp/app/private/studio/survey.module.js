(function() {

    var module = angular.module('survey', []);

    /*******************************************************************************************************************/
    /* Module services */

    module.service('SurveyDataUpdater', [function() {
        var self = this;

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
            var ngModelParts = ngModel.split('.'),
                firstLetter = ngModelParts[0].slice(0, 1),
                restOfString = ngModelParts[0].slice(1);

            return 'update'.concat(firstLetter.toUpperCase().concat(restOfString));
        }

        function updateIdentity(newIdentityData, survey) {
            var model = newIdentityData.ngModel.split('.');

            if (model[1] == 'keywords') {
                survey[model[0]][model[1]] = [];
                var keywordList = newIdentityData.newState.value.split(',');
                keywordList.forEach(function(keyword) {
                    survey[model[0]][model[1]].push(keyword.trim());
                });
            }
            else {
                survey[model[0]][model[1]] = newIdentityData.newState.value;
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
