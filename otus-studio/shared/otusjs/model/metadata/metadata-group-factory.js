(function() {
	'use strict';

	angular
		.module('otusjs.model')
		.factory('MetadataGroupFactory', MetadataGroupFactory);

	MetadataGroupFactory.$inject = ['MetadataAnswerFactory'];

	function MetadataGroupFactory(MetadataAnswerFactory) {
		var self = this;

		/* Public interface */
		self.create = create;

		function create(name, questionOID) {
			return new MetadataGroup(name, questionOID);
		}

		return self;
	}

	function MetadataGroup(name, questionOID) {
		Object.defineProperty(this, 'extends', {
			value : 'StudioObject',
			writable : false,
			enumerable : true
		});

		Object.defineProperty(this, 'objectType', {
			value : 'MetadataGroup',
			writable : false,
			enumerable : true
		});

		Object.defineProperty(this, 'name', {
			value : name,
			writable : false,
			enumerable : true
		});

		Object.defineProperty(this, 'parentQuestion', {
			value : questionOID,
			writable : false,
			enumerable : true
		});
		
		Object.defineProperty(this, 'option', {
			value: {},
			writable : true, 
			enumerable : true
		});
	}

}());