import { sum, minus } from './math';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('minus 2 - 2 to equal 0', () => {
    expect(minus(2, 2)).toBe(0)
})
