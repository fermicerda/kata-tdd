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

        let negativeNumbers = [];

        let res = s.split(separatorRegex).reduce((previousValue, currentValue) => {
            let currValueParsed = parseInt(currentValue);

            if (currValueParsed < 0)
                negativeNumbers.push(currValueParsed);

            return currValueParsed + previousValue;
        }, 0);

        if (negativeNumbers.length > 0)
            throw new Error('negatives not allowed: ' + negativeNumbers.join(', '));

        return res;
    }
    return 0;
}

module.exports = add;