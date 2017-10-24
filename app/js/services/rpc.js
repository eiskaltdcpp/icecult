/* Copyright (c) 2017 Lars Kreisz */
/* License:The MIT License (MIT) */

'use strict';

angular.module('EiskaltRPC', []).factory('EiskaltRPC', function($http, $q) {
    // private base function with success wrapper that handle list results
    var jsonrpc = function(method, parameters, isSeperatedList) {
        var promise = $http.post(
                '/rpc/',
                {
                    "jsonrpc": "2.0",
                    "method": method,
                    "params": parameters,
                    "id": 1
                },
                {
                    'headers': {
                        'Content-Type': 'application/json'
                    }
                }
                );
        promise.success = function(fn) {
            promise.then(function(response) {
                var result = response.data.result;
                if (isSeperatedList) {
                    if (result.length == 0) {
                        result = []
                    } else {
                        // can have trailing separator
                        var re = new RegExp(parameters.separator + '+$','g');
                        result = result.replace(re, '');
                        // split by separator
                        result = result.split(parameters.separator);
                    }
                }
                fn(result, response.status, response.headers);
            });
        };
        return promise;
    };

    return {
        StopDaemon: function() {
            return jsonrpc('daemon.stop');
        },
        MagnetAdd: function(magnet, directory) {
            return jsonrpc('magnet.add');
        },
        HubAdd: function(huburl, enc) {
            return jsonrpc('hub.add', {huburl: huburl, enc: enc | ''});
        },
        HubDel: function(huburl) {
            return jsonrpc('hub.del', {huburl: huburl});
        },
        HubSay: function(huburl, message) {
            return jsonrpc('hub.say', {huburl: huburl, message: message});
        },
        HubSayPM: function(huburl, nick, message) {
            return jsonrpc('hub.pm', {huburl: huburl, nick: nick, message: message});
        },
        ListHubs: function() {
            return jsonrpc('hub.list', {separator: '┴'}, true);
        },
        AddDirInShare: function(directory, virtname) {
            return jsonrpc('share.add', {directory: directory, virtname: virtname});
        },
        RenameDirInShare: function(directory, virtname) {
            return jsonrpc('share.rename', {directory: directory, virtname: virtname});
        },
        DelDirFromShare: function(directory) {
            return jsonrpc('share.del', {directory: directory});
        },
        ListShare: function() {
            var promise = jsonrpc('share.list', {separator: '┴'});
            promise.success = function(fn) {
                promise.then(function(response) {
                    var result = response.data.result.replace(/(\r\n|\n|\r)/gm, '');
                    result = result.replace(/┴+$/, '');
                    result = result.split('┴');
                    var shares = [];
                    while (result.length) {
                        var data = result.splice(0, 3);
                        shares.push({
                            path: data[0],
                            name: data[1],
                            sizeFormatted: data[2]
                        });
                    }
                    fn(shares);
                });
            };
            return promise;
        },
        RefreshShare: function() {
            return jsonrpc('share.refresh');
        },
        GetFileList: function(huburl, nick) {
            return jsonrpc('list.download', {huburl: huburl, nick: nick});
        },
        GetChatPub: function(huburl) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            jsonrpc('hub.getchat', {huburl: huburl, separator: '┴'}, true).success(function(messages) {
                deferred.resolve(messages.map(function(msg) {
                    var match = msg.match(/^\s*(\[[^\]]*\])\s*<\s*([^\s>]*)\s*>\s*(.*)\s*$/);
                    return {
                        time: match[1],
                        nick: match[2],
                        text: match[3]
                    }
                }));
            });
            promise.success = promise.then;
            return promise;
        },
        SendSearch: function(searchstring, searchtype, sizemode, sizetype, size, huburls) {
            return jsonrpc('search.send', { searchstring: searchstring, searchtype: searchtype, sizemode: sizemode, sizetype: sizetype, size: size, huburls: huburls});
        },
        ReturnSearchResults: function(huburl) {
            return jsonrpc('search.getresults', {huburl: huburl});
        },
        ShowVersion: function() {
            return jsonrpc('show.version');
        },
        ShowRatio: function() {
            return jsonrpc('show.ratio');
        },
        SetPriorityQueueItem: function(target, priority) {
            return jsonrpc('queue.setpriority', {target: target, priority: priority});
        },
        MoveQueueItem: function(source, target) {
            return jsonrpc('queue.move', {source: source, target: target});
        },
        RemoveQueueItem: function(target) {
            return jsonrpc('queue.remove', {target: target});
        },
        ListQueueTargets: function() {
            return jsonrpc('queue.listtargets', {separator: '┴'}, true);
        },
        ListQueue: function() {
            const priorityOrder = ['Paused', 'Lowest', 'Low', 'Normal', 'High', 'Highest'];
            var deferred = $q.defer();
            var promise = deferred.promise;
            jsonrpc('queue.list').success(function(queue) {
                var result = [];
                angular.forEach(queue, function(value) {
                    value.PriorityOrder = priorityOrder.indexOf(value.Priority);
                    this.push(value);
                }, result);
                deferred.resolve(result);
            });
            promise.success = promise.then;
            return promise;
        },
        ClearSearchResults: function(huburl) {
            return jsonrpc('search.clear', {huburl: huburl});
        },
        AddQueueItem: function(directory, tth, filename, size) {
            return jsonrpc('queue.add', {directory: directory, tth: tth, filename: filename, size: size});
        },
        GetSourcesItem: function(target) {
            return jsonrpc('queue.getsources', {target: target, separator: '┴'}, true);
        },
        GetHashStatus: function() {
            return jsonrpc('hash.status');
        },
        GetMethodList: function() {
            return jsonrpc('method.list', {}, true);
        },
        PauseHash: function() {
            return jsonrpc('hash.pause');
        },
        MatchAllLists: function() {
            return jsonrpc('queue.matchlists');
        },
        ListHubsFullDesc: function() {
            var promise = jsonrpc('hub.listfulldesc');
            promise.success = function(fn) {
                promise.then(function(response) {
                    // transform from object with url as key to array
                    var hubs = [];
                    angular.forEach(response.data.result, function(value, key) {
                        hubs.push(angular.extend(value, {huburl: key}));
                    });
                    fn(hubs);
                });
            };
            return promise;
        },
        GetHubUserList: function(huburl) {
            return jsonrpc('hub.getusers', {huburl: huburl, separator: '┴'}, true);
        },
        GetUserInfo: function(nick, huburl) {
            var promise = jsonrpc('hub.getuserinfo', {nick: nick, huburl: huburl});
            promise.success = function(fn) {
                promise.then(function(response) {
                    var info = response.data.result;
                    // remove space in key "Nick Order"
                    info['NickOrder'] = info['Nick Order'];
                    delete info['Nick Order'];
                    fn(info);
                });
            };
            return promise;
        },
        ShowLocalLists: function() {
            return jsonrpc('list.local', {separator: '┴'}, true);
        },
        GetClientFileList: function(filelist) {
            return jsonrpc('queue.listtargets', {filelist: filelist});
        },
        OpenFileList: function(filelist) {
            return jsonrpc('list.open', {filelist: filelist});
        },
        CloseFileList: function(filelist) {
            return jsonrpc('list.close', {filelist: filelist});
        },
        CloseAllFileLists: function() {
            return jsonrpc('list.closeall');
        },
        ShowOpenedLists: function() {
            return jsonrpc('list.listopened', {separator: '┴'}, true);
        },
        LsDirInList: function(directory, filelist) {
            if (directory.length > 0) {
                directory += '\\';
            }
            var promise = jsonrpc('list.lsdir', {directory: directory, filelist: filelist});
            promise.success = function(fn) {
                promise.then(function(response) {
                    // convert to tree node
                    var nodes = [];
                    angular.forEach(response.data.result, function(value, key) {
                        nodes.push({
                            label: key,
                            target: directory + key,
                            isFolder: !value.hasOwnProperty('TTH'),
                            data: value});
                    });
                    fn(nodes);
                });
            };
            return promise;
        },
        DownloadDirFromList: function(target, downloadto, filelist) {
            return jsonrpc('list.downloaddir', {
                target: target + '\\',
                downloadto: downloadto,
                filelist: filelist
            });
        },
        DownloadFileFromList: function(target, downloadto, filelist) {
            return jsonrpc('list.downloadfile', {
                target: target,
                downloadto: downloadto,
                filelist: filelist
            });
        },
        GetItemDescbyTarget: function(target) {
            return jsonrpc('queue.getiteminfo', {target: target});
        },
        QueueClear: function() {
            return jsonrpc('queue.clear');
        },
        SettingsGetSet: function(key, value) {
            var promise = jsonrpc('settings.getset', {key: key, value: value});
            promise.success = function(fn) {
                promise.then(function(response) {
                    if (angular.isDefined(value)) { // set
                        fn(response.data.result !== 1);
                    } else { // get
                        fn(response.data.result.value);
                    }
                });
            };
            return promise;
        }
    };
});
