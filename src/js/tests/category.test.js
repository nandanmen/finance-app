'use strict'

import Category from '../classes/category';
import Transaction from '../classes/transaction';

const ctg = new Category('Shopping', 250);

const t1 = new Transaction(0, '9 dec', 'Starbucks', 4.50);
const t2 = new Transaction(0, '9 dec', 'Starbucks', 5.20);

describe('Category tests:', () => {
    test('Constructs new category with empty transactions', () => {
        expect(ctg.name).toBe('Shopping');
        expect(ctg.budgeted).toBe(250);
        expect(ctg.size()).toBe(0);
    });

    describe('Category additions:', () => {
        afterEach(() => {
            ctg.clear();
        });

        test('Correctly adds one transaction', () => {
            ctg.add(t1);
            expect(ctg.size()).toBe(1);
            expect(ctg.contains(t1.id)).toBeTruthy();
        });

        test('Correctly adds an array of transactions', () => {
            const toAdd = [t1, t2]
            ctg.add(toAdd);
            expect(ctg.size()).toBe(2);
            expect(ctg.contains(t1.id)).toBeTruthy();
            expect(ctg.contains(t2.id)).toBeTruthy();
        });
    });

    describe('Category removals:', () => {
        beforeEach(() => {
            ctg.clear();
            ctg.add[t1, t2];
        });

        test('Correctly removes one transaction', () => {

        });

        test('Correctly removes an array of transactions', () => {

        });

        test('Correctly removes all transactions', () => {

        });
    });

    describe('Category getters:', () => {
        beforeAll(() => {

        });

        test('Correctly returns all transactions', () => {

        });

        test('Correctly returns all transactions with given vendor', () => {

        });

        test('Correctly returns empty array if vendor does not exist', () => {

        });

        test('Correctly returns all transactions on given date', () => {

        });

        test('Correctly returns empty array if date does not exist', () => {

        });

        test('Correctly returns transaction with given id', () => {

        });

        test('Correctly returns null if transaction does not exist', () => {

        });

        test('Correctly returns total expenditure', () => {

        });

        test('Correctly returns total expenditure for given date', () => {

        });

        test('Correctly returns total expenditure with given vendor', () => {

        });
    });
});