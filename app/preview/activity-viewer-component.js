(function () {
  'use strict';

  angular
    .module('preview')
    .component('activityViewer', {
      controller: 'activityViewerCtrl',
      templateUrl: 'app/preview/activity-viewer-template.html'
    })
    .controller('activityViewerCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
//TODO: DOING
    }
  }
}());
