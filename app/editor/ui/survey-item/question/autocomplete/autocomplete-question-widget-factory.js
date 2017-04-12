(function() {
  'use strict';

  angular
    .module('editor.ui')
    .factory('AutocompleteQuestionWidgetFactory', AutocompleteQuestionWidgetFactory);

  AutocompleteQuestionWidgetFactory.$inject = ['AddDataSourceEventFactory', 'RemoveDataSourceEventFactory', '$q'];

  function AutocompleteQuestionWidgetFactory(AddDataSourceEventFactory, RemoveDataSourceEventFactory, $q) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(scope, element) {
      return new AutocompleteQuestionWidget(scope, element, AddDataSourceEventFactory, RemoveDataSourceEventFactory, $q);
    }

    return self;
  }

  function AutocompleteQuestionWidget(scope, element, AddDataSourceEventFactory, RemoveDataSourceEventFactory, $q) {
    var self = this;

    _init();

    function _init() {
      self.autoCompleteSettings = {
        selectedItem: null,
        searchText: "",
      };
    }

    /* Public methods */
    self.getClassName = getClassName;
    self.getUUID = getUUID;
    self.getElement = getElement;
    self.getParent = getParent;
    self.getItem = getItem;
    self.getTemplate = getTemplate;
    self.addDataSource = addDataSource;
    self.removeDataSource = removeDataSource;
    self.dummyQuery = dummyQuery;

    // TODO: It needs to use a query of model.
    function dummyQuery(typedText) {
      var deferred = $q.defer();
      deferred.resolve(_stateList);
      return deferred.promise;
    }

    function getClassName() {
      return 'AutocompleteQuestionWidget';
    }

    function addDataSource(dataSourceName) {
      AddDataSourceEventFactory.create().execute(self.getItem(), dataSourceName);
    }

    function removeDataSource(dataSourceName) {
      RemoveDataSourceEventFactory.create().execute(self.getItem(), dataSourceName);
    }

    function getUUID() {
      return scope.uuid;
    }

    function getElement() {
      return element;
    }

    function getParent() {
      return scope.$parent.widget;
    }

    function getItem() {
      return getParent().getItem();
    }

    function getTemplate() {
      return '<autocomplete-question></autocomplete-question>';
    }

    var _stateList = ["Acre",
      "Alagoas",
      "Amapá",
      "Amazonas",
      "Bahia",
      "Ceará",
      "Distrito Federal",
      "Espírito Santo",
      "Goiás",
      "Maranhão",
      "Mato Grosso",
      "Mato Grosso do Sul",
      "Minas Gerais",
      "Pará",
      "Paraíba",
      "Paraná",
      "Pernambuco",
      "Piauí",
      "Rio de Janeiro",
      "Rio Grande do Norte",
      "Rio Grande do Sul",
      "Rondônia",
      "Roraima",
      "Santa Catarina ",
      "São Paulo",
      "Sergipe",
      "Aracaju ",
      "Tocantins"
    ];
  }

}());
