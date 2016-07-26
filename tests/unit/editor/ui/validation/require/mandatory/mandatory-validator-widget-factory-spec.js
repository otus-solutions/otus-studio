describe('MandatoryValidatorWidgetFactory', function() {
    var Mock = {};
    var factory;
    var whoAmI;

    beforeEach(function() {
        module('studio');

        mockElement();

        inject(function(_$injector_) {
            mockWidgetScope(_$injector_);
            factory = _$injector_.get('MandatoryValidatorWidgetFactory');
        });

        widget = factory.create(Mock.scope, Mock.element);
    });

    describe('Interface description', function() {

        it('test method updateData', function() {
            // expect(mockParentWidget.getItem()).toEqual();
            // console.log(mockParentWidget);
        });
    });

    function mockElement() {
        Mock.element = {};
    }

    function mockUpdateData(){
      mockParentWidget($injector);

      Mock.updateData = {
        getRuleType: function(){
          return Mock.parentWidget.getItem().fillingRules.options['mandatory'];
        }
      };

      return Mock.updateData;
    }

    function mockWidgetScope($injector) {
        Mock.scope = {
            class: '',
            $parent: {
                widget: mockParentWidget($injector)
            }
        };
        return Mock.scope;
    }

    function mockParentWidget($injector) {
        mockQuestion($injector);

        Mock.parentWidget = {
            getItem: function() {
                return Mock.question;
            }
        };

        return Mock.parentWidget;
    }

    function mockQuestion($injector) {
        Mock.question = $injector.get('SurveyItemFactory').create('IntegerQuestion', 'Q1');
        Mock.question.fillingRules.options['mandatory'] = {
            data:{
                reference: true
            }
        };
        return Mock.question;
    }

});
