'use strict';

/* Controllers */

var icecultControllers = angular.module('icecultControllers', ['icecult-jsonrpc']);

icecultControllers.controller('ChatCtrl', ['$scope', '$http', function($scope, $http) {
    $http.jsonrpc('methods.list').success(function(response) {
        $scope.methods = response.split('|');
    });
}]);