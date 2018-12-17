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
        this.expenses = 0;
        this.total = 0;
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
            this.total += amount;
            return toAdd;
        }
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
        if (!this.contains(category)) {
            this.add(category, amount);
        }
        const ctg = this.getCategory(category);
        ctg.add(transaction);
    }

    /**
     * Removes the category with the given name.
     * @param {String} category 
     * @returns {Category} the category that was removed.
     */
    remove(category) {
        
    }

    /**
     * Removes the transaction with given id from this budget.
     * @param {Number} id 
     * @returns {Transaction} the transaction that was removed.
     */
    removeTransaction(id) {
        return null;
    }

    /**
     * Deletes all categories except for the default
     * 'Uncategorized' category.
     */
    clear() {
        for (let i = 1; i < this.size(); i++) {
            this.categories.pop();
        }
    }

    /**
     * Moves the transaction with given id to the category with
     * given name. TODO: If category does not exist, prompt user
     * if they wish to make a new category.
     * @param {Number} id 
     * @param {String} category 
     * @returns {Transaction} the transaction that was moved.
     */
    move(id, category) {
        return null;
    }

    /**
     * 
     * @param {String} category 
     * @param {Category} options 
     * @returns {Category} the revised category object
     */
    edit(category, { name, amount } = {}) {

    }

    /**
     * 
     * @param {Number} id 
     * @param {Object} options 
     * @returns {Transactions} the revised transactions object
     */
    editTransaction(id, { date, vendor, amount } = {}) {

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
        return null;
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Category} category object containing this transaction.
     */
    getCategoryOf(id) {

    }

    /**
     * Returns all categories except for 'Uncategorized'.
     * @returns {Category[]}
     */
    getAllCategories() {
        return [];
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

    }

    /**
     * Returns all the transactions in every category.
     * @returns {Transaction[]}
     */
    getAllTransactions() {
        return [];
    }

    /**
     * @returns {Number}
     */
    getNumTransactions() {

    }

    /**
     * Returns all transactions in the category with 
     * the given name.
     * @param {String} category name of category to look for
     * @returns {Transaction[]}
     */
    getByCategory(category) {
        return [];
    }

    /**
     * Returns all transactions for the given date in each
     * category.
     * @param {String} date Date string we are looking for
     * @returns {Transaction[]}
     */
    getByDate(date) {
        return [];
    }

    /**
     * Returns all transactions in each category with
     * given vendor.
     * @param {String} vendor name of vendor
     * @returns {Transaction[]}
     */
    getByVendor(vendor) {
        return [];
    }

    /**
     * Returns total expenditure in every category.
     * @returns {Number}
     */
    getTotalExpenditure() {
        return 0;
    }

    /**
     * Returns the remaining amount left in the budget.
     * @returns {Number}
     */
    getRemainder() {
        return 0;
    }

    /**
     * 
     * @param {*} target 
     */
    render(target) {

    }
}