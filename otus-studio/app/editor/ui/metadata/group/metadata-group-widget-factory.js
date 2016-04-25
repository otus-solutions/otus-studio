(function() {
	'use strict';

	angular
		.module('editor.ui')
		.factory('MetadataGroupWidgetFactory', MetadataGroupWidgetFactory);

	function MetadataGroupWidgetFactory() {
		var self = this;

		/*Public interface*/
		self.create = create;

		function create(question) {
			return new MetadataGroupWidget(question);
		}

		return self;
	}

	function MetadataGroupWidget(question) {
		var self = this;

		self.name = 'MetadataGroup';
		self.parentQuestion = question;
	}

}());
