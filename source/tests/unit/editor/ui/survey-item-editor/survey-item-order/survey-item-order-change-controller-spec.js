describe('SurveyItemOrderChangeController Tests', function () {
  var controllerOne;
  var controllerTwo;
  var Mock = {};


  beforeEach(function () {
    mockData();
    angular.mock.module('studio');
  });

  beforeEach(function () {
    inject(function (_$controller_) {
      controllerOne = _$controller_('SurveyItemOrderChangeController', {data:Mock.dataOne});
      controllerTwo = _$controller_('SurveyItemOrderChangeController', {data:Mock.dataTwo});
    });
  });

  it('should create controller', function () {
    expect(controllerOne).toBeDefined();
    expect(controllerOne.selectedQuestionNeighbor).toEqual(0);
    expect(controllerOne.selectedCriteria).toEqual(1);
    expect(controllerOne.item).toEqual(Mock.dataOne.item);
    expect(controllerOne.position).toEqual(Mock.dataOne.position);
    expect(controllerOne.BUTTONS).toEqual(Mock.dataOne.buttons);
    expect(controllerOne.cancel).toEqual(Mock.dataOne.cancel);
    expect(controllerOne.TEXT).toEqual(Mock.dataOne.text);
    expect(controllerOne.questions).toEqual(Mock.questions);
  });

  it('should select question neighbor', function () {
    controllerOne.isBeginQuestion();
    expect(controllerOne.selectedQuestionNeighbor).toEqual(0);
    controllerOne.selectedCriteria = 0;
    controllerOne.isBeginQuestion();
    expect(controllerOne.selectedQuestionNeighbor).toEqual(-1);
  });

  it('should verify criteria range', function () {
    expect(controllerOne.criterias).toEqual([{label:"Após a", value: 1}]);
    expect(controllerTwo.criterias).toEqual([
      {label:"Início", value: 0},
      {label:"Após a", value: 1}
    ]);
  });


  function mockData() {
    Mock.questions = [
      {templateID: "TST2", position: 1},{templateID: "TST3", position: 2}
    ];
    Mock.dataOne = {
      item: {
        templateID: "TST1"
      },
      position: 1,
      text: "TEST",
      questions: [{templateID: "TST1"},{templateID: "TST2"},{templateID: "TST3"}],
      buttons:[{},{}],
      cancel: Function
    }

    Mock.dataTwo = {
      item: {
        templateID: "TST2"
      },
      position: 2,
      text: "TEST",
      questions: [{templateID: "TST1"},{templateID: "TST2"},{templateID: "TST3"}],
      buttons:[{},{}],
      cancel: Function
    }
  }
});
