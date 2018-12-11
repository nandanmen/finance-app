'use strict'

import Transaction from './transaction';

/**
 * This class represents a category. A
 * category has a name, budgeted amount
 * and a list of transactions pertaining
 * to this category.
 */

export default class Category {
    constructor(name, amount, transactions) {
        this.name = name;
        this.amount = amount;
        this.transactions = transactions;
    }
}