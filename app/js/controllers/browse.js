'use strict';

EiskaltApp.controller('BrowseCtrl', function ($scope, EiskaltRPC) {
    EiskaltRPC.ShowLocalLists().success(function (filelists) {
        $scope.filelists = filelists;
    });
});

EiskaltApp.controller('FileListCtrl', function ($scope, $timeout, EiskaltRPC) {
    $scope.tree = {}
    $scope.treeData = [];

    // open on start
    EiskaltRPC.OpenFileList($scope.filelist).success(function() {
        // loading big filelists can be slow and on slim servers.
        // as we don't have a clue, if the result is complete, we just give it some time.
        $timeout(
            function() {
                EiskaltRPC.LsDirInList('', $scope.filelist).success(function (data) {
                    $scope.treeData = data;
                });
            },
            1000
        );
    });
    // close on leave
    $scope.$on("$destroy", function(event) {
        EiskaltRPC.CloseFileList($scope.filelist);
    });

    $scope.handle = function(node) {
        if (node.isFolder) {
            EiskaltRPC.LsDirInList(node.target, $scope.filelist).success(function (children) {
                angular.forEach(children, function (child) {
                    $scope.tree.add_branch(node, child);
                });
            });
        }
    };

});

EiskaltApp.controller('BrowseDownloadCtrl', function ($scope, EiskaltRPC) {
    $scope.downloaded = false;
    $scope.filelist = $scope.$parent.$parent.$parent.filelist;  // TODO: make this better

    $scope.download = function(node) {
        var method = node.isFolder ? EiskaltRPC.DownloadDirFromList : EiskaltRPC.DownloadFileFromList;
        method(node.target, '', $scope.filelist).success(function(status) {
            if (status == 0) {
                $scope.downloaded = true;
            } else {
                alert('Download failed. Maybe still downloading or downloaded already?');
            }
        });
    };
});
