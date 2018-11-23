describe("SelectedSurveyTemplatesManagementService", function() {

  var Mock = {};
  var service;

  beforeEach(function() {
    angular.mock.module('studio');
    mockSurveyTemplates();

    inject(function(_$injector_) {
      service = _$injector_.get(
        'SelectedSurveyTemplatesManagementService');
    });
  });

  describe("selectSurveyTemplate method", function() {
    beforeEach(function() {
      service.selectSurveyTemplate(Mock.surveyTemplate_ONE);
    });

    it(
      "should put a selected survey template in selectedSurveyTemplates",
      function() {
        expect(service.selectedSurveyTemplates).toContain(Mock.surveyTemplate_ONE);
      });

  });

  describe("removeSurveyTemplate method", function() {
    beforeEach(function() {
      // Populate Array
      service.selectSurveyTemplate(Mock.surveyTemplate_ONE);
      // Remove
      service.removeSurveyTemplate(Mock.surveyTemplate_ONE);
    });

    it(
      "should remove a selected survey template in selectedSurveyTemplates",
      function() {
        expect(service.selectedSurveyTemplates).toEqual([]);
      });

  });

  describe("hasSelectedSurveyTemplate method", function() {

    it(
      "should return TRUE when the selectedSurveyTemplatesList is NOT empty",
      function() {
        service.selectSurveyTemplate(Mock.surveyTemplate_ONE);

        expect(service.hasSelectedSurveyTemplate()).toBe(true);
      });

    it(
      "should return FALSE when the selectedSurveyTemplatesList is empty",
      function() {
        expect(service.hasSelectedSurveyTemplate()).toBe(false);
      });

  });

  describe("hasOnlyOneSelectedSurveyTemplate method", function() {
    beforeEach(function() {
      service.selectSurveyTemplate(Mock.surveyTemplate_ONE);
    });

    it(
      "should return TRUE when the selectedSurveyTemplatesList contains only one template",
      function() {
        expect(service.hasOnlyOneSelectedSurveyTemplate()).toBe(true);
      });

    it(
      "should return FALSE when the selectedSurveyTemplatesList contais more than one template",
      function() {
        service.selectSurveyTemplate(Mock.surveyTemplate_ONE);
        expect(service.hasOnlyOneSelectedSurveyTemplate()).toBe(false);
      });

  });

  function mockSurveyTemplates() {
    Mock.surveyTemplate_ONE = {
      $$hashKey: 1,
      template_oid: 'survey.oid.1',
      name: 'one',
      version: 'survey.version.1',
      toJSON: function() {
        return '{}';
      }
    };

    Mock.surveyTemplate_TWO = {
      $$hashKey: 2,
      template_oid: 'survey.oid.2',
      name: 'two',
      version: 'survey.version.2',
      toJSON: function() {
        return '{}';
      }
    };
  }

});
