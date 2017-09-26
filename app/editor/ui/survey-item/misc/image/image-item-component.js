(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('imageItem', {
      templateUrl: 'app/editor/ui/survey-item/misc/image/image-item-template.html',
      bindings: {
        item: '<'
      }
    });


}());
