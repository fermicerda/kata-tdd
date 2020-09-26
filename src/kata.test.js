const add = require("./kata")

test('should return 0 if empty string provided', () => {
    expect(add('')).toBe(0);
});

test('should return number if it is just a number', () => {
    expect(add('5')).toBe(5);
});

test('should return sum when separated by comma', () => {
    expect(add('5,5')).toBe(10);
    expect(add('5,5,3')).toBe(13);
});

