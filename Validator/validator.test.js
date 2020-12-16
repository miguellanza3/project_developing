const validator = require('../sys/validator')

test('name rodríguez -> true', () => {
    expect(validator.isTexto('rodríguez')).toBe(true)
});

test('name Peña -> true', () => {
    expect(validator.isTexto('Peña')).toBe(true)
});

test('name P3ña -> false', () => {
    expect(validator.isTexto('P3ña')).toBe(false)
});

test('name áúíóéñ -> true', () => {
    expect(validator.isTexto('áúíóéñ')).toBe(true)
});
/* -------------------------------- */

test('date 2020-11-15 -> true', () => {
    expect(validator.isValidDate('2020-11-15')).toBe(true)
});

test('date 2020-11-151 -> false', () => {
    expect(validator.isValidDate('2020-11-151')).toBe(false)
});

test('date 11111 -> false', () => {
    expect(validator.isValidDate('11111')).toBe(false)
});

/* -------------------------------- */

test('email victor.ramirez@unitec.edu -> true', () => {
    expect(validator.isValidEmail('victor.ramirez@unitec.edu')).toBe(true)
});

test('email victor.ramirez -> false', () => {
    expect(validator.isValidEmail('victor.ramirez')).toBe(false)
});

test('email 1 -> false', () => {
    expect(validator.isValidEmail('1')).toBe(false)
});