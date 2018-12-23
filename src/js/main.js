'use strict'

import "./../css/main.scss";

import Budget from './classes/Budget';
import Category from './classes/Category';
import Transaction from './classes/Transaction';

function main() {
    const bgt = new Budget();
    const ctgBtn = document.querySelector(".category__btn");
    const form = document.getElementById("add-ctg");
    form.submit = function () {
        const name = document.getElementById("ctg--name").value;
        const amount = document.getElementById("ctg--amount").value;
        bgt.add(name, amount);
        return false;
    };
    ctgBtn.addEventListener("click", () => {
        const wrapper = document.querySelector(".wrapper--form");
        wrapper.style.display = "flex";
    });
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