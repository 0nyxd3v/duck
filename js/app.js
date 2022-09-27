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

// >>> Create HELPER functions <<<

// function that generates random index of productsArr
function randIdx() {
  return Math.floor(Math.random() * productsArr.length);
}

// function that generates random images
function randImg() {
  let imgOneIdx = randIdx();
  let imgTwoIdx = randIdx();
  let imgThreeIdx = randIdx();

  // .img >>> contains the filename of images, ex. bag.jpg
  imgOne.src = productsArr[imgOneIdx].img;
  imgTwo.src = productsArr[imgTwoIdx].img;
  imgThree.src = productsArr[imgThreeIdx].img;
}

// >>> Create EVENT Handlers <<<
function handleClick(event) {
  
}
