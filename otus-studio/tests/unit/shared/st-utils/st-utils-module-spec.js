describe('Studio Utils Test Suite', function() {

    var $injector;
    var Mock = {};

    beforeEach(function() {
        $injector = angular.injector(['utils']);
    });

    describe('UUID Service when UUIDService.generateUUID()', function() {
        var service;

        beforeEach(function() {
            $injector = angular.injector(['utils']);
            service = $injector.get('UUID');
        });

        it('should returns a random UUID', function() {
            expect(service.generateUUID()).not.toBeNull();
        });

        it('should call UUID.v1 method', function() {
            spyOn(uuid, 'v1');

            service.generateUUID();

            expect(uuid.v1).toHaveBeenCalled();
        });
    });

    describe('SurveyUUIDGenerator Service when SurveyUUIDGenerator.generateSurveyUUID()', function() {

        beforeEach(function() {
            module('utils');

            inject(function(_$injector_) {
                SurveyUUIDGenerator = _$injector_.get('SurveyUUIDGenerator', {
                    '$window': mockWindow(_$injector_),
                    'UUID': mockUUID(_$injector_)
                });
            });
        });

        it('should returns a encoded UUID', function() {
            expect(SurveyUUIDGenerator.generateSurveyUUID()).not.toBeNull();
        });

        it('should returns a encoded UUID with userUUID, repositoryUUID, surveyUUID', function() {
            var decodedUUID = Base64.decode(SurveyUUIDGenerator.generateSurveyUUID());
            expect(decodedUUID).toContain("userUUID","repositoryUUID","surveyUUID");
        });

        it('should calls a base64 encoded function', function() {
            spyOn(Base64, 'encode');

            SurveyUUIDGenerator.generateSurveyUUID();

            expect(Base64.encode).toHaveBeenCalled();
        });

    });

    function mockWindow($injector) {
        Mock.$window = $injector.get('$window');
        return Mock.$window;
    }

    function mockUUID(_$injector_) {
        Mock.UUID = $injector.get('UUID');
        return Mock.UUID;
    }

});
