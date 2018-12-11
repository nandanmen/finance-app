'use strict'

import "./../css/main.scss";

import Categories from './classes/categories';
import Budget from './classes/budget';
import Transactions from './classes/transactions';
import Transaction from './classes/transaction';

import User from './classes/user';

function main() {
    let transactions = JSON.parse(localStorage.getItem('transactions'));
    if (!transactions) transactions = [];

    const transList = new Transactions(transactions);
    const transContainer = document.querySelector('.transactions');
    transList.render(transContainer);
}

main();