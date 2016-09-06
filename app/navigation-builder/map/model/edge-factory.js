(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.EdgeFactory', factory);

  function factory() {
    var self = this;

    self.create = create;
    self.createForDefaultPath = createForDefaultPath;
    self.createForAlterantivePath = createForAlterantivePath;

    function create(options) {
      return new Edge(options);
    }

    function createForDefaultPath(options) {
      options.color = '#448AFF';
      return new Edge(options);
    }

    function createForAlterantivePath(options) {
      options.color = '#616161';
      options.type = 'curvedArrow';
      return new Edge(options);
    }

    return self;
  }

  function Edge(options) {
    var self = this;
    self.id = options.source + '_' + options.target;
    self.source = options.source;
    self.target = options.target;
    self.color = '#333';
    self.type = options.type;
  }
}());
