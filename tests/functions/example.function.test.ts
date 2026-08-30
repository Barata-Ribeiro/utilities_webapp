import { expect, test } from 'vite-plus/test';

test('Math.sqrt works for perfect squares', () => {
    expect(Math.sqrt(4)).toBe(2);
    expect(Math.sqrt(144)).toBe(12);
    expect(Math.sqrt(0)).toBe(0);
});
