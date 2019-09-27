(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusStage', {
      templateUrl: 'app/editor/ui/stage/stage.html',
      bindings: {
        template: '<'
      }
    });

}());
