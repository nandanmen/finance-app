'use strict'

/**
 * This class represents a transaction. A transaction
 * consists of:
 *      - the date of transaction
 *      - the name of the vendor
 *      - the amount in the transaction
 */

export default class Transaction {
    constructor(id, date, vendor, amount) {
        this.id = id;
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

    getAmount() {
        return this.amount.toFixed(2);
    }

    setDate(newDate) {
        this.date = new Date(newDate);
    }

    /**
     * Renders this transaction onto the DOM
     * node specified by target.
     * @param {Element} target 
     */
    render(target) {
        const template = document.importNode(document.getElementById('template--transaction').content, true);
        console.log(template);
        const date = template.querySelector('.transaction__date');
        date.textContent = this.getDate();
        const vendor = template.querySelector('.transaction__vendor');
        vendor.textContent = this.vendor;
        const amount = template.querySelector('.transaction__amount');
        amount.textContent = this.getAmount();
        target.appendChild(template, true);
    }
}