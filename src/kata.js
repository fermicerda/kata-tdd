const prefixDelimiter = '//';
const delimiterMultiCharBegin = '[';
const delimiterMultiCharEnd = ']';


function add (s) {

    if (s.length === 0 || (s.startsWith(prefixDelimiter) && s.indexOf('\n') < 0)) {
        return 0;
    }

    function getSeparators () {
        let separators = ['\n', ','];

        if (s.startsWith(prefixDelimiter)) {
            const firstNewLine = s.indexOf('\n');

            let customDelimiter = s.substring(prefixDelimiter.length, firstNewLine);

            //Remove delimiterMultiCharBegin and delimiterMultiCharEnd from the delimiter
            customDelimiter = customDelimiter.substring(delimiterMultiCharBegin.length, customDelimiter.length - delimiterMultiCharEnd.length);

            separators = separators.concat(customDelimiter.split(delimiterMultiCharEnd + delimiterMultiCharBegin));

            s = s.substring(firstNewLine + 1);
        }
        return separators;
    }

    function escapeRegex (string) {
        return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    }


    let separators = getSeparators();

    //Escape the separators for the Regex
    separators.forEach((value, index, array) => array[index] = escapeRegex(value));

    //Create a regex using the escaped separators and using OR "|"
    let separatorRegex = RegExp(separators.join('|'));

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

module.exports = add;