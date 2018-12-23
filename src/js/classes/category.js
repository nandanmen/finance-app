'use strict'

import Transaction from './Transaction';

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
     * @param {Transaction} args the transaction(s) to be added.
     */
    add(...args) {
        args.forEach(arg => this.addOne(arg));
    }

    /**
     * Adds a single transaction to this category.
     * @param {Transaction} transaction the transaction to add.
     */
    addOne(transaction) {
        while (this.contains(transaction.id))
            transaction.id++;
        this.transactions.set(transaction.id, transaction);
    }

    /**
     * Removes the transaction with id from this category.
     * @param {Number} ids the id(s) of the transactions to remove.
     */
    remove(...ids) {
        ids.forEach(id => this.removeOne(id));
    }

    /**
     * Removes a single transaction from this category.
     * @param {Number} id the id of the transaction to remove.
     * @returns {Transaction} the transaction that was removed, if
     *                        it exists. Null otherwise.
     */
    removeOne(id) {
        if (this.contains(id)) {
            const toRemove = this.transactions.get(id);
            this.transactions.delete(id);
            return toRemove;
        }
        return null;
    }

    /**
     * Edits the transaction with given id based on the
     * options object passed.
     * @param {Number} id 
     * @param {Object} options 
     * @returns {Transaction} the revised transaction, if id exists. Returns
     *                        null otherwise.
     */
    edit(id, { date, vendor, amount } = {}) {
        const tr = this.getById(id);
        if (tr) {
            let edit = new Transaction(tr.id, tr.date, tr.vendor, tr.amount);
            if (date) edit.date = date;
            if (vendor) edit.vendor = vendor;
            if (amount) edit.amount = amount;
            this.remove(tr);
            this.add(edit);
            return edit;
        }
        return null;
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
     * @returns {Transaction[]} all transactions in this category.
     */
    getTransactions() {
        return [...this.transactions.values()];
    }

    /**
     * Returns all transactions in this category
     * with vendor equal to the passed vendor.
     * @param {String} vendor 
     * @returns {Transaction[]}
     */
    getByVendor(vendor) {
        const transactions = this.getTransactions();
        return transactions.filter(tr => tr.vendor === vendor);
    }

    /**
     * Returns all transactions with date equal
     * to the parameter date.
     * @param {Date} date 
     * @returns {Transaction[]}
     */
    getByDate(date) {
        const transactions = this.getTransactions();
        return transactions.filter(tr => tr.date.getTime() === date.getTime());
    }

    /**
     * Return the transaction with the given id.
     * @param {Number} id 
     * @returns {Transaction}
     */
    getById(id) {
        return this.transactions.get(id);
    }

    /**
     * Returns true if this category contains the
     * transaction with the given id.
     * @param {Number} id 
     * @returns {Boolean}
     */
    contains(id) {
        return this.transactions.has(id);
    }

    /**
     * Returns the total expenditure for this category.
     * The expenditure is defined as the sum of amounts of
     * each transaction.
     * @returns {Number}
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
        const li = document.createElement('li');
        li.textContent = this.name;
        target.appendChild(li);
    }
}