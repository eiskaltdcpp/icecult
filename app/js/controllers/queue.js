'use strict';

EiskaltApp.controller('QueueCtrl', function ($scope, $interval, settings, EiskaltRPC) {
    var refreshQueue = function () {
        EiskaltRPC.ListQueue().success(function(queue) {
            $scope.queue = queue;
        });
    };
    refreshQueue();
    var refreshQueueTimer = $interval(refreshQueue, settings.refresh.queues);
    $scope.$on("$destroy", function(event) {
        $interval.cancel(refreshQueueTimer);
    });
});

EiskaltApp.controller('QueueItemCtrl', function ($scope) {
    $scope.collapsed = false;
    $scope.abort = function (item) {
        EiskaltRPC.RemoveQueueItem(item.Target).success(refreshQueue);
    };
});