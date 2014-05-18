var EiskaltFilters = angular.module('EiskaltFilters', []);

EiskaltFilters.filter('numeraljs', function () {
    return function (input, format) {
        return numeral(input).format(format);
    };
});

EiskaltFilters.filter('chatMessage', function () {
    return function (input) {
        // TODO: pimp formatting
        return input
    };
});

EiskaltFilters.filter('extractPercentage', function () {
    return function (input) {
        return /\((\d+\.\d+)%\)/.exec(input)[1]
    };
});

EiskaltFilters.filter('filelist2user', function () {
    return function (input) {
        return input.split('.')[0]
    };
});