'use strict';

EiskaltApp.controller('QueueCtrl', function ($scope, $interval, EiskaltRPC) {
    var refreshQueue = function () {
        EiskaltRPC.ListQueue().success(function(queue) {
            $scope.queue = queue;
        });
    };
    refreshQueue();
    $interval(refreshQueue, REFRESH['queues']);
});