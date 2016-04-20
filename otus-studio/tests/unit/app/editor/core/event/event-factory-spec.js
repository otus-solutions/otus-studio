describe('EventFactory', function() {
    var state = {};
    var listener;
    var mocks = {};

    beforeEach(function() {
        module('otusjs');
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('EventFactory', {
                EventTypeFactory: mock('EventTypeFactory', _$injector_),
                AddDataEventFactory: mock('AddDataEventFactory', _$injector_),
                PreAddDataEventFactory: mock('PreAddDataEventFactory', _$injector_),
                RemoveDataEventFactory: mock('RemoveDataEventFactory', _$injector_),
                SelectDataEventFactory: mock('SelectDataEventFactory', _$injector_),
                UpdateDataEventFactory: mock('UpdateDataEventFactory', _$injector_),
                PreUpdateDataEventFactory: mock('PreUpdateDataEventFactory', _$injector_),
                TouchDataEventFactory: mock('TouchDataEventFactory', _$injector_),
                UntouchDataEventFactory: mock('UntouchDataEventFactory', _$injector_)
            });
        });
    });

    describe('should be created correct events', function() {
        it('create ADD_DATA', function() {
            spyOn(mocks.AddDataEventFactory, 'create');
            var editingSource = {
                type: 'add-button',
                target: 'target',
                id: 'id'
            };
            var event = factory.create(editingSource, state, listener);
            expect(mocks.AddDataEventFactory.create).toHaveBeenCalled();
        });

        it('create PRE_ADD_DATA', function() {
            spyOn(mocks.PreAddDataEventFactory, 'create');
            var editingSource = {
                type: 'pre-add-button',
                target: 'target',
                id: 'id'
            };
            var event = factory.create(editingSource, state, listener);
            expect(mocks.PreAddDataEventFactory.create).toHaveBeenCalled();
        });

        it('create REMOVE_DATA', function() {
            spyOn(mocks.RemoveDataEventFactory, 'create');
            var editingSource = {
                type: 'remove-button',
                target: 'target',
                id: 'id'
            };
            var event = factory.create(editingSource, state, listener);
            expect(mocks.RemoveDataEventFactory.create).toHaveBeenCalled();
        });

        it('create SELECT_DATA', function() {
            spyOn(mocks.SelectDataEventFactory, 'create');
            listener = 'click';
            var editingSource = {
                type: 'question-editor',
                target: 'target',
                id: 'id'
            };
            var event = factory.create(editingSource, state, listener);
            expect(mocks.SelectDataEventFactory.create).toHaveBeenCalled();
        });

        it('create UPDATE_DATA', function() {
            spyOn(mocks.UpdateDataEventFactory, 'create');
            listener = '';
            var editingSource = {
                type: 'input-text',
                target: 'target',
                id: 'id'
            };
            var event = factory.create(editingSource, state, listener);
            expect(mocks.UpdateDataEventFactory.create).toHaveBeenCalled();
        });

        it('create PRE_UDPATE_DATA', function() {
            spyOn(mocks.PreUpdateDataEventFactory, 'create');
            listener = '';
            var editingSource = {
                type: 'pre-input-text',
                target: 'target',
                id: 'id'
            };
            var event = factory.create(editingSource, state, listener);
            expect(mocks.PreUpdateDataEventFactory.create).toHaveBeenCalled();
        });

        it('create TOUCH_DATA', function() {
            spyOn(mocks.TouchDataEventFactory, 'create');
            listener = 'mouseenter';
            var editingSource = {
                type: 'question-editor',
                target: 'target',
                id: 'id'
            };
            var event = factory.create(editingSource, state, listener);
            expect(mocks.TouchDataEventFactory.create).toHaveBeenCalled();
        });

        it('create UNTOUCH_DATA', function() {
            spyOn(mocks.UntouchDataEventFactory, 'create');
            listener = 'mouseleave';
            var editingSource = {
                type: 'question-editor',
                target: 'target',
                id: 'id'
            };
            var event = factory.create(editingSource, state, listener);
            expect(mocks.UntouchDataEventFactory.create).toHaveBeenCalled();
        });
    });

    function mock(mockName, $injector) {
        var factory = $injector.get(mockName);
        mocks[mockName] = factory;

        return factory;
    }
});
