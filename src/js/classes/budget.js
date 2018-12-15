'use strict'

import Category from './Category';
import Transaction from './Transaction';

/**
 * This class represents a budget. A budget
 * is a set of Category objects.
 */

export default class Budget {
    constructor() {
        this.default = new Category('Uncategorized', 0);
        this.categories = [];
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

    }

    /**
     * Adds a new transaction to the given category, if it exists.
     * TODO: If it does not exist, prompt user if they wish to make a new
     *       category.
     * @param {String} date a string corresponding to the date of the transaction
     * @param {String} vendor name of the vendor
     * @param {Number} amount amount of the transaction
     * @param {String} category the category of the transaction
     * @returns {Transaction} the transaction that was added
     */
    addTransaction(date, vendor, amount, category) {

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

    }

    /**
     * Moves the transaction with given id to the category with
     * given name. TODO: If category does not exist, prompt user
     * if they wish to make a new category.
     * @param {Number} id 
     * @param {String} category 
     */
    move(id, category) {

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
     * Deletes all categories except for the default
     * 'Uncategorized' category.
     */
    clear() {
        for (let i = 0; i < this.size(); i++) {
            this.categories.pop();
        }
    }

    /**
     * Returns the category with the given name.
     * @param {String} category 
     * @returns {Category} the category if found, null otherwise.
     */
    getCategory(category) {

    }

    /**
     * Returns all categories except for 'Uncategorized'.
     * @returns {Category[]}
     */
    getAllCategories() {

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
     * Returns all the transactions in every category.
     * @returns {Transaction[]}
     */
    getAllTransactions() {

    }

    /**
     * Returns all transactions in the category with 
     * the given name.
     * @param {String} category name of category to look for
     * @returns {Transaction[]}
     */
    getByCategory(category) {

    }

    /**
     * Returns all transactions for the given date in each
     * category.
     * @param {String} date Date string we are looking for
     * @returns {Transaction[]}
     */
    getByDate(date) {

    }

    /**
     * Returns all transactions in each category with
     * given vendor.
     * @param {String} vendor name of vendor
     * @returns {Transaction[]}
     */
    getByVendor(vendor) {

    }

    /**
     * Returns total expenditure in every category.
     * @returns {Number}
     */
    getTotalExpenditure() {

    }

    /**
     * Returns the remaining amount left in the budget.
     * @returns {Number}
     */
    getRemainder() {

    }

    /**
     * 
     * @param {*} target 
     */
    render(target) {

    }
}