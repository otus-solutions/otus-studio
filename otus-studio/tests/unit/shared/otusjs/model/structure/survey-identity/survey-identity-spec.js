describe('SurveyIdentity', function() {
    var Mock = {};
    Mock.NAME = 'Identity Name';
    Mock.ACRONYM = 'ACRONYM';
    Mock.VERSION = 'A';

    var surveyIdentity;

    beforeEach(function() {
        module('otusjs');

        mockJson();

        inject(function(_$injector_) {
            factory = _$injector_.get('SurveyIdentityFactory');
        });

        surveyIdentity = factory.create(Mock.NAME, Mock.ACRONYM, Mock.VERSION);
    });

    describe('toJson method', function() {

        it('should return a well formatted json based on instance of SurveyIdentity', function() {
            expect(surveyIdentity.toJson()).toEqual(Mock.json);
        });

    });

    function mockJson() {
        Mock.json = JSON.stringify({
            extents: 'StudioObject',
            objectType: 'SurveyIdentity',
            name: Mock.NAME,
            acronym: Mock.ACRONYM,
            // version: Mock.VERSION,
            recommendedTo: '',
            description: '',
            keywords: []
        });
    }

});
