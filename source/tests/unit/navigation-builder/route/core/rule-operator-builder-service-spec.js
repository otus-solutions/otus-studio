describe('RuleOperatorBuilderService', function() {

  var Mock = {};
  var service = {};

  beforeEach(function() {
    angular.mock.module('studio');

    inject(function(_$injector_) {
      service = _$injector_.get(
        'otusjs.studio.navigationBuilder.routeBuilder.RuleOperatorBuilderService'
      );
    });
  });

  describe('build method', function() {

    var builded = {};

    it('should return an array not empty if item type is valid',
      function() {
        builded = service.build('TextQuestion');
        expect(builded).toEqual(jasmine.any(Array));
        expect(builded.length > 0).toBe(true);
      });

    it('should return an array empty if item type is invalid', function() {
      builded = service.build('InvalidType');
      expect(builded).toEqual(jasmine.any(Array));
      expect(builded.length === 0).toBe(true);
    });

    describe('when item type is SingleSelectionQuestion', function() {

      beforeEach(function() {
        builded = service.build('SingleSelectionQuestion');
      });

      it('should return an array with not equal opeartor', function() {
        expect(builded[0].type).toBe('notEqual');
      });

      it('should return an array with equal opeartor', function() {
        expect(builded[1].type).toBe('equal');
      });

    });

    describe('when item type is TextQuestion', function() {

      beforeEach(function() {
        builded = service.build('TextQuestion');
      });

      it('should return an array with not equal opeartor', function() {
        expect(builded[0].type).toBe('notEqual');
      });

      it('should return an array with equal opeartor', function() {
        expect(builded[1].type).toBe('equal');
      });

      it('should return an array with contains opeartor', function() {
        expect(builded[2].type).toBe('contains');
      });

    });

    describe('when item type is IntegerQuestion', function() {

      beforeEach(function() {
        builded = service.build('IntegerQuestion');
      });

      it('should return an array with not equal opeartor', function() {
        expect(builded[0].type).toBe('notEqual');
      });

      it('should return an array with equal opeartor', function() {
        expect(builded[1].type).toBe('equal');
      });

      it('should return an array with in opeartor', function() {
        expect(builded[2].type).toBe('in');
      });

      it('should return an array with between opeartor', function() {
        expect(builded[3].type).toBe('between');
      });

      it('should return an array with greater opeartor', function() {
        expect(builded[4].type).toBe('greater');
      });

      it('should return an array with greaterEqual opeartor',
        function() {
          expect(builded[5].type).toBe('greaterEqual');
        });

      it('should return an array with lower opeartor', function() {
        expect(builded[6].type).toBe('lower');
      });

      it('should return an array with lowerEqual opeartor',
        function() {
          expect(builded[7].type).toBe('lowerEqual');
        });

    });

    describe('when item type is DecimalQuestion', function() {

      beforeEach(function() {
        builded = service.build('DecimalQuestion');
      });

      it('should return an array with not equal opeartor', function() {
        expect(builded[0].type).toBe('notEqual');
      });

      it('should return an array with equal opeartor', function() {
        expect(builded[1].type).toBe('equal');
      });

      it('should return an array with in opeartor', function() {
        expect(builded[2].type).toBe('in');
      });

      it('should return an array with between opeartor', function() {
        expect(builded[3].type).toBe('between');
      });

      it('should return an array with greater opeartor', function() {
        expect(builded[4].type).toBe('greater');
      });

      it('should return an array with greaterEqual opeartor',
        function() {
          expect(builded[5].type).toBe('greaterEqual');
        });

      it('should return an array with lower opeartor', function() {
        expect(builded[6].type).toBe('lower');
      });

      it('should return an array with lowerEqual opeartor',
        function() {
          expect(builded[7].type).toBe('lowerEqual');
        });

    });

    describe('when item type is CalendarQuestion', function() {

      beforeEach(function() {
        builded = service.build('CalendarQuestion');
      });

      it('should return an array with not equal opeartor', function() {
        expect(builded[0].type).toBe('notEqual');
      });

      it('should return an array with equal opeartor', function() {
        expect(builded[1].type).toBe('equal');
      });

      it('should return an array with in opeartor', function() {
        expect(builded[2].type).toBe('in');
      });

      it('should return an array with between opeartor', function() {
        expect(builded[3].type).toBe('between');
      });

      it('should return an array with greater opeartor', function() {
        expect(builded[4].type).toBe('greater');
      });

      it('should return an array with greaterEqual opeartor',
        function() {
          expect(builded[5].type).toBe('greaterEqual');
        });

      it('should return an array with lower opeartor', function() {
        expect(builded[6].type).toBe('lower');
      });

      it('should return an array with lowerEqual opeartor',
        function() {
          expect(builded[7].type).toBe('lowerEqual');
        });

    });

    describe('when item type is TimeQuestion', function() {

      beforeEach(function() {
        builded = service.build('TimeQuestion');
      });

      it('should return an array with not equal opeartor', function() {
        expect(builded[0].type).toBe('notEqual');
      });

      it('should return an array with equal opeartor', function() {
        expect(builded[1].type).toBe('equal');
      });

      it('should return an array with in opeartor', function() {
        expect(builded[2].type).toBe('in');
      });

      it('should return an array with between opeartor', function() {
        expect(builded[3].type).toBe('between');
      });

      it('should return an array with greater opeartor', function() {
        expect(builded[4].type).toBe('greater');
      });

      it('should return an array with greaterEqual opeartor',
        function() {
          expect(builded[5].type).toBe('greaterEqual');
        });

      it('should return an array with lower opeartor', function() {
        expect(builded[6].type).toBe('lower');
      });

      it('should return an array with lowerEqual opeartor',
        function() {
          expect(builded[7].type).toBe('lowerEqual');
        });

    });

    describe('when item type is CheckboxQuestion', function() {

      beforeEach(function() {
        builded = service.build('CheckboxQuestion');
      });

      it('should return an array with not equal opeartor', function() {
        expect(builded[0].type).toBe('notEqual');
      });

      it('should return an array with equal opeartor', function() {
        expect(builded[1].type).toBe('equal');
      });

      it('should return an array with contains opeartor', function() {
        expect(builded[2].type).toBe('contains');
      });

      it('should return an array with quantitySelected opeartor',
        function() {
          expect(builded[3].type).toBe('quantity');
        });

      it('should return an array with minSelected opeartor',
        function() {
          expect(builded[4].type).toBe('minSelected');
        });

      it('should return an array with maxSelected opeartor',
        function() {
          expect(builded[5].type).toBe('maxSelected');
        });

    });

  });

});
