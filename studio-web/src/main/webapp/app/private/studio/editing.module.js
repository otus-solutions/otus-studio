(function() {

    var module = angular.module('StudioApp');

    module.service('EditingService', ['Survey', function(Survey) {

        var self = this;

        /* Public interface */
        self.open = open;
        self.close = close;
        self.save = save;
        self.getSurvey = getSurvey;
        self.set = set;

        /* Private implementations */
        function init(survey) {
            self.survey = survey;
        }

        function open() {

        }

        function close() {

        }

        function save() {

        }

        function getSurvey() {
            return new Survey();
        }

        function set(data) {

        }

    }]);

    module.factory('Survey', function() {
        var survey = function() {
            this.objectType = 'Survey';
            this.identity = {
                objectType: 'SurveyIdentity',
            	name: '2. Altura Abdominal e Flexibilidade',
            	acronym: 'AAF',
            	version: 'A',
            	recommendedTo: 'Análise da relação entre a estatura e o perímetro abdominal.',
            	description: 'Formulário criado para constatar valores de altura abdominal e flexibilidade do indivíduo.',
            	keywords: ['abdomen', 'altura', 'flexibilidade']
            };
        };

        return survey;
    });

}());
