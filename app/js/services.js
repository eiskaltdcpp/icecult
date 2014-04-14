'use strict';

/* Services */

angular.module('icecult-jsonrpc', []).config([ "$provide", function($provide) {
    return $provide.decorator('$http', ['$delegate', function($delegate) {
        $delegate.jsonrpc = function(method, parameters, config) {
            var promise = $delegate.post(
                '/rpc/',
                {
                    "jsonrpc": "2.0",
                    "method": method,
                    "params": parameters,
                    "id": 1
                },
                angular.extend({
                    'headers': {
                        'Content-Type': 'application/json'
                    }
                }, config)
            );
            promise.success = function(fn) {
                promise.then(function(response) {
                    fn(
                        response.data.result,
                        response.status,
                        response.headers,
                        config
                    );
                });
            };
            return promise;
        };
        return $delegate;
    }]);
}]);
