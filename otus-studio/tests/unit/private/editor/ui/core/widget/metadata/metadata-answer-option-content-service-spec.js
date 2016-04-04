describe('MetadataAnswerOptionContentService', function(){
	var Mock = {};
	var metadataAnswerOptions = {oid : "oid", questionOID : "questionOID"}

	/*@BeforeScenario*/
	beforeEach(function() {
		module('editor.ui');

		inject(function(_$injector_) {
			service = _$injector_.get('MetadataAnswerOptionContentService', {
				'WidgetService' : mockWidgetService(_$injector_),
				'MetadataAnswerOptionWidgetFactory' : mockMetadataAnswerOptionWidgetFactory(_$injector_),
				//'MetadataController' : mockMetadataController(_$injector_)
			});
		});
	});

	describe('loadOption', function() {
		it('should return a new load option', function() {
			var widget = Mock.WidgetService.getMetadataAnswerOptionWidget(metadataAnswerOptions); 

			//scope, vem de metadata-controller
		});
	});

	function mockWidgetService($injector) {
		Mock.WidgetService = $injector.get('WidgetService');
		return Mock.WidgetService;
	}

	function mockMetadataAnswerOptionWidgetFactory($injector) {
		Mock.MetadataAnswerOptionWidgetFactory = $injector.get('MetadataAnswerOptionWidgetFactory');
		return Mock.MetadataAnswerOptionWidgetFactory;
	}

	function mockMetadataController($injector) {
		Mock.MetadataController = $injector.get('MetadataController');
		return Mock.MetadataController;
	}


});