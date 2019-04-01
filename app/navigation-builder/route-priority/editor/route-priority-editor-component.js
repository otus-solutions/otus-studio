(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationRoutePriority')
    .component('otusRouteEditorPriority', {
      templateUrl: 'app/navigation-builder/route-priority/editor/route-priority-editor.html',
      controller: component,
      bindings: {
        node: '<',
        onConfirm: '&'
      }
    });

  component.$inject = [];

  function component() {

  }

}());
