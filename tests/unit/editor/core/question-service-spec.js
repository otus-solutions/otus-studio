describe('QuestionService', function() {
  var Mock = {};
  var service;

  var QUESTION_TYPE = 'SingleSelectionQuestion';

  beforeEach(function() {
    angular.mock.module('studio');

    inject(function(_$injector_, _$rootScope_) {
      service = _$injector_.get('QuestionService', {
        $rootScope: _$rootScope_,
        WorkspaceService: mockWorkspaceService(_$injector_),
        AddQuestionService: mockAddQuestionService(_$injector_)
      });
    });
  });

  describe('addQuestion method', function() {

    beforeEach(function() {
      service.addQuestion(QUESTION_TYPE);
    });

    xit(
      'should call AddQuestionService.execute with questionType parameter',
      function() {
        expect(Mock.AddQuestionService.execute).toHaveBeenCalledWith(
          Mock.question.objectType);
      });

    xit('should store yourself in userEdits', function() {
      expect(Mock.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledWith(
        service);
    });

    xit('should call Workspace.saveWork()', function() {
      expect(Mock.WorkspaceService.saveWork).toHaveBeenCalledWith();
    });

  });

  function mockAddQuestionService($injector) {
    Mock.question = $injector.get('SurveyItemFactory').create(QUESTION_TYPE,
      'SSQ');
    Mock.AddQuestionService = $injector.get('AddQuestionService');
    spyOn(Mock.AddQuestionService, 'execute');
    return Mock.AddQuestionService;
  }

  function mockWorkspaceService($injector) {
    Mock.WorkspaceService = $injector.get('WorkspaceService');
    Mock.WorkspaceService.workspace = {
      isdb: {
        userEdits: {
          store: function(object) {}
        }
      }
    };

    spyOn(Mock.WorkspaceService, 'saveWork');
    spyOn(Mock.WorkspaceService.workspace.isdb.userEdits, 'store');

    return Mock.WorkspaceService;
  }

});
