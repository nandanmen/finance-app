'use strict'

/**
 * This class represents a transaction. A transaction
 * consists of:
 *      - the date of transaction
 *      - the name of the vendor
 *      - the amount in the transaction
 */

export default class Transaction {
    constructor(date, vendor, amount) {
        this.date = new Date(date);
        this.vendor = vendor;
        this.amount = amount;
    }

    /**
     * Returns the date of this transaction in
     * the following format: DD/MM
     */
    getDate() {
        return `${this.date.getDate()}/${this.date.getMonth()+1}`;
    }

    setDate(newDate) {
        this.date = new Date(newDate);
    }

    /**
     * Renders this transaction onto the DOM
     * node specified by target.
     * @param {Node} target 
     */
    render(target) {

    }
}