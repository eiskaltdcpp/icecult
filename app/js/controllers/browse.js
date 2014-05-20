'use strict';

EiskaltApp.controller('BrowseCtrl', function ($scope, EiskaltRPC) {
    EiskaltRPC.ShowLocalLists().success(function (filelists) {
        $scope.filelists = filelists;
        EiskaltRPC.ShowOpenedLists().success(function (openedFilelists) {
            angular.forEach($scope.filelists, function (filelist) {
                if (openedFilelists.indexOf(filelist) < 0) {
                    EiskaltRPC.OpenFileList(filelist);
                }
            });
        });
    });
});

EiskaltApp.controller('FileListCtrl', function ($scope, EiskaltRPC) {
    $scope.filelist = $scope.$parent.filelist;

    $scope.tree = {}
    $scope.treeData = [];
    EiskaltRPC.LsDirInList('', $scope.filelist).success(function (data) {
        $scope.treeData = data;
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