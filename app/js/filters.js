/* Copyright (c) 2017 Lars Kreisz */
/* License:The MIT License (MIT) */

var EiskaltFilters = angular.module('EiskaltFilters', []);

EiskaltFilters.filter('numeraljs', function () {
    return function (input, format, zero) {
        if (angular.isDefined(zero)) {
            numeral.zeroFormat('0 ' + zero);
        }
        return isNaN(input) ? '0' : numeral(input).format(format);
    };
});

EiskaltFilters.filter('extractPercentage', function () {
    return function (input) {
        var m = /\((\d+\.\d+)%\)/.exec(input);
        return m && m.length > 0 ? m[1] : 0;
    };
});

EiskaltFilters.filter('stringToColor', function() {
    return function (input) {
        var hash = 0;
        for (var i = 0; i < input.length; i++) {
            hash = input.charCodeAt(i) + ((hash << 5) - hash);
        }
        var color = ((hash>>24)&0xFF).toString(16) +
                    ((hash>>16)&0xFF).toString(16) +
                    ((hash>>8)&0xFF).toString(16) +
                    (hash&0xFF).toString(16);
        if (color.length < 6) {
            while (color.length < 6) {
                color += '0';
            }
        } else if (color.length > 6) {
            color = color.slice(0, 6);
        }
        return '#' + color;
    }
});

EiskaltFilters.filter('filelist2user', function () {
    return function (input) {
        return input.split('.')[0]
    };
});
