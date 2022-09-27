'use strict';

// >>> Create GLOBAL variables <<<
let voteCount = 25;
let productsArr = [];

// >>> DOM Manipulation <<<
let imgDiv = document.getElementById('img-div');
let imgOne = document.getElementById('img1');
let imgTwo = document.getElementById('img2');
let imgThree = document.getElementById('img3');

let resultsBtn = document.getElementById('results-btn');
let ulContainer = document.getElementById('ulList'); // resultsContainer

// >>> Create Constructors <<<
function Products(name, fileExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productsArr.push(this);
}
