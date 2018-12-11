'use strict'

import Category from './category';

/**
 * This class represents a budget. A budget
 * is a set of Category objects.
 */

export default class Budget {
    constructor() {
        this.categories = new Set();
        this.categories.add(new Category('Uncategorized', 0));
    }

    /**
     * 
     * @param {*} category 
     */
    add(category) {

    }

    /**
     * 
     * @param {*} date 
     * @param {*} vendor 
     * @param {*} amount 
     * @param {*} category 
     */
    addTransaction(date, vendor, amount, category) {

    }

    /**
     * 
     * @param {*} category 
     */
    remove(category) {

    }

    /**
     * 
     * @param {*} id 
     */
    removeTransaction(id) {

    }

    /**
     * 
     * @param {*} id 
     * @param {*} category 
     */
    move(id, category) {

    }

    /**
     * 
     * @param {*} category 
     */
    getCategory(category) {

    }

    /**
     * 
     */
    getAllCategories() {

    }

    /**
     * 
     */
    getAllTransactions() {

    }

    /**
     * 
     * @param {*} date 
     */
    getByDate(date) {

    }

    /**
     * 
     * @param {*} vendor 
     */
    getByVendor(vendor) {

    }

    /**
     * 
     */
    getTotalExpenditure() {

    }

    /**
     * 
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