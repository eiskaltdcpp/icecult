'use strict';

EiskaltApp.controller('QueueCtrl', function ($scope, $interval, EiskaltRPC) {
    var refreshQueue = function () {
        EiskaltRPC.ListQueue().success(function(queue) {
            $scope.queue = queue;
        });
    };
    refreshQueue();
    var refreshQueueTimer = $interval(refreshQueue, REFRESH['queues']);
    $scope.$on("$destroy", function(event) {
        $interval.cancel(refreshQueueTimer);
    });

    $scope.abort = function (item) {
        EiskaltRPC.RemoveQueueItem(item.Target).success(refreshQueue);
    };
});