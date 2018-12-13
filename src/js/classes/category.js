'use strict'

import Transaction from './transaction';

/**
 * This class represents a category. A category 
 * has a name, budgeted amount and a list of 
 * transactions pertaining to this category.
 */

export default class Category {
    constructor(name, amount) {
        this.name = name;
        this.budgeted = amount;
        this.transactions = new Map();
    }

    /**
     * Adds a new transaction made with the given
     * parameters into this category.
     * @param {String} date 
     * @param {String} vendor 
     * @param {Number} amount 
     */
    add(date, vendor, amount) {
        let id = Math.random() * 65536;
        while (this.transactions.has(id)) id++;

        const toAdd = new Transaction(date, vendor, amount);
        this.transactions.set(id, toAdd);
    }

    /**
     * Removes the transaction with id from this category.
     * @param {Number} id 
     */
    remove(id) {
        this.transactions.delete(id);
    }

    /**
     * Edits the transaction with given id based on the
     * parameters set by the options object.
     * @param {Number} id 
     * @param {Object} options 
     */
    edit(id, options) {

    }

    /**
     * Returns the number of transactions in
     * this category.
     * @returns {Number} number of transactions
     */
    size() {
        return this.transactions.size;
    }

    /**
     * Returns all the transactions in this category
     * as an array.
     */
    getTransactions() {
        return [...this.transactions.entries()];
    }

    /**
     * Returns all transactions in this category
     * with vendor equal to the passed vendor.
     * @param {String} vendor 
     */
    getByVendor(vendor) {
        const transactions = this.getTransactions();
        return transactions.filter(tr => tr.vendor === vendor);
    }

    /**
     * Returns all transactions with date equal
     * to the parameter date.
     * @param {Date} date 
     */
    getByDate(date) {
        const transactions = this.getTransactions();
        return transactions.filter(tr => tr.date === date);
    }

    /**
     * Return the transaction with the given id.
     * @param {Number} id 
     */
    getById(id) {
        return this.transactions.get(id);
    }

    /**
     * Returns true if this category contains the
     * transaction with the given id.
     * @param {Number} id 
     */
    contains(id) {
        return this.transactions.has(id);
    }

    /**
     * Returns the total expenditure for this category.
     * The expenditure is defined as the sum of amounts of
     * each transaction.
     */
    getTotalExpenditure() {
        const transactions = this.getTransactions();
        return transactions.reduce((acc, tr) => {
            return acc + tr.amount;
        }, 0);
    }

    /**
     * Returns the total expenditure for a given date.
     * @param {Date} date 
     */
    getExpenditureByDate(date) {
        const transactions = this.getByDate(date);
        return transactions.reduce((acc, tr) => {
            return acc + tr.amount;
        }, 0);
    }

    /**
     * Returns the total expenditure for a given vendor.
     * @param {String} vendor 
     */
    getExpenditureByVendor(vendor) {
        const transactions = this.getByVendor(vendor);
        return transactions.reduce((acc, tr) => {
            return acc + tr.amount;
        }, 0);
    }

    /**
     * 
     * @param {Node} target 
     */
    render(target) {

    }
}