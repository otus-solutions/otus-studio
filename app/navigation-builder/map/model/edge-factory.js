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
      options.isDefault = true;
      // options.color = '#448AFF';
      return new Edge(options);
    }

    function createForAlterantivePath(options) {
      options.isDefault = false;
      // options.color = '#616161';
      if (!options.isFromOrphan) {
        options.type = 'curvedArrow';
      }
      return new Edge(options);
    }

    return self;
  }

  function Edge(options) {
    var self = this;
    self.id = options.source + '_' + options.target;
    self.source = options.source;
    self.target = options.target;
    self.color = options.color;
    self.type = options.type;
    self.isDefault = options.isDefault;
  }
}());
