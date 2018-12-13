'use strict'

import Category from '../classes/category';

const ctg = new Category('Shopping', 250);

test('Correctly constructs new category with empty transactions', () => {
    expect(ctg.name).toBe('Shopping');
    expect(ctg.budgeted).toBe(250);
    expect(ctg.size()).toBe(0);
});

describe('Test category additions', () => {

});