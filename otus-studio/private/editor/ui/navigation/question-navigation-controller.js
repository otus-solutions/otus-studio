(function() {
    'use strict';

    angular
    .module('editor.ui')
    .controller('QuestionNavigationController', QuestionNavigationController);


    function QuestionNavigationController() {
        var self = this;

        var navigations = [
            { "name":"1", "to":"ELEA1", "rules":[{"expression": "Igual", "value": "10"}, {"expression": "Igual", "value": "50"}]},
            { "name":"3", "to":"ELEA3", "rules":[{"expression": "Menor", "value": "0"}]}
        ];

        /* Public interface */
        self.navigations = navigations;

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
