'use strict'

import Budget from '../classes/Budget';
import Category from '../classes/Category';
import Transaction from '../classes/Transaction';

/* --- Test Constants --- */

const BUDGET = new Budget();

const CTG0 = new Category('Uncategorized', 0);
const CTG1 = new Category('Shopping', 150);
const CTG2 = new Category('Food', 600);

const TR1 = new Transaction(0, '12 dec', 'Danbo', 11.50);
const TR2 = new Transaction(1, '14 dec', 'Tims', 6.20);
const TR3 = new Transaction(2, '14 dec', 'Nordstrom', 50);

/* --- Tests --- */

describe('Budget tests', () => {
    test('Constructs new budget with only uncategorized category', () => {
        expect(BUDGET.size()).toBe(1);
        expect(BUDGET.contains(CTG0)).toBeTruthy();
    });

    describe('Additions', () => {
        afterEach(() => {
            BUDGET.clear();
        });

        test('Correctly adds new, empty category', () => {
            BUDGET.add('Shopping', 150);
            expect(BUDGET.size()).toBe(2);
            expect(BUDGET.contains(CTG1)).toBeTruthy();
        });

        test('Correctly adds new transaction in appropriate category', () => {

        });
    });

    describe('Removals', () => {

    });

    describe('Manipulations', () => {

    });

    describe('Getters', () => {

    });
});