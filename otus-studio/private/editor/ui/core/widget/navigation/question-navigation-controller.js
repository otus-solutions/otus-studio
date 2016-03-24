(function() {
    'use strict';

    angular
    .module('editor.ui')
    .controller('QuestionNavigationController', QuestionNavigationController);


    function QuestionNavigationController() {
        var self = this;

        var navigations = [
            { "name":"1", "to":"ELEA1", "rules":[{"expression": "Igual", "value": "10"}, {"expression": "Igual", "value": "50"}]},
            { "name":"2", "to":"ELEA2", "rules":[{"expression": "Maior", "value": "20"}]},
            { "name":"3", "to":"ELEA3", "rules":[{"expression": "Menor", "value": "0"}]}
        ];

        var questions = [{"id": "INA1"},{"id":"INA2"}];

        /* Public interface */
        self.navigations = navigations;
        self.questions = questions;

        /* Initialization */
        init();

        function init() {
        }

        function addNavigation(){

        }

        function removeNavigation(){

        }

        function addRule(){

        }

        function removeRule(){

        }

    }

}());
