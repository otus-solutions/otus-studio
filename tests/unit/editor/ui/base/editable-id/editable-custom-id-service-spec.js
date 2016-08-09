describe('EditableCustomIDService', function() {
    var Mock = {};
    var service;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            service = _$injector_.get('EditableCustomIDService', {
                'WorkspaceService': mockWorkspaceService(_$injector_),
                'UpdateQuestionEventFactory': mockUpdateQuestionEventFactory(_$injector_),
                '$mdToast': mockMdToast(_$injector_)
            });
            mockItem(_$injector_);
            mockEditableID(_$injector_);
        });
        mockEvent();
    });

    describe('isEmpty method', function() {

        it("should return true when a passed param was empty", function() {
            var custumizedID = '';
            expect(service.isEmpty(custumizedID)).toBe(true);
        });

        it("should return false when a passed param was empty", function() {
            var custumizedID = 'MyID';
            expect(service.isEmpty(custumizedID)).toBe(false);
        });

    });

    describe('removeAllBlankSpaces method', function() {

        it("should return without blank spaces - blank spaces before and after", function() {
            var custumizedID = '  MyID    ';
            expect(service.removeAllBlankSpaces(custumizedID)).toBe('MyID');
        });

        it("should return without blank spaces - blank spaces between caracteres", function() {
            var custumizedID = 'M    y    I     D';
            expect(service.removeAllBlankSpaces(custumizedID)).toBe('MyID');
        });

        it("should return without blank spaces - line breaks", function() {
            var custumizedID = '\n M \n yID \n';
            expect(service.removeAllBlankSpaces(custumizedID)).toBe('MyID');
        });

    });

    describe('restoreScreenID method', function() {

        it('should restore the id with the customOptionID', function() {
            service.restoreScreenID(Mock.event, Mock.editableID_Object);
            expect(Mock.event.target.innerText).toBe('Q1');
        });

    });

    describe('hasChanges method', function() {

        it('should return true if a customizedID is not equal a editableID_Object.getCustomizedID()', function() {
            expect(service.hasChanges('AnotherID', Mock.editableID_Object)).toBe(true);
        });

        it('should return false if a customizedID is not equal a editableID_Object.getCustomizedID()', function() {
            expect(service.hasChanges('Q1', Mock.editableID_Object)).toBe(false);
        });

    });

    function mockWorkspaceService($injector) {
        Mock.WorkspaceService = $injector.get('WorkspaceService');
        spyOn(Mock.WorkspaceService, 'getSurvey');
        return Mock.WorkspaceService;
    }

    function mockUpdateQuestionEventFactory($injector) {
        Mock.UpdateQuestionEventFactory = $injector.get('UpdateQuestionEventFactory');
        return Mock.UpdateQuestionEventFactory;
    }

    function mockMdToast($injector) {
        Mock.mdToast = $injector.get('$mdToast');
        return Mock.mdToast;
    }

    function mockEvent() {
        Mock.event = {};
        Mock.event.target = {};
        Mock.event.target.innerText = "Question1";
    }

    function mockEditableID($injector) {
        var factory = $injector.get('EditableIDFactory', {
            'UpdateSurveyItemCustomID': mockUpdateSurveyItemCustomID($injector)
        });

        Mock.editableID_Object = factory.create(Mock.item);
    }

    function mockUpdateSurveyItemCustomID($injector) {
        Mock.UpdateSurveyItemCustomID = $injector.get('UpdateSurveyItemCustomID');
        spyOn(Mock.UpdateSurveyItemCustomID, 'execute');
        return Mock.UpdateSurveyItemCustomID;
    }

    function mockItem($injector) {
        Mock.item = $injector.get('SurveyItemFactory').create('CalendarQuestion', 'Q1');
    }

});
