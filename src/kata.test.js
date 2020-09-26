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

test('should allow newline also as separator', () => {
    expect(add('5\n5')).toBe(10);
    expect(add('5\n5\n3')).toBe(13);
    expect(add('1\n2,3')).toBe(6);
});

test('should return 0 if begins with "//" and has no newline', () => {
    expect(add('//;5,5,5')).toBe(0);
});


test('should ignore separator from the first line beginning and delimiter (beginning "//")', () => {
    expect(add('//;\n5,5')).toBe(10);
});

test('should support adding delimiter in the beginning "//"', () => {
    expect(add('//;\n5;5')).toBe(10);
});

