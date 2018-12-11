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
     * 
     * @param {*} date 
     * @param {*} vendor 
     * @param {*} amount 
     */
    add(date, vendor, amount) {

    }

    /**
     * 
     * @param {*} id 
     */
    remove(id) {

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