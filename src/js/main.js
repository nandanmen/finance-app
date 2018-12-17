'use strict'

import "./../css/main.scss";

import Budget from './classes/Budget';
import Category from './classes/Category';
import Transaction from './classes/Transaction';

function main() {
    const bgt = new Budget();
    bgt.add('Shopping', 150);
    bgt.add('Food', 600);
    bgt.addTransaction(new Transaction(
        0, '14 dec', 'Lululemon', 250
    ), 'Shopping');
    bgt.addTransaction(new Transaction(
        1, '14 dec', 'Saveons', 25
    ), 'Food');
    bgt.render(document.querySelector('#app'));
}

main();