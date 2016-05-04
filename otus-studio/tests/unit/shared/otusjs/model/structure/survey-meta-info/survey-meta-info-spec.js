describe('SurveyMetaInfo', function() {
    var Mock = {};
    var surveyMetainfo;

    beforeEach(function() {
        module('otusjs.model');

        mockDatetime();
        mockJson();

        inject(function(_$injector_) {
            factory = _$injector_.get('SurveyMetaInfoFactory');
            surveyMetainfo = factory.create();
        });
    });

    describe('toJson method', function() {

        it('should return a well formatted json based on instance of SurveyMetaInfo', function() {
            expect(surveyMetainfo.toJson()).toEqual(Mock.json);
        });

    });

    function mockJson() {
        Mock.json = JSON.stringify({
            extents: 'StudioObject',
            objectType: 'SurveyMetaInfo',
            creationDatetime: Mock.now,
            otusStudioVersion: ''
        });
    }

    function mockDatetime() {
        Mock.now = Date.now();
        spyOn(Date, 'now').and.returnValue(Mock.now);
    }

});
