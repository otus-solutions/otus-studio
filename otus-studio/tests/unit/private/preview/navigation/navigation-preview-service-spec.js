describe('NavigationPreviewService', function() {
    var NavigationPreviewService;

    /* @BeforeScenario */
    beforeEach(function() {
        module('preview');

        inject(function(_$injector_) {
            /* @InjectMocks */
            NavigationPreviewService = _$injector_.get('NavigationPreviewService');
        });
    });

    describe('createGraph function', function() {

        xit('should calls the init function', function() {

        });
    });

});
