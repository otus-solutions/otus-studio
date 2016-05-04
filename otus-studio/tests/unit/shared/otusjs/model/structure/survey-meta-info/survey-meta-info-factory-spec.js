describe('SurveyMetaInfoFactory', function() {
    var Mock = {};
    var surveyMetaInfo;

    beforeEach(function() {
        module('otusjs');

        mockDate();

        inject(function(_$injector_) {
            factory = _$injector_.get('SurveyMetaInfoFactory');
        });

        surveyMetaInfo = factory.create();
    });

    describe('Dependencies uses', function() {

        it('Date.now() should be called in create() method', function() {
            expect(Date.now).toHaveBeenCalled();
        });

    });

    describe('SurveyMetaInfoFactory.create()', function() {

        it('should return an SurveyMetaInfo with creation date time equal to now date', function() {
            expect(surveyMetaInfo.creationDatetime).toEqual(Mock.now);
        });

        it('should return an SurveyMetaInfo that extends from StudioObject', function() {
            expect(surveyMetaInfo.extents).toBe('StudioObject');
        });

        it('should return an SurveyMetaInfo object type', function() {
            expect(surveyMetaInfo.objectType).toBe('SurveyMetaInfo');
        });

    });

    function mockOIDHashGenerator($injector) {
        Mock.OIDHashGenerator = $injector.get('OIDHashGenerator');

        /* Overrides original behavior */
        Mock.OIDHashGenerator.generateHash = function(seed) {
            return 0;
        };

        return Mock.OIDHashGenerator;
    }

    function mockDate() {
        Mock.now = Date.now();
        spyOn(Date, 'now').and.returnValue(Mock.now);
    }

});
