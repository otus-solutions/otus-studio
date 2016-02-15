(function() {
    'use strict';

    angular
        .module('spec')
        .factory('SurveyFactory', SurveyFactory);

    SurveyFactory.$inject = ['SurveyIdentityFactory'];

    function SurveyFactory(SurveyIdentityFactory) {
        var self = this;

        /* Public interdace */
        self.create = create;

        function create() {
            return new Survey(SurveyIdentityFactory);
        }

        return self;
    }

    function Survey(SurveyIdentityFactory) {
        this.objectType = 'Survey';
        this.identity = SurveyIdentityFactory.create();
        this.questions = [];

        this.getQuestion = function getQuestion(index) {
            return this.questions[index];
        };
    }

}());
