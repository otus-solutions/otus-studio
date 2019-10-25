(function () {
  'use strict';

  angular
    .module('editor.workspace')
    .service('LoadingScreenService', Service);

  Service.$inject = [];

  function Service() {
    const LOGO_SOURCE = "app/static-resource/image/coruja_pesquisadora.png";
    const BACKGROUND_COLOR = "#448affaa";
    const MESSAGE = "Por favor, aguarde o carregamento.";
    const LOCKED_MESSAGE = "Loading bloqueado pela chave: ";
    const NEW_KEY_NOT_ADDED = "Não foi possível atribuir a nova chave: ";
    const NOT_FINISHED_WITH_KEY = "Não foi possível encerrar o loding com a chave: ";

    var self = this;
    self.key = '';
    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.start = start;
    self.finish = finish;
    self.startingLockedByKey = startingLockedByKey;
    self.finishUnlockedByKey = finishUnlockedByKey;
    self.changeMessage = changeMessage;

    onInit();

    /* Lifecycle methods */
    function onInit() {
      self.loading_screen = null;
      changeMessage();
    }

    function _printKeyMsg(key, msg) {
      var fullMsg = LOCKED_MESSAGE + self.key;
      if(key || msg) fullMsg += ' - ' + msg + key;
    }

    function startingLockedByKey(key) {
      if(!self.key || self.key === key){
        self.key = key;
        start();
      } else {
        _printKeyMsg(key, NEW_KEY_NOT_ADDED);
      }
    }

    function finishUnlockedByKey(key) {
      if(self.key === key){
        self.key = '';
        finish();
      } else {
        _printKeyMsg(key, NOT_FINISHED_WITH_KEY);
      }
    }

    function start() {
      if (!self.loading_screen){
        _constructor();
      }
    }

    function finish() {
      if(!self.key){
        if (self.loading_screen) {
          self.loading_screen.finish();
          self.loading_screen = null;
          changeMessage();
        }
      } else {
        _printKeyMsg();
      }
    }

    function changeMessage(message) {
      self.message = message !== undefined ? message : MESSAGE;
    }

    function _constructor() {
      self.loading_screen = pleaseWait({
        logo: LOGO_SOURCE,
        backgroundColor: BACKGROUND_COLOR,
        loadingHtml: "<p class='loading-message' style='color:#FFF;'>" + self.message + "</p>" +
          "<div class='sk-circle'>" +
          "<div class='sk-circle1 sk-child'></div>" +
          "<div class='sk-circle2 sk-child'></div>" +
          "<div class='sk-circle3 sk-child'></div>" +
          "<div class='sk-circle4 sk-child'></div>" +
          "<div class='sk-circle5 sk-child'></div>" +
          "<div class='sk-circle6 sk-child'></div>" +
          "<div class='sk-circle7 sk-child'></div>" +
          "<div class='sk-circle8 sk-child'></div>" +
          "<div class='sk-circle9 sk-child'></div>" +
          "<div class='sk-circle10 sk-child'></div>" +
          "<div class='sk-circle11 sk-child'></div>" +
          "<div class='sk-circle12 sk-child'></div>" +
          "</div>"
      });
    }
  }

}());
