"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var fs = require("fs");
var addProduct = function (product) {
    var strProducts = fs.readFileSync('./data.json', 'utf8');
    var products = JSON.parse(strProducts);
    var found = products.find(function (prod) { return prod.id === product.id; });
    if (found) {
        console.log("===============================");
        console.log('Product ID already exists');
        console.log("===============================");
        return;
    }
    products.push(product);
    fs.writeFile('./data.json', JSON.stringify(products), function (err) {
        if (err) {
            console.log("===============================");
            console.log("Something went wrong");
            console.log("===============================");
            return;
        }
        console.log("===============================");
        console.log("Submitted Product");
        console.log(product);
        console.log("===============================");
    });
};
var getAllProducts = function () {
    fs.readFile('./data.json', 'utf8', function (err, res) {
        if (err) {
            console.log("===============================");
            console.log('Get All Products Something Went Wrong');
            console.log("===============================");
        }
        var arrRes = __spreadArray([], JSON.parse(res), true).sort(function (a, b) {
            if (a.created_date > b.created_date) {
                return -1;
            }
            if (a.created_date < b.created_date) {
                return 1;
            }
            return 0;
        });
        console.log("===============================");
        arrRes.forEach(function (data) {
            console.log({
                "NAME: ": data.name,
                "QUANTITY: ": data.quantity,
                "UNIT PRICE: ": data.unit_price
            });
        });
        console.log("===============================");
    });
};
// addProduct({
//   id:'1',
//   name: 'product x',
//   unit_price: 1,
//   quantity: 0,
//   created_date: new Date()
// })
// addProduct({
//   id:'11',
//   name: 'product x',
//   unit_price: 1,
//   quantity: 0,
//   created_date: new Date()
// })
getAllProducts();
