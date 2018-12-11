'use strict'

import { categories } from "./categories";

let transactions;

/**
 * Sets up event listeners and populates 
 * transactions array.
 */
function init() {
    transactions = JSON.parse(localStorage.getItem("transactions"));
    if (!transactions) transactions = [];
}

/**
 * 
 * @param {*} tr 
 */
function add(tr) {

}

/**
 * 
 * @param {*} tr 
 */
function remove(tr) {

}

/**
 * 
 * @param {*} tr 
 */
function edit(tr) {

}