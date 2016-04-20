describe('EditingSourceService', function() {
    var domComponent;
    var attrs = {};
    var editingSource;
    var triggerFactory;

    beforeEach(function() {
        module('studio');
        module('otusjs');

        inject(function(_$injector_) {
            service = _$injector_.get('EditingSourceService', {
                TriggerFactory: mockTriggerFactory(_$injector_),
                EditingSourceFactory: mockEditingSourceFactory(_$injector_)
            });
        });
    });

    describe('should create editing source', function() {
        it('create using correct params', function() {
            spyOn(editingSource, 'produceEditingSource');

            service.createEditingSource(domComponent, attrs);
            expect(editingSource.produceEditingSource).toHaveBeenCalled();
        });
    });

    describe('should create trigger and append', function() {
        it('receaving source, create trigger and append data', function() {
            spyOn(triggerFactory, 'produceTrigger');

            service.appendTriggersTo(editingSource);
            expect(triggerFactory.produceTrigger).toHaveBeenCalled();
        });
    });

    function mockTriggerFactory($injector) {
        triggerFactory = $injector.get('TriggerFactory');
        return $injector.get('TriggerFactory');
    }

    function mockEditingSourceFactory($injector) {
        editingSource = $injector.get('EditingSourceFactory');
        return editingSource;
    }
});
