/* Copyright (c) 2017 Lars Kreisz */
/* License:The MIT License (MIT) */

'use strict';

EiskaltApp.controller('BrowseCtrl', function ($scope, EiskaltRPC) {
    EiskaltRPC.ShowLocalLists().success(function (filelists) {
        $scope.filelists = filelists;
    });
});

EiskaltApp.controller('FileListCtrl', function ($scope, $timeout, EiskaltRPC) {
    $scope.tree = {}
    $scope.treeData = [];
    $scope.loadingComplete = false;

    $scope.loadFilelist = function() {
        $scope.loadingComplete = false;
        // loading big filelists can be slow and on slim servers.
        // as we don't have a clue, we update until nothing changes anymore.
        EiskaltRPC.LsDirInList('', $scope.filelist).success(function (data) {
            if (data.length === 0) {
                $timeout($scope.loadFilelist, 1000);
            } else if (data.length > $scope.treeData.length) {
                $scope.treeData = data;
                $timeout($scope.loadFilelist, 1000);
            } else {
                $scope.loadingComplete = true;
            }
        });
    }

    // open on start
    EiskaltRPC.OpenFileList($scope.filelist).success(function() {
        $timeout($scope.loadFilelist, 500);
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
