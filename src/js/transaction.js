'use strict'

/**
 * This class represents a transaction. A transaction
 * consists of:
 *      - the date of transaction
 *      - the name of the vendor
 *      - the amount in the transaction
 *      - the category the transaction belongs to
 */

export class Transaction {
    constructor(date, vendor, amount, category) {
        this.date = new Date(date);
        this.vendor = vendor;
        this.amount = amount;
        this.category = category;
    }
    get date() {
        return `${this.date.getDate()}/${this.date.getMonth()}`;
    }
    get vendor() {
        return this.vendor;
    }
    get amount() {
        return this.amount.toFixed(2);
    }
    get category() {
        return this.category;
    }
    set date(newDate) {
        this.date = new Date(newDate);
    }
    set vendor(newVendor) {
        this.vendor = newVendor;
    }
    set amount(newAmount) {
        this.amount = newAmount;
    }
    set category(newCategory) {
        this.category = newCategory;
    }
}