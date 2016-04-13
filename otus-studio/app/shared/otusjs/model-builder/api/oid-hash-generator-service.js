(function() {

    angular
        .module('otusjs.modelBuilder')
        .service('OIDHashGenerator', OIDHashGenerator);

    function OIDHashGenerator() {
        var self = this;

        /* Public interface */
        self.generateHash = generateHash;

        function generateHash(seed) {
            if (seed)
                return generate(seed);
            else
                return generate(Date.now().toString());
        }

        function generate(seed) {
            var hash = 0;

            if (seed.length === 0) return hash;

        	for (i = 0; i < seed.length; i++) {
        		char = seed.charCodeAt(i);
        		hash = ((hash << 5) - hash) + char;
        		hash = hash & hash; // Convert to 32bit integer
        	}

        	return hash;
        }
    }

}());
