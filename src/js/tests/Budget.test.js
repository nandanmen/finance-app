'use strict'

import Budget from '../classes/Budget';
import Category from '../classes/Category';
import Transaction from '../classes/Transaction';

/* --- Test Constants --- */

const BUDGET = new Budget();

const DEFAULT = new Category('Uncategorized', 0);
const CTG1 = new Category('Shopping', 150);
const CTG2 = new Category('Food', 600);

const TR1 = new Transaction(0, '12 dec', 'Danbo', 11.50);
const TR2 = new Transaction(1, '14 dec', 'Tims', 6.20);
const TR3 = new Transaction(2, '14 dec', 'Nordstrom', 50);

/* --- Tests --- */

describe('Budget tests', () => {
    test('Constructs new budget with only uncategorized category', () => {
        expect(BUDGET.size()).toBe(1);
        expect(BUDGET.getDefault()).toEqual(DEFAULT);
        expect(BUDGET.expenses).toBe(0);
        expect(BUDGET.total).toBe(0);
    });

    describe('Additions', () => {
        afterEach(() => {
            BUDGET.clear();
        });

        test('Adds new empty category', () => {
            const added = BUDGET.add('Shopping', 150);
            expect(BUDGET.size()).toBe(2);
            expect(BUDGET.contains(CTG1.name)).toBeTruthy();
            expect(added).toEqual(CTG1);
        });

        test('Adds new transaction in Uncategorized if category is not specified', () => {
            const added = BUDGET.addTransaction(TR2);
            expect(added).toEqual(TR2);
            expect(BUDGET.size()).toBe(1);

            const def = BUDGET.getDefault();
            expect(def.size()).toBe(1);
            expect(def.contains(TR2.id)).toBeTruthy();
        });

        test('Adds new transaction in appropriate category', () => {
            BUDGET.add('Shopping', 150);
            const added = BUDGET.addTransaction(TR3, 'Shopping');
            expect(added).toEqual(TR3);

            const ctg = BUDGET.getCategory('Shopping');
            expect(ctg.size()).toBe(1);
            expect(ctg.contains(TR3.id)).toBeTruthy();
        });

        test('Adds transaction to new category if category does not exist', () => {
            const added = BUDGET.addTransaction(TR1, 'Food', 600);
            expect(added).toEqual(TR1);
            expect(BUDGET.size()).toBe(2);
            
            const ctg = BUDGET.getCategory('Food');
            expect(ctg).toBeTruthy();
            expect(ctg).toEqual(CTG2);
            expect(ctg.size()).toBe(1);
            expect(ctg.contains(TR1.id)).toBeTruthy();
        });
    });

    describe('Removals', () => {
        beforeEach(() => {
            BUDGET.addTransaction(TR1, 'Food', 600);
            BUDGET.addTransaction(TR2, 'Food');
            BUDGET.addTransaction(TR3, 'Shopping', 150);
        });

        afterEach(() => {
            BUDGET.clear();
        });

        test('Removes category from budget', () => {
            BUDGET.remove('Food');
            expect(BUDGET.size()).toBe(2);
            expect(BUDGET.contains('Food')).toBeFalsy();
        });

        test('Does nothing if category does not exist', () => {
            BUDGET.remove('Car');
            expect(BUDGET.size()).toBe(3);
        });

        test('Removes transaction from budget', () => {
            BUDGET.removeTransaction(TR1.id);
            expect(BUDGET.getNumTransactions()).toBe(2);
            expect(BUDGET.containsTransaction(TR1.id)).toBeFalsy();
        });

        test('Does nothing if transaction does not exist', () => {
            BUDGET.removeTransaction(3);
            expect(BUDGET.getNumTransactions()).toBe(3);
        });

        test('Removes all user-added categories', () => {
            BUDGET.clear();
            expect(BUDGET.size()).toBe(1);
        });
    });

    describe('Manipulations', () => {
        beforeEach(() => {
            BUDGET.addTransaction(TR1, 'Food', 600);
            BUDGET.addTransaction(TR2, 'Food');
            BUDGET.addTransaction(TR3, 'Shopping', 150);
        });

        afterEach(() => {
            BUDGET.clear();
        });

        describe('Moving transactions', () => {
            test('Moves transaction to existing category', () => {
                const original = BUDGET.getCategoryOf(TR2.id);

                BUDGET.move(TR2.id, 'Shopping');
                expect(original.contains(TR2.id)).toBeFalsy();
                
                const after = BUDGET.getCategory('Shopping');
                expect(after.contains(TR2.id)).toBeTruthy();
            });

            test('Moves transaction to a new category', () => {
                const original = BUDGET.getCategoryOf(TR2.id);

                BUDGET.move(TR2.id, 'Car');
                expect(original.contains(TR2.id)).toBeFalsy();

                const after = BUDGET.getCategory('Car');
                expect(after.contains(TR2.id)).toBeTruthy();
            });

            test('Does nothing if transaction does not exist', () => {
                BUDGET.move(3, 'Shopping');
                const shopping = BUDGET.getCategory('Shopping');
                expect(shopping.size()).toBe(1);
                expect(BUDGET.getNumTransactions()).toBe(3);
            });
        });

        describe('Editing', () => {
            test('Updates all category fields', () => {
                const ori = BUDGET.getCategory('Shopping');
                const after = BUDGET.edit('Shopping', { name: 'Shop', amount: 250 });

                expect(BUDGET.contains('Shopping')).toBeFalsy();
                expect(BUDGET.contains('Shop')).toBeTruthy();
                expect(after.budgeted).toBe(250);
                expect(after.size()).toEqual(ori.size());
            });

            test('Updates only name field of category', () => {
                const ori = BUDGET.getCategory('Shopping');
                const after = BUDGET.edit('Shopping', { name: 'Shop' });

                expect(BUDGET.contains('Shopping')).toBeFalsy();
                expect(BUDGET.contains('Shop')).toBeTruthy();
                expect(after.budgeted).toEqual(ori.budgeted);
                expect(after.size()).toEqual(ori.size());
            });

            test('Updates only amount field of category', () => {
                const ori = BUDGET.getCategory('Shopping');
                const after = BUDGET.edit('Shopping', { amount: 250 });

                expect(after.name).toEqual(ori.name);
                expect(after.budgeted).toBe(250);
                expect(after.size()).toEqual(ori.size());
            });

            test('Does nothing if category does not exist', () => {
                BUDGET.edit('Car', { name: 'Fuel' });
                expect(BUDGET.contains('Car')).toBeFalsy();
                expect(BUDGET.size()).toBe(3);
                expect(BUDGET.getNumTransactions()).toBe(3);
            });

            test('Updates all transaction fields', () => {
                const edited = BUDGET.editTransaction(TR1.id, 
                    { 
                        date: '10 dec',
                        vendor: 'Santouka',
                        amount: 15.00
                    }
                );

                const actual = BUDGET.getTransaction(TR1.id);
                expect(actual).toEqual(edited);
            });

            test('Updates individual transaction fields', () => {

            });

            test('Does nothing if transaction does not exist', () => {

            });

            test('Does nothing if options object is in an incorrect format', () => {

            });
        });
    });

    describe('Getters', () => {
        beforeAll(() => {
            BUDGET.add('Shopping', 150);
            BUDGET.add('Food', 600);
            BUDGET.addTransaction(TR1, 'Food');
            BUDGET.addTransaction(TR2, 'Food');
            BUDGET.addTransaction(TR3, 'Shopping');
        })

        test('Retrieves the default uncategorized category object', () => {
            expect(BUDGET.getDefault()).toEqual(DEFAULT);
        });

        test('Retrieves the appropriate category object', () => {
            expect(BUDGET.getCategory('Shopping')).toEqual(CTG1);
            expect(BUDGET.getCategory('Food')).toEqual(CTG2);
        });

        test('Retrieves the category pertaining to given transaction', () => {
            expect(BUDGET.getCategoryOf(TR1.id)).toEqual(CTG2);
            expect(BUDGET.getCategoryOf(3)).toBeNull();
        });

        test('Retrieves all categories in budget', () => {
            expect(BUDGET.getAllCategories()).toEqual([CTG1, CTG2]);
        });

        test('Retrieves size of category', () => {
            expect(BUDGET.getSizeOf('Food')).toEqual(2);
        });

        test('Returns size = 0 if category does not exist', () => {
            expect(BUDGET.getSizeOf('Car')).toEqual(0);
        });

        test('Retrieves transaction with given id', () => {
            expect(BUDGET.getTransaction(TR1.id)).toEqual(TR1);
        });

        test('Returns null if id does not correspond to a transaction', () => {
            expect(BUDGET.getTransaction(3)).toBeNull();
        });

        test('Returns all transactions in this budget', () => {
            expect(BUDGET.getAllTransactions()).toEqual([TR3,TR1,TR2]);
        });

        test('Retrieves the total number of transactions in this budget', () => {
            expect(BUDGET.getNumTransactions()).toBe(3);
        });

        test('Retrieves all transactions in given category', () => {
            expect(BUDGET.getByCategory('Food')).toEqual([TR1,TR2]);
        });

        test('Returns empty array if category does not exist', () => {
            expect(BUDGET.getByCategory('Car')).toEqual([]);
        });

        test('Returns all transactions with date equal to given date', () => {
            expect(BUDGET.getByDate('14 dec')).toEqual([TR2,TR3]);
        });

        test('Returns empty array if no transaction matches given date', () => {
            expect(BUDGET.getByDate('11 dec')).toEqual([]);
        });

        test('Returns empty array if given date string not parsable', () => {
            expect(BUDGET.getByDate('blabal')).toEqual([]);
        });

        test('Returns all transactions with vendor equal to given vendor', () => {
            expect(BUDGET.getByVendor('Danbo')).toEqual([TR1]);
        });

        test('Returns empty array if no transaction matches given vendor', () => {
            expect(BUDGET.getByVendor('Starbucks')).toEqual([]);
        });

        test('Returns total expenditure for all categories in this budget', () => {
            expect(BUDGET.getTotalExpenditure()).toEqual(TR1.amount + TR2.amount + TR3.amount);
        });

        test('Returns remaining amount available for all categories', () => {
            expect(BUDGET.getRemainder()).toEqual(682.3);
        });
    });
});