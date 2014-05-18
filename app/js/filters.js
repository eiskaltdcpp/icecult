var EiskaltFilters = angular.module('EiskaltFilters', []);

EiskaltFilters.filter('numeraljs', function () {
    return function (input, format) {
        return numeral(input).format(format);
    };
});

EiskaltFilters.filter('chatMessage', function () {
    return function (message) {
        var text = message.text;
        text = text.replace(/<(.*)>/i, '<span class="nick">&lt;$1&gt;</span>');
        text = text.replace(/^(\[\s*[0-9]+:[0-9]+:[0-9]+\s*\])/i, '<span class="time">$1</span>');
        return text;
    };
});

EiskaltFilters.filter('extractPercentage', function () {
    return function (input) {
        return /\((\d+\.\d+)%\)/.exec(input)[1]
    };
});

EiskaltFilters.filter('stringToColor', function() {
    return function (input) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
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
        return color;
    }
});

EiskaltFilters.filter('filelist2user', function () {
    return function (input) {
        return input.split('.')[0]
    };
});
