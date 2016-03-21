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

		function create() {
			return new MetadataGroup('', MetadataAnswerFactory);
		}

		return self;
	}

	function MetadataGroup(oid, questionOID) {
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

		Object.defineProperty(this, 'oid', {
			value : oid,
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