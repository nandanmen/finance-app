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
     * 
     * @param {*} id 
     * @param {*} options 
     */
    edit(id, options) {

    }

    /**
     * 
     */
    getTransactions() {

    }

    /**
     * 
     * @param {*} vendor 
     */
    getByVendor(vendor) {

    }

    /**
     * 
     * @param {*} date 
     */
    getByDate(date) {

    }

    /**
     * 
     * @param {*} id 
     */
    getById(id) {

    }

    /**
     * 
     * @param {*} id 
     */
    contains(id) {

    }

    /**
     * 
     */
    getTotalExpenditure() {

    }

    /**
     * 
     * @param {*} date 
     */
    getExpenditureByDate(date) {

    }

    /**
     * 
     * @param {*} vendor 
     */
    getExpenditureByVendor(vendor) {

    }

    /**
     * 
     * @param {Node} target 
     */
    render(target) {

    }
}