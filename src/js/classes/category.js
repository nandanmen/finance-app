'use strict'

import Transaction from './transaction';

const ID_COUNT = 65536;

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
     * @param {Transaction} transaction the transaction to be added.
     *                      This function accepts a single transaction,
     *                      or an array of transactions.
     */
    add(transaction) {
        if (transaction.constructor == Array) {
            transaction.forEach(tr => {
                this.addOne.call(this, tr);
            });
        } else {
            this.addOne(transaction);
        }
    }

    /**
     * Adds a single transaction to this category.
     * @param {Transaction} transaction 
     */
    addOne(transaction) {
        let id = Math.ceil(Math.random() * ID_COUNT);
        while (this.transactions.has(id)) id++;
        transaction.id = id;
        this.transactions.set(transaction.id, transaction);
    }

    /**
     * Removes the transaction with id from this category.
     * @param {Number} id 
     */
    remove(id) {
        if (this.contains(id))
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
     * Deletes all transactions in this category.
     */
    clear() {
        this.transactions.clear();
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