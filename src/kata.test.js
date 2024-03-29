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

test('should throw error when there is at least one negative number', () => {
    expect(() => {add('-1,5')}).toThrow();
});

test('should throw error when there is at least one negative number with message "negatives not allowed"', () => {
    expect(() => {add('//;\n5,-1')}).toThrow('negatives not allowed: -1');
});

test('should throw describing error when there is at least one negative number', () => {
    expect(() => {add('-2,-5')}).toThrow('negatives not allowed: -2, -5');
});

test('should be ignored when numbers are bigger than 1000', () => {
    expect(add('5,1002,5')).toBe(10);
    expect(add('1000,1000,5')).toBe(2005);
    expect(add('1000,1001,5')).toBe(1005);
});

test('should allow delimiters larger than 1 character using "[]"', () => {
    expect(add('//[***]\n5***2***5')).toBe(12);
    expect(add('//[vv]\n1vv2')).toBe(3);
    expect(add('//[g]\n1g2,3')).toBe(6);
});

test('should support multiple delimiters using "[]"', () => {
    expect(add('//[**][pp]\n5**2pp5')).toBe(12);
    expect(add('//[v][c][d]\n1d2c3')).toBe(6);
});

