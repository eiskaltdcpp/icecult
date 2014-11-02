'use strict';

var EiskaltApp = angular.module('EiskaltApp', ['ngRoute', 'ngStorage', 'ngSanitize', 'luegg.directives', 'ui.bootstrap',
                                               'angularBootstrapNavTree', 'EiskaltRPC', 'EiskaltFilters']);

EiskaltApp.value('settings', {
    version: '0.2.0',
    chatMessagesKept: 250,
    refresh: {
        hashAndRatio: 5000,
        chat: 3000,
        queues: 3000
    }
});

EiskaltApp.config(function ($routeProvider) {
    $routeProvider
        .when('/hubs', {
            controller: 'HubsCtrl',
            templateUrl: 'partials/hubs.html'
        })
        .when('/browse', {
            controller: 'BrowseCtrl',
            templateUrl: 'partials/browse.html'
        })
        .when('/queue', {
            controller: 'QueueCtrl',
            templateUrl: 'partials/queue.html'
        })
        .otherwise({redirectTo: '/hubs'});
});
