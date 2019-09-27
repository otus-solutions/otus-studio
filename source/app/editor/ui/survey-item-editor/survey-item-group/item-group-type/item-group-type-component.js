(function () {
  'use strict';

  angular.module('editor.ui')
    .component('itemGroupType', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-group/item-group-type/item-group-type-template.html',
      controller: 'itemGroupTypeCtrl as $ctrl',
      bindings: {
        type:'@',
        id:'@',
        click: '&',
        iconButton:'@',
        itemCandidateCheckbox: '=',
        tooltip: '@',
        monitoringCheckboxState: '&',
        stateColor: '@'
      }
    })
    .controller('itemGroupTypeCtrl', Controller);

  function Controller(){}
}());
