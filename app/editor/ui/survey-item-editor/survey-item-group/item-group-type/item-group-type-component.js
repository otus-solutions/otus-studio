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
        itemCandidateCheckbox: "=",
        tooltip: '@'
      }
    })
    .controller('itemGroupTypeCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;
  }

}());
