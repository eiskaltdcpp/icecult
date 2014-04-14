'use strict';

/* App Module */

var icecultApp = angular.module('icecultApp', [
  'ngRoute',
  'icecultControllers'
]);

icecultApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/chat', {
        templateUrl: 'partials/chat.html',
        controller: 'ChatCtrl'
      }).
      otherwise({
        redirectTo: '/chat'
      });
  }]);
