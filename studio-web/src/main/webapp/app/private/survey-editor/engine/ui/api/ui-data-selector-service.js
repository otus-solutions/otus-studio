(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .service('UIDataSelector', UIDataSelector);

    UIDataSelector.$inject = ['WorkspaceService'];

    function UIDataSelector(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.select = select;

        function select(target) {
            var targetList = target.split('.');
            var selectedQuestion = WorkspaceService.workspace.project.survey[targetList[1]][targetList[2]];
            console.log(selectedQuestion);
        }
    }

}());
