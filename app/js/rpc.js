'use strict';

/* Services */

angular.module('EiskaltRPC', []).factory('EiskaltRPC', ['$http', function($http) {
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
						// can have trailing seperator
						var re = new RegExp(parameters.separator + '+$','g');
						result = result.replace(re, '');
						// split by seperator
						result = result.split(parameters.separator);
					}
				}
				fn(result, response.status, response.headers);
			});
		};
		return promise;
	}
	
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
			return jsonrpc('hub.list', {separator: '#'}, true);
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
		ListShare: function(directory) {
			return jsonrpc('share.list', {separator: '#'});
		},
		RefreshShare: function() {
			return jsonrpc('share.refresh');
		},
		GetFileList: function(huburl, nick) {
			return jsonrpc('list.download', {huburl: huburl, nick: nick});
		},
		GetChatPub: function(huburl) {
			return jsonrpc('hub.getchat', {huburl: huburl, separator: '#'}, true);
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
			return jsonrpc('queue.listtargets', {separator: '#'}, true);
		},
		ListQueue: function() {
			return jsonrpc('queue.list');
		},
		ClearSearchResults: function(huburl) {
			return jsonrpc('search.clear', {huburl: huburl});
		},
		AddQueueItem: function(directory, tth, filename, size) {
			return jsonrpc('queue.add', {directory: directory, tth: tth, filename: filename, size: size});
		},
		GetSourcesItem: function(target) {
			return jsonrpc('queue.getsources', {target: target, separator: '#'}, true);
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
			return jsonrpc('hub.listfulldesc');
		},
		GetHubUserList: function(huburl) {
			return jsonrpc('hub.getusers', {huburl: huburl, separator: '#'}, true);
		},
		GetUserInfo: function(nick, huburl) {
			return jsonrpc('hub.getuserinfo', {nick: nick, huburl: huburl});
		},
		ShowLocalLists: function() {
			return jsonrpc('list.local', {separator: '#'}, true);
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
			return jsonrpc('list.listopened', {separator: '#'}, true);
		},
		LsDirInList: function(directory, filelist) {
			return jsonrpc('list.listopened', {directory: directory, filelist: filelist});
		}
    };
}]);