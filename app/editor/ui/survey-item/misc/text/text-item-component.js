(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('textItem', {
      templateUrl: 'app/editor/ui/survey-item/misc/text/text-item-template.html',
      bindings: {
        item: '<'
      }
    });

}());
