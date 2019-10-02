(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusStage', {
      templateUrl: 'app/editor/ui/stage/stage.html',
      controller: Controller,
      bindings: {
        template: '<'
      }
    });

  function Controller() {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;

    angular.element(document.querySelector('.stage-component')).bind('wheel', function(){
      didScroll = true;
    });

    angular.element(document.querySelector('.stage-component')).bind('touchmove', function(){
      didScroll = true;
    });

    setInterval(function() {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = angular.element(document.querySelector('.stage-component')).scrollTop();

      if(Math.abs(lastScrollTop - st) <= delta)
        return;

      if (st > lastScrollTop){
        $('.studio-header').removeClass('nav-down').addClass('nav-up');
      } else {
        $('.studio-header').removeClass('nav-up').addClass('nav-down');
      }

      lastScrollTop = st;
    }
  }
}());
