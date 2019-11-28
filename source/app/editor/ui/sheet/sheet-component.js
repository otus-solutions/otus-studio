(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('studioSheet', {
      templateUrl: 'app/editor/ui/sheet/sheet.html',
      controller: Controller,
      bindings: {
        template: '<'
      }
    }).directive("scroll", function ($window) {
    return {
      link: function() {
        angular.element($window).bind("scroll", function() {
          console.log('Scrolling');
        });
      }
    }
  });

  Controller.$inject = [
    'WorkspaceService',
    '$window',
    'PageAnchorService',
    '$scope',
    '$interval'
  ];

  function Controller(WorkspaceService, $window, PageAnchorService, $scope, $interval) {
    var self = this;

    self.limit = 1;

    angular.element(document.querySelector('#stage-component')).bind('scroll', function(){
        self.loadMore();
    });

    self.loadMore = function (){
      if ( document.querySelector('#stage-component').clientHeight +
        $('#stage-component').scrollTop() >= document.querySelector('#stage-component').scrollHeight && self.template.getItems().length > self.limit )
      {
        self.limit += 5;
        if (self.limit > self.template.getItems().length){
          self.limit = angular.copy(self.template.getItems().length);
        }
      }
    };

    self.$onInit = function () {
      $scope.itens = self.template.getItems().length;

      $interval(function () {
        self.limit += 1;
      }, 200, self.template.getItems().length);
      PageAnchorService.setUp(self.template.SurveyItemManager);
      $window.sessionStorage.setItem('surveyTemplate_OID', WorkspaceService.getSurvey().oid);
    };

    self.$onDestroy = function() {
      WorkspaceService.closeWork();
      $window.sessionStorage.removeItem('surveyTemplate_OID');
    }



  }

})();
