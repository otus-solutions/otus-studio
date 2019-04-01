describe('Item Container Component Tests', function () {
  var Mock = {};
  var Injections = {};
  var controller;
  var DELETE_MSG = 'A exclusão de uma questão pode afetar as rotas do questionário, assim como apaga-lás! <br><br><b>Deseja realmente excluir esta questão?</b>';
  var DELETE_TITLE = 'ATENÇÃO';

  beforeEach(function () {
    mockData();
    angular.mock.module('studio', function ($provide) {
      
    });

    inject(function (_$injector_, _$controller_) {
      Injections = {
        'RemoveSurveyItemEventFactory' : _$injector_.get('RemoveSurveyItemEventFactory'),
        'MoveSurveyItemEventFactory' : _$injector_.get('MoveSurveyItemEventFactory'),
        '$mdDialog': _$injector_.get('$mdDialog'),
        'DialogService': _$injector_.get('DialogService'),
        'WorkspaceService': _$injector_.get('WorkspaceService'),
        '$window': _$injector_.get('$window'),
        '$mdSelect': _$injector_.get('$mdSelect')
      };
      controller = _$controller_('itemContainerCtrl', Injections);
      controller.item = Mock.item;
    });

    spyOn(Injections.DialogService, 'show').and.callThrough();
    spyOn(Injections.WorkspaceService, "getSurvey").and.returnValue(Mock.survey);
    spyOn(Mock.survey, "getItems").and.returnValue([Mock.item]);
    spyOn(Injections.MoveSurveyItemEventFactory, 'create').and.returnValue({execute:()=>{}});
    spyOn(Injections.RemoveSurveyItemEventFactory, 'create').and.returnValue({execute:()=>{}});
  });

  it('should defined controller', function () {
    expect(controller).toBeDefined();
    expect(controller.changeState).toBeDefined();
    expect(controller.deleteSurveyItem).toBeDefined();
    expect(controller.moveSurveyItem).toBeDefined();
    expect(controller.$onInit).toBeDefined();
  });

  it('should call onInit method', function () {
    controller.$onInit();
    expect(controller.css).toEqual({});
    expect(controller.event).toEqual({});
    expect(controller.isToShow).toBeFalsy();
    expect(controller.template.icon).toEqual('expand_more');
  });

  it('should change state method', function () {
    controller.$onInit();
    expect(controller.isToShow).toBeFalsy();
    expect(controller.template.icon).toEqual('expand_more');
    controller.changeState();
    expect(controller.isToShow).toBeTruthy();
    expect(controller.template.icon).toEqual('expand_less');
    controller.changeState();
    expect(controller.isToShow).toBeFalsy();
    expect(controller.template.icon).toEqual('expand_more');
  });

  it('should delete survey item', function () {
    controller.deleteSurveyItem();
    expect(Injections.DialogService.show).toHaveBeenCalledTimes(1);
    Injections.DialogService.data.buttons[1].action(true);
    expect(Injections.RemoveSurveyItemEventFactory.create).toHaveBeenCalledTimes(1);
  });

  it('should move survey item', function () {
    controller.moveSurveyItem();
    expect(Injections.DialogService.show).toHaveBeenCalledTimes(1);
    // console.log(Injections.DialogService.data.buttons)
    Injections.DialogService.data.buttons[1].action(Mock.item, 0);
    expect(Injections.MoveSurveyItemEventFactory.create).toHaveBeenCalledTimes(1);

  });

  function mockData() {
    Mock.item = {customID: 'TST1'}
    Mock.survey = {getItems:function(){}}
    // Mock.dataDelete = {
    //   header: "Excluir Questão TST1",
    //   title: DELETE_TITLE,
    //   text: DELETE_MSG,
    //   dialogDimensions: {
    //     width: '800px'
    //   },
    //   buttons : [
    //     {message:"CANCELAR",class: "md-primary md-layoutTheme-theme", action: Function},
    //     {message:"SIM",class: "md-primary md-raised md-layoutTheme-theme", action: Function}
    //   ],
    //   cancel: Function,
    //   url: 'app/shared/commons/dialog/component/dialog-template.html',
    //   ctrl: 'dialogController'
    // }
  }

});
