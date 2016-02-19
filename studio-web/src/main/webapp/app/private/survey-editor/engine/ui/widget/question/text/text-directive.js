(function() {

    angular
        .module('editor.engine.ui')
        .directive('textQuestion', textQuestion);

    textQuestion.$inject = ['editor.engine.ui.mpath'];

    function textQuestion(mpath) {
        var ddo = {
            templateUrl: mpath.getWidgetPath('text'),
            retrict: 'E'
        };

        return ddo;
    }

}());
