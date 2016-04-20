describe('EditingSourceFactory', function() {
    var esComponent = [jasmine.any(Object)];
    var esType = 'survey.type';
    var esId = 'survey.id';
    var esModel = 'model';
    var esTarget = 'survey.target';
    var esProcessor = 'survey.processor';

    /* @BeforeScenario */
    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('EditingSourceFactory');
        });

        editingSource = factory.produceEditingSource(esComponent, esType, esId, esModel, esTarget, esProcessor);

    });

    describe('should create editing source object', function() {

        it('set type value', function() {
            expect(editingSource.type).toBe(esType);
        });

        it('set id value', function() {
            expect(editingSource.id).toBe(esId);
        });

        it('set module value', function() {
            expect(editingSource.model).toBe(esModel);
        });

        it('set target value', function() {
            expect(editingSource.target).toBe(esTarget);
        });

        it('set processor value', function() {
            expect(editingSource.processor).toBe(esProcessor);
        });

        it('set component value', function() {
            expect(editingSource.component).toEqual(esComponent[0]);
        });

    });
});
