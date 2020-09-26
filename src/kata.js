const numberSeparator = ',';

function add (s) {

    if (s.length > 0) {
        return s.split(numberSeparator).reduce((previousValue, currentValue) => {
            return parseInt(currentValue) + previousValue;
        }, 0);
    }
    return 0;
}

module.exports = add;