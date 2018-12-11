'use strict'

import "./../css/main.scss";

import Categories from './categories';
import Budget from './budget';
import Transactions from './transactions';
import Transaction from './transaction';

import User from './user';

function main() {
    let transactions = JSON.parse(localStorage.getItem('transactions'));
    if (!transactions) transactions = [];

    const transList = new Transactions(transactions);
    const transContainer = document.querySelector('.transactions');
    transList.render(transContainer);
}

main();