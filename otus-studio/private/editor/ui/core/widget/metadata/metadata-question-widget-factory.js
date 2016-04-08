(function() {
	'use strict';

	angular
		.module('editor.ui')
		.factory('MetadataQuestionWidgetFactory', MetadataQuestionWidgetFactory);

	function MetadataQuestionWidgetFactory() {
		var self = this;

		/*Public interface*/
		self.create = create;

		function create(question) {
			return new MetadataQuestionWidget(question);
		}

		return self;
	}

	function MetadataQuestionWidget(question) {
		Object.defineProperty(this, 'model', {
			value: question,
			writable: false
		});

		Object.defineProperty(this, 'questionId', {
			value: question.questionId,
			writable: false
		});

		Object.defineProperty(this, 'type', {
			value: question.type,
			writable: false
		});
	}	

}());