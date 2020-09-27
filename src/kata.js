const possibleSeparators = ['\n', ','];
const prefixDelimiter = '//';
const delimiterMultiCharBegin = '[';
const delimiterMultiCharEnd = ']';


function escapeRegex(string) {
    return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function add (s) {

    if (s.length > 0) {

        let contentRegex = possibleSeparators.join('|');

        if (s.startsWith(prefixDelimiter)) {
            const firstNewLine = s.indexOf('\n');
            if (firstNewLine < 0)
                return 0;

            let customDelimiter = s.substring(prefixDelimiter.length, firstNewLine);

            if (customDelimiter.startsWith(delimiterMultiCharBegin) && customDelimiter.endsWith(delimiterMultiCharEnd))
                customDelimiter = customDelimiter.substring(delimiterMultiCharBegin.length, customDelimiter.length - delimiterMultiCharEnd.length);


            contentRegex += '|' + escapeRegex(customDelimiter);
            s = s.substring(firstNewLine + 1);
        }

        let separatorRegex = RegExp(contentRegex);

        let negativeNumbers = [];

        let res = s.split(separatorRegex).reduce((previousValue, currentValue) => {
            let currValueParsed = parseInt(currentValue);

            if (currValueParsed < 0)
                negativeNumbers.push(currValueParsed);

            return previousValue + ((currValueParsed > 1000) ? 0 : currValueParsed);
        }, 0);

        if (negativeNumbers.length > 0)
            throw new Error('negatives not allowed: ' + negativeNumbers.join(', '));

        return res;
    }
    return 0;
}

module.exports = add;