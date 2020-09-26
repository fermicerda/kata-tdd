const possibleSeparators = ['\n', ','];
const prefixDelimiter = '//';

function add (s) {

    if (s.length > 0) {

        let contentRegex = possibleSeparators.join('|');

        if (s.startsWith(prefixDelimiter)) {
            const firstNewLine = s.indexOf('\n');
            if (firstNewLine < 0)
                return 0;

            contentRegex += '|' + s.substring(prefixDelimiter.length, firstNewLine);
            s = s.substring(firstNewLine + 1);
        }

        let separatorRegex = RegExp(contentRegex);

        return s.split(separatorRegex).reduce((previousValue, currentValue) => {
            return parseInt(currentValue) + previousValue;
        }, 0);
    }
    return 0;
}

module.exports = add;