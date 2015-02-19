'use strict';

EiskaltApp.controller('QueueCtrl', function ($scope, $interval, settings, EiskaltRPC) {
    $scope.refreshQueue = function () {
        EiskaltRPC.ListQueue().success(function(queue) {
            $scope.queue = queue;
        });
    };
    $scope.refreshQueue();
    var refreshQueueTimer = $interval($scope.refreshQueue, settings.refresh.queues);
    $scope.$on("$destroy", function(event) {
        $interval.cancel(refreshQueueTimer);
    });
});

EiskaltApp.controller('QueueItemCtrl', function ($scope, EiskaltRPC) {
    $scope.collapsed = false;
    $scope.abort = function (item) {
        EiskaltRPC.RemoveQueueItem(item.Target).success($scope.refreshQueue);
    };
});
