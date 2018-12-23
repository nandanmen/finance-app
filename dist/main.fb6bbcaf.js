// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel/src/builtins/bundle-url.js"}],"css/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel/src/builtins/css-loader.js"}],"js/classes/Transaction.js":[function(require,module,exports) {
'use strict';
/**
 * This class represents a transaction. A transaction
 * consists of:
 *      - the date of transaction
 *      - the name of the vendor
 *      - the amount in the transaction
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Transaction =
/*#__PURE__*/
function () {
  function Transaction(id, date, vendor, amount) {
    _classCallCheck(this, Transaction);

    this.id = id;
    this.date = new Date(date);
    this.vendor = vendor;
    this.amount = amount;
  }
  /**
   * Returns the date of this transaction in
   * the following format: DD/MM
   */


  _createClass(Transaction, [{
    key: "getDate",
    value: function getDate() {
      return "".concat(this.date.getDate(), "/").concat(this.date.getMonth() + 1);
    }
  }, {
    key: "getAmount",
    value: function getAmount() {
      return this.amount.toFixed(2);
    }
  }, {
    key: "setDate",
    value: function setDate(newDate) {
      this.date = new Date(newDate);
    }
    /**
     * Renders this transaction onto the DOM
     * node specified by target.
     * @param {Element} target 
     */

  }, {
    key: "render",
    value: function render(target) {
      var template = document.importNode(document.getElementById('template--transaction').content, true);
      console.log(template);
      var date = template.querySelector('.transaction__date');
      date.textContent = this.getDate();
      var vendor = template.querySelector('.transaction__vendor');
      vendor.textContent = this.vendor;
      var amount = template.querySelector('.transaction__amount');
      amount.textContent = this.getAmount();
      target.appendChild(template, true);
    }
  }]);

  return Transaction;
}();

exports.default = Transaction;
},{}],"js/classes/Category.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Transaction = _interopRequireDefault(require("./Transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * This class represents a category. A category 
 * has a name, budgeted amount and a list of 
 * transactions pertaining to this category.
 */
var Category =
/*#__PURE__*/
function () {
  function Category(name, amount) {
    _classCallCheck(this, Category);

    this.name = name;
    this.budgeted = amount;
    this.transactions = new Map();
  }
  /**
   * Adds a new transaction made with the given
   * parameters into this category.
   * @param {Transaction} args the transaction(s) to be added.
   */


  _createClass(Category, [{
    key: "add",
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (arg) {
        return _this.addOne(arg);
      });
    }
    /**
     * Adds a single transaction to this category.
     * @param {Transaction} transaction the transaction to add.
     */

  }, {
    key: "addOne",
    value: function addOne(transaction) {
      while (this.contains(transaction.id)) {
        transaction.id++;
      }

      this.transactions.set(transaction.id, transaction);
    }
    /**
     * Removes the transaction with id from this category.
     * @param {Number} ids the id(s) of the transactions to remove.
     */

  }, {
    key: "remove",
    value: function remove() {
      var _this2 = this;

      for (var _len2 = arguments.length, ids = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        ids[_key2] = arguments[_key2];
      }

      ids.forEach(function (id) {
        return _this2.removeOne(id);
      });
    }
    /**
     * Removes a single transaction from this category.
     * @param {Number} id the id of the transaction to remove.
     * @returns {Transaction} the transaction that was removed, if
     *                        it exists. Null otherwise.
     */

  }, {
    key: "removeOne",
    value: function removeOne(id) {
      if (this.contains(id)) {
        var toRemove = this.transactions.get(id);
        this.transactions.delete(id);
        return toRemove;
      }

      return null;
    }
    /**
     * Edits the transaction with given id based on the
     * options object passed.
     * @param {Number} id 
     * @param {Object} options 
     * @returns {Transaction} the revised transaction, if id exists. Returns
     *                        null otherwise.
     */

  }, {
    key: "edit",
    value: function edit(id) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          date = _ref.date,
          vendor = _ref.vendor,
          amount = _ref.amount;

      var tr = this.getById(id);

      if (tr) {
        var edit = new _Transaction.default(tr.id, tr.date, tr.vendor, tr.amount);
        if (date) edit.date = date;
        if (vendor) edit.vendor = vendor;
        if (amount) edit.amount = amount;
        this.remove(tr);
        this.add(edit);
        return edit;
      }

      return null;
    }
    /**
     * Returns the number of transactions in
     * this category.
     * @returns {Number} number of transactions
     */

  }, {
    key: "size",
    value: function size() {
      return this.transactions.size;
    }
    /**
     * Deletes all transactions in this category.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.transactions.clear();
    }
    /**
     * Returns all the transactions in this category
     * as an array.
     * @returns {Transaction[]} all transactions in this category.
     */

  }, {
    key: "getTransactions",
    value: function getTransactions() {
      return _toConsumableArray(this.transactions.values());
    }
    /**
     * Returns all transactions in this category
     * with vendor equal to the passed vendor.
     * @param {String} vendor 
     * @returns {Transaction[]}
     */

  }, {
    key: "getByVendor",
    value: function getByVendor(vendor) {
      var transactions = this.getTransactions();
      return transactions.filter(function (tr) {
        return tr.vendor === vendor;
      });
    }
    /**
     * Returns all transactions with date equal
     * to the parameter date.
     * @param {Date} date 
     * @returns {Transaction[]}
     */

  }, {
    key: "getByDate",
    value: function getByDate(date) {
      var transactions = this.getTransactions();
      return transactions.filter(function (tr) {
        return tr.date.getTime() === date.getTime();
      });
    }
    /**
     * Return the transaction with the given id.
     * @param {Number} id 
     * @returns {Transaction}
     */

  }, {
    key: "getById",
    value: function getById(id) {
      return this.transactions.get(id);
    }
    /**
     * Returns true if this category contains the
     * transaction with the given id.
     * @param {Number} id 
     * @returns {Boolean}
     */

  }, {
    key: "contains",
    value: function contains(id) {
      return this.transactions.has(id);
    }
    /**
     * Returns the total expenditure for this category.
     * The expenditure is defined as the sum of amounts of
     * each transaction.
     * @returns {Number}
     */

  }, {
    key: "getTotalExpenditure",
    value: function getTotalExpenditure() {
      var transactions = this.getTransactions();
      return transactions.reduce(function (acc, tr) {
        return acc + tr.amount;
      }, 0);
    }
    /**
     * Returns the total expenditure for a given date.
     * @param {Date} date 
     */

  }, {
    key: "getExpenditureByDate",
    value: function getExpenditureByDate(date) {
      var transactions = this.getByDate(date);
      return transactions.reduce(function (acc, tr) {
        return acc + tr.amount;
      }, 0);
    }
    /**
     * Returns the total expenditure for a given vendor.
     * @param {String} vendor 
     */

  }, {
    key: "getExpenditureByVendor",
    value: function getExpenditureByVendor(vendor) {
      var transactions = this.getByVendor(vendor);
      return transactions.reduce(function (acc, tr) {
        return acc + tr.amount;
      }, 0);
    }
    /**
     * 
     * @param {Node} target 
     */

  }, {
    key: "render",
    value: function render(target) {
      var li = document.createElement('li');
      li.textContent = this.name;
      target.appendChild(li);
    }
  }]);

  return Category;
}();

exports.default = Category;
},{"./Transaction":"js/classes/Transaction.js"}],"js/classes/Budget.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Category = _interopRequireDefault(require("./Category"));

var _Transaction = _interopRequireDefault(require("./Transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * This class represents a budget. A budget is a set of 
 * Category objects. By default the Budget has 1 category,
 * the 'Uncategorized' category.
 */
var Budget =
/*#__PURE__*/
function () {
  function Budget() {
    _classCallCheck(this, Budget);

    this.categories = [new _Category.default('Uncategorized', 0)];
  }
  /**
   * Adds a new empty category to this budget.
   * @param {String} category the name of the category
   * @param {Number} amount the budgeted amount for this category
   * @returns {Category} the category that was added
   */


  _createClass(Budget, [{
    key: "add",
    value: function add(category, amount) {
      if (!this.contains(category)) {
        var toAdd = new _Category.default(category, amount);
        this.categories.push(toAdd);
        return toAdd;
      }

      return null;
    }
    /**
     * Adds a new transaction to the given category, if it exists.
     * TODO: If it does not exist, prompt user if they wish to make a new
     *       category.
     * @param {Transaction} transaction the transaction to be added
     * @param {String} category the category of the transaction
     * @param {Number} amount optional, budgeted amount of new category
     * @returns {Transaction} the transaction that was added if successful
     */

  }, {
    key: "addTransaction",
    value: function addTransaction(transaction) {
      var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Uncategorized';
      var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var ctg = this.getCategory(category);

      if (!ctg) {
        ctg = this.add(category, amount);
      }

      ctg.add(transaction);
      return transaction;
    }
    /**
     * Removes the category with the given name.
     * @param {String} category 
     * @returns {Category} the category that was removed.
     */

  }, {
    key: "remove",
    value: function remove(category) {
      var ctg = this.getCategory(category);
      var idx = this.categories.indexOf(ctg);
      if (idx > -1) this.categories.splice(idx, 1);
      return ctg;
    }
    /**
     * Removes the transaction with given id from this budget.
     * @param {Number} id 
     * @returns {Transaction} the transaction that was removed.
     */

  }, {
    key: "removeTransaction",
    value: function removeTransaction(id) {
      var ctg = this.getCategoryOf(id);
      var toRemove = null;

      if (ctg) {
        toRemove = ctg.getById(id);
        ctg.remove(id);
      }

      return toRemove;
    }
    /**
     * Deletes all categories except for the default
     * 'Uncategorized' category.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.categories.forEach(function (ctg) {
        return ctg.clear();
      });
      this.categories = [new _Category.default('Uncategorized', 0)];
    }
    /**
     * Moves the transaction with given id to the category with
     * given name. TODO: If category does not exist, prompt user
     * if they wish to make a new category.
     * @param {Number} id 
     * @param {String} category 
     * @returns {Transaction} the transaction that was moved.
     */

  }, {
    key: "move",
    value: function move(id, category) {
      var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var old = this.getCategoryOf(id);
      var target = this.getCategory(category);
      if (!target) target = this.add(category, amount);
      var toMove = this.getTransaction(id);

      if (toMove) {
        old.remove(id);
        target.add(toMove);
      }

      return toMove;
    }
    /**
     * 
     * @param {String} category 
     * @param {Category} options 
     * @returns {Category} the revised category object
     */

  }, {
    key: "edit",
    value: function edit(category) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          name = _ref.name,
          amount = _ref.amount;

      var edit = this.getCategory(category);

      if (edit) {
        if (name) edit.name = name;
        if (amount) edit.budgeted = amount;
      }

      return edit;
    }
    /**
     * 
     * @param {Number} id 
     * @param {Object} options 
     * @returns {Transactions} the revised transactions object
     */

  }, {
    key: "editTransaction",
    value: function editTransaction(id) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          date = _ref2.date,
          vendor = _ref2.vendor,
          amount = _ref2.amount;

      var old = this.getTransaction(id);
      var ctg = this.getCategoryOf(id);

      if (old) {
        var edit = new _Transaction.default(old.id, old.date, old.vendor, old.amount);
        if (date) edit.date = new Date(date);
        if (vendor) edit.vendor = vendor;
        if (amount) edit.amount = amount;
        this.removeTransaction(old.id);
        this.addTransaction(edit, ctg.name);
        return edit;
      }

      return null;
    }
    /**
     * Returns the number of categories in this budget.
     * @returns {Number} the number of categories.
     */

  }, {
    key: "size",
    value: function size() {
      return this.categories.length;
    }
    /**
     * Checks whether this budget contains the category
     * with the given name.
     * @param {String} category the name of the category to look for.
     * @returns {Boolean} true if this budget contains the given category.
     */

  }, {
    key: "contains",
    value: function contains(category) {
      var filtered = this.categories.filter(function (ctg) {
        return ctg.name === category;
      });
      return filtered.length > 0;
    }
    /**
     * 
     * @param {Number} id 
     * @returns {Boolean}
     */

  }, {
    key: "containsTransaction",
    value: function containsTransaction(id) {
      return this.categories.filter(function (ctg) {
        return ctg.contains(id);
      }).length > 0;
    }
    /**
     * @returns {Category}
     */

  }, {
    key: "getDefault",
    value: function getDefault() {
      return this.categories[0];
    }
    /**
     * Returns the category with the given name.
     * @param {String} category 
     * @returns {Category} the category if found, null otherwise.
     */

  }, {
    key: "getCategory",
    value: function getCategory(category) {
      var filtered = this.categories.filter(function (ctg) {
        return ctg.name === category;
      });
      return filtered.length > 0 ? filtered[0] : null;
    }
    /**
     * 
     * @param {Number} id 
     * @returns {Category} category object containing this transaction.
     */

  }, {
    key: "getCategoryOf",
    value: function getCategoryOf(id) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.categories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var ctg = _step.value;
          if (ctg.contains(id)) return new _Category.default(ctg.name, ctg.amount);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
    /**
     * Returns all categories except for 'Uncategorized'.
     * @returns {Category[]}
     */

  }, {
    key: "getAllCategories",
    value: function getAllCategories() {
      return this.categories.slice(1);
    }
    /**
     * Returns the number of transactions in the category with
     * the given name.
     * @param {String} category name of category to look for
     * @returns {Number} Size of category, if found. 0 otherwise.
     */

  }, {
    key: "getSizeOf",
    value: function getSizeOf(category) {
      var ctg = this.getCategory(category);
      return ctg ? ctg.size() : 0;
    }
    /**
     * 
     * @param {Number} id 
     * @returns {Transaction}
     */

  }, {
    key: "getTransaction",
    value: function getTransaction(id) {
      var container = this.getCategoryOf(id);
      if (container) return container.getById(id);
      return null;
    }
    /**
     * Returns all the transactions in every category.
     * @returns {Transaction[]}
     */

  }, {
    key: "getAllTransactions",
    value: function getAllTransactions() {
      var result = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.categories[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var ctg = _step2.value;
          result.push.apply(result, _toConsumableArray(ctg.getTransactions()));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result;
    }
    /**
     * @returns {Number}
     */

  }, {
    key: "getNumTransactions",
    value: function getNumTransactions() {
      return this.getAllTransactions().length;
    }
    /**
     * Returns all transactions in the category with 
     * the given name.
     * @param {String} category name of category to look for
     * @returns {Transaction[]}
     */

  }, {
    key: "getByCategory",
    value: function getByCategory(category) {
      var container = this.getCategory(category);
      return container ? container.getTransactions() : [];
    }
    /**
     * Returns all transactions for the given date in each
     * category.
     * @param {String} date Date string we are looking for
     * @returns {Transaction[]}
     */

  }, {
    key: "getByDate",
    value: function getByDate(date) {
      var dt = new Date(date);
      var result = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.categories[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var ctg = _step3.value;
          result.push.apply(result, _toConsumableArray(ctg.getByDate(dt)));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return result;
    }
    /**
     * Returns all transactions in each category with
     * given vendor.
     * @param {String} vendor name of vendor
     * @returns {Transaction[]}
     */

  }, {
    key: "getByVendor",
    value: function getByVendor(vendor) {
      var result = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.categories[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var ctg = _step4.value;
          result.push.apply(result, _toConsumableArray(ctg.getByVendor(vendor)));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return result;
      ;
    }
    /**
     * Returns total expenditure in every category.
     * @returns {Number}
     */

  }, {
    key: "getTotalExpenditure",
    value: function getTotalExpenditure() {
      return this.categories.reduce(function (acc, ctg) {
        return acc + ctg.getTotalExpenditure();
      }, 0);
    }
    /**
     * Returns the remaining amount left in the budget.
     * @returns {Number}
     */

  }, {
    key: "getRemainder",
    value: function getRemainder() {
      return this.categories.reduce(function (acc, ctg) {
        return acc + ctg.budgeted;
      }, 0) - this.getTotalExpenditure();
    }
    /**
     * 
     * @param {Element} target 
     */

  }, {
    key: "render",
    value: function render(target) {
      var remainder = target.querySelector('.remainder--amount');
      remainder.textContent = "$".concat(this.getRemainder());
      var ctgsNode = target.querySelector('.category__legend');
      var ctgs = this.getAllCategories();
      ctgs.forEach(function (ctg) {
        ctg.render(ctgsNode);
      });
      var trsNode = target.querySelector('.transactions');
      var transactions = this.getAllTransactions();
      console.log(transactions);
      transactions.forEach(function (tr) {
        tr.render(trsNode);
      });
    }
  }]);

  return Budget;
}();

exports.default = Budget;
},{"./Category":"js/classes/Category.js","./Transaction":"js/classes/Transaction.js"}],"js/main.js":[function(require,module,exports) {
'use strict';

require("./../css/main.scss");

var _Budget = _interopRequireDefault(require("./classes/Budget"));

var _Category = _interopRequireDefault(require("./classes/Category"));

var _Transaction = _interopRequireDefault(require("./classes/Transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function main() {
  var bgt = new _Budget.default();
  var ctgBtn = document.querySelector(".category__btn");
  var form = document.getElementById("add-ctg");

  form.submit = function () {
    var name = document.getElementById("ctg--name").value;
    var amount = document.getElementById("ctg--amount").value;
    bgt.add(name, amount);
    return false;
  };

  ctgBtn.addEventListener("click", function () {
    var wrapper = document.querySelector(".wrapper--form");
    wrapper.style.display = "flex";
  });
  bgt.add('Shopping', 150);
  bgt.add('Food', 600);
  bgt.addTransaction(new _Transaction.default(0, '14 dec', 'Lululemon', 250), 'Shopping');
  bgt.addTransaction(new _Transaction.default(1, '14 dec', 'Saveons', 25), 'Food');
  bgt.render(document.querySelector('#app'));
}

main();
},{"./../css/main.scss":"css/main.scss","./classes/Budget":"js/classes/Budget.js","./classes/Category":"js/classes/Category.js","./classes/Transaction":"js/classes/Transaction.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56132" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.map