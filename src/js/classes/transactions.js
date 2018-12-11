'use strict'

import Categories from './categories';
import Transaction from './transaction';

/**
 * This class represents a list of Transaction
 * objects. Allows for searching of transactions,
 * addition and removal of transactions.
 */

export default class Transactions {
    constructor(transactions) {
        this.transactions = transactions;
    }

    /**
     * 
     * @param {String} date 
     * @param {String} vendor 
     * @param {Number} amount 
     * @param {String} category 
     */
    add(date, vendor, amount, category) {

    }

    /**
     * 
     * @param {Transaction} transaction 
     */
    remove(transaction) {

    }

    /**
     * 
     * @param {Transaction} transaction 
     * @param {Object} values 
     */
    edit(transaction, values) {

    }

    /**
     * 
     * @param {Object} options 
     */
    getTransactions(options) {
        
    }

    /**
     * Renders the list of transactions onto the DOM node 
     * specified by target.
     * @param {Node} target the node to append the rendered 
     *                      elements to.
     */
    render(target) {
        const template = document.getElementById("template--transaction");
        this.transactions.forEach(transaction => {
            const date = template.content.querySelector(".transaction__date");
            const dateText = document.createTextNode(transaction.getDate());
            date.appendChild(dateText);

            const vendor = template.content.querySelector(".transaction__vendor");
            const vendorText = document.createTextNode(transaction.vendor);
            vendor.appendChild(vendorText);

            const amount = template.content.querySelector(".transaction__amount");
            const amountNum = document.createTextNode(transaction.amount);
            amount.appendChild(amountNum);

            const toMount = document.importNode(template.content, true);
            target.appendChild(toMount);
        });
    }
}