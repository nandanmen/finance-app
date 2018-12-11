'use strict'

import "./../css/main.scss";
import Transactions from "./transactions";

function main() {
    let transactions = JSON.parse(localStorage.getItem('transactions'));
    if (!transactions) transactions = [];

    const transList = new Transactions(transactions);
    const transContainer = document.querySelector('.transactions');
    transList.render(transContainer);
}

main();