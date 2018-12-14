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
            const toAdd = [t1, t2];
            ctg.add(toAdd);
            expect(ctg.size()).toBe(2);
            expect(ctg.contains(t1.id)).toBeTruthy();
            expect(ctg.contains(t2.id)).toBeTruthy();
        });
    });

    describe('Category removals:', () => {
        beforeEach(() => {
            ctg.clear();
            ctg.add([t1, t2]);
        });

        test('Correctly removes one transaction', () => {
            ctg.remove(t2.id);
            expect(ctg.size()).toBe(1);
            expect(ctg.contains(t2.id)).toBeFalsy();
        });

        test('Correctly does nothing if category does not contain transaction', () => {
            const t3 = new Transaction(12, '9 Dec', 'Starbucks', 6.50);
            ctg.remove(t3.id);
            expect(ctg.size()).toBe(2);
        });

        test('Correctly removes all transactions', () => {
            ctg.clear();
            expect(ctg.size()).toBe(0);
            expect(ctg.contains(t1.id)).toBeFalsy();
            expect(ctg.contains(t2.id)).toBeFalsy();
        });
    });

    describe('Category getters:', () => {
        const t3 = new Transaction(50, '10 dec', 'Blenz', 4.50);
        const t4 = new Transaction(51, '10 dec', 'Blenz', 5.20);
        
        beforeAll(() => {
            ctg.clear();
            ctg.add([t1,t2,t3,t4]);
        });

        test('Correctly returns all transactions', () => {
            expect(ctg.getTransactions()).toEqual([t1,t2]);
        });

        test('Correctly returns all transactions with given vendor', () => {
            expect(ctg.getByVendor('Blenz')).toEqual([t3,t4]);
        });

        test('Correctly returns empty array if vendor does not exist', () => {
            expect(ctg.getByVendor('Churchs')).toEqual([]);
        });

        test('Correctly returns all transactions on given date', () => {
            expect(ctg.getByDate(new Date('9 dec'))).toEqual([t1,t2]);
        });

        test('Correctly returns empty array if date does not exist', () => {
            expect(ctg.getByDate(new Date('11 dec'))).toEqual([]);
        });

        test('Correctly returns transaction with given id', () => {
            expect(ctg.getById(t1.id)).toEqual(t1);
        });

        test('Correctly returns null if transaction does not exist', () => {
            expect(ctg.getById(80)).toBeFalsy();
        });

        test('Correctly returns total expenditure', () => {
            const expected = [t1,t2,t3,t4].reduce((arr, tr) => arr + tr.amount);
            expect(ctg.getTotalExpenditure()).toEqual(expected);
        });

        test('Correctly returns total expenditure for given date', () => {
            const expected = [t1, t2].reduce((arr, tr) => arr + tr.amount);
            expect(ctg.getExpenditureByDate(new Date('9 dec'))).toEqual(expected);
        });

        test('Correctly returns total expenditure with given vendor', () => {
            const expected = [t3, t4].reduce((arr, tr) => arr + tr.amount);
            expect(ctg.getExpenditureByVendor('Blenz')).toEqual(expected);
        });
    });
});