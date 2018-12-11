'use strict'

/**
 * This class represents a transaction. A transaction
 * consists of:
 *      - the date of transaction
 *      - the name of the vendor
 *      - the amount in the transaction
 *      - the category the transaction belongs to
 */

export default class Transaction {
    constructor(date, vendor, amount, category) {
        this.date = new Date(date);
        this.vendor = vendor;
        this.amount = amount;
        this.category = category;
    }
    getDate() {
        return `${this.date.getDate()}/${this.date.getMonth()+1}`;
    }
}