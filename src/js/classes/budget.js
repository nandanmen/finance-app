'use strict'

import Category from './Category';
import Transaction from './Transaction';

/**
 * This class represents a budget. A budget is a set of 
 * Category objects. By default the Budget has 1 category,
 * the 'Uncategorized' category.
 */

export default class Budget {
    constructor() {
        this.categories = [new Category('Uncategorized', 0)];
    }

    /**
     * Adds a new empty category to this budget.
     * @param {String} category the name of the category
     * @param {Number} amount the budgeted amount for this category
     * @returns {Category} the category that was added
     */
    add(category, amount) {
        if (!this.contains(category)) {
            const toAdd = new Category(category, amount);
            this.categories.push(toAdd);
            return toAdd;
        }
        return null;
    }

    /**
     * Adds a new transaction to the given category, if it exists.
     * TODO: If it does not exist, prompt user if they wish to make a new
     *       category.
     * @param {Transaction} transaction the transaction to be added
     * @param {String} category the category of the transaction
     * @param {Number} amount optional, budgeted amount of new category
     * @returns {Transaction} the transaction that was added if successful
     */
    addTransaction(transaction, category = 'Uncategorized', amount = null) {
        let ctg = this.getCategory(category);
        if (!ctg) {
            ctg = this.add(category, amount);
        }
        ctg.add(transaction);
        return transaction;
    }

    /**
     * Removes the category with the given name.
     * @param {String} category 
     * @returns {Category} the category that was removed.
     */
    remove(category) {
        const ctg = this.getCategory(category);
        const idx = this.categories.indexOf(ctg);
        if (idx > -1) this.categories.splice(idx, 1);
        return ctg;
    }

    /**
     * Removes the transaction with given id from this budget.
     * @param {Number} id 
     * @returns {Transaction} the transaction that was removed.
     */
    removeTransaction(id) {
        const ctg = this.getCategoryOf(id);
        let toRemove = null;
        if (ctg) {
            toRemove = ctg.getById(id);
            ctg.remove(id);
        }
        return toRemove;
    }

    /**
     * Deletes all categories except for the default
     * 'Uncategorized' category.
     */
    clear() {
        this.categories.forEach(ctg => ctg.clear());
        this.categories = [new Category('Uncategorized', 0)];
    }

    /**
     * Moves the transaction with given id to the category with
     * given name. TODO: If category does not exist, prompt user
     * if they wish to make a new category.
     * @param {Number} id 
     * @param {String} category 
     * @returns {Transaction} the transaction that was moved.
     */
    move(id, category, amount = null) {
        const old = this.getCategoryOf(id);
        let target = this.getCategory(category);
        if (!target) target = this.add(category, amount);

        const toMove = this.getTransaction(id);
        if (toMove) {
            old.remove(id);
            target.add(toMove);
        }
        return toMove;
    }

    /**
     * 
     * @param {String} category 
     * @param {Category} options 
     * @returns {Category} the revised category object
     */
    edit(category, { name, amount } = {}) {
        let edit = this.getCategory(category);
        if (edit) {
            if (name) edit.name = name;
            if (amount) edit.budgeted = amount;
        }
        return edit;
    }

    /**
     * 
     * @param {Number} id 
     * @param {Object} options 
     * @returns {Transactions} the revised transactions object
     */
    editTransaction(id, { date, vendor, amount } = {}) {
        const old = this.getTransaction(id);
        const ctg = this.getCategoryOf(id);
        if (old) {
            let edit = new Transaction(old.id, old.date, old.vendor, old.amount);
            if (date) edit.date = new Date(date);
            if (vendor) edit.vendor = vendor;
            if (amount) edit.amount = amount;

            this.removeTransaction(old.id);
            this.addTransaction(edit, ctg.name);
            return edit;
        }
        return null;
    }

    /**
     * Returns the number of categories in this budget.
     * @returns {Number} the number of categories.
     */
    size() {
        return this.categories.length;
    }

    /**
     * Checks whether this budget contains the category
     * with the given name.
     * @param {String} category the name of the category to look for.
     * @returns {Boolean} true if this budget contains the given category.
     */
    contains(category) {
        const filtered = this.categories.filter(ctg => ctg.name === category);
        return (filtered.length > 0);
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Boolean}
     */
    containsTransaction(id) {
        return this.categories
                .filter(ctg => ctg.contains(id))
                .length > 0;
    }

    /**
     * @returns {Category}
     */
    getDefault() {
        return this.categories[0];
    }

    /**
     * Returns the category with the given name.
     * @param {String} category 
     * @returns {Category} the category if found, null otherwise.
     */
    getCategory(category) {
        const filtered = this.categories.filter(ctg => ctg.name === category);
        return filtered.length > 0 ? filtered[0] : null;
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Category} category object containing this transaction.
     */
    getCategoryOf(id) {
        for (const ctg of this.categories) {
            if (ctg.contains(id)) return ctg;
        }
        return null;
    }

    /**
     * Returns all categories except for 'Uncategorized'.
     * @returns {Category[]}
     */
    getAllCategories() {
        return this.categories.slice(1);
    }

    /**
     * Returns the number of transactions in the category with
     * the given name.
     * @param {String} category name of category to look for
     * @returns {Number} Size of category, if found. 0 otherwise.
     */
    getSizeOf(category) {
        const ctg = this.getCategory(category);
        return ctg ? ctg.size() : 0;
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Transaction}
     */
    getTransaction(id) {
        const container = this.getCategoryOf(id);
        if (container) return container.getById(id);
        return null;
    }

    /**
     * Returns all the transactions in every category.
     * @returns {Transaction[]}
     */
    getAllTransactions() {
        let result = [];
        for (const ctg of this.categories) {
            result.push(...ctg.getTransactions());
        }
        return result;
    }

    /**
     * @returns {Number}
     */
    getNumTransactions() {
        return this.getAllTransactions().length;
    }

    /**
     * Returns all transactions in the category with 
     * the given name.
     * @param {String} category name of category to look for
     * @returns {Transaction[]}
     */
    getByCategory(category) {
        const container = this.getCategory(category);
        return container ? container.getTransactions() : [];
    }

    /**
     * Returns all transactions for the given date in each
     * category.
     * @param {String} date Date string we are looking for
     * @returns {Transaction[]}
     */
    getByDate(date) {
        const dt = new Date(date);
        let result = [];
        for (const ctg of this.categories) {
            result.push(...ctg.getByDate(dt));
        }
        return result;
    }

    /**
     * Returns all transactions in each category with
     * given vendor.
     * @param {String} vendor name of vendor
     * @returns {Transaction[]}
     */
    getByVendor(vendor) {
        let result = [];
        for (const ctg of this.categories) {
            result.push(...ctg.getByVendor(vendor));
        }
        return result;;
    }

    /**
     * Returns total expenditure in every category.
     * @returns {Number}
     */
    getTotalExpenditure() {
        return this.categories.reduce((acc, ctg) => {
            return acc + ctg.getTotalExpenditure();
        }, 0);
    }

    /**
     * Returns the remaining amount left in the budget.
     * @returns {Number}
     */
    getRemainder() {
        return this.categories.reduce((acc, ctg) => {
            return acc + ctg.budgeted;
        }, 0) - this.getTotalExpenditure();
    }

    /**
     * 
     * @param {*} target 
     */
    render(target) {

    }
}