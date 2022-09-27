'use strict';

// >>> Create GLOBAL variables <<<
let voteCount = 25;
let productsArr = [];

// >>> DOM Manipulation <<<
let imgDiv = document.getElementById('img-div'); // images container
let imgOne = document.getElementById('img1');
let imgTwo = document.getElementById('img2');
let imgThree = document.getElementById('img3');

let resultsBtn = document.getElementById('results-btn');
let ulContainer = document.getElementById('ulList'); // results container

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

  // increment the views property
  productsArr[imgOneIdx].views++;
  productsArr[imgTwoIdx].views++;
  productsArr[imgThreeIdx].views++;

  // assigning alt attribute the name property
  imgOne.alt = productsArr[imgOneIdx].name;
  imgTwo.alt = productsArr[imgTwoIdx].name;
  imgThree.alt = productsArr[imgThreeIdx].name;

}

// >>> Create EVENT Handlers <<<

// Events for image clicked
function handleClick(event) {
  let clickedImg = event.target.alt;

  // increments the clicks property of the image that was clicked
  for (let i = 0; i < productsArr.length; i++) {
    if (productsArr[i].name === clickedImg) {
      productsArr[i].clicks++;
    }
  }

  // decrements the number of votes
  voteCount--;

  // invoke the random images generator, to reload new images
  randImg();

  // once no more vote left, remove/end the click action
  if (voteCount === 0) {
    imgDiv.removeEventListener('click', handleClick);
  }
}

// Evenets for showing results
function handleResults() {
  if (voteCount === 0) {
    for (let i = 0; i < productsArr.length; i++) {
      let liElem = document.createElement('li');

      // 'banana had 3 votes, and was seen 5 times.'
      liElem.textContent = `${productsArr[i].name} had ${productsArr[i].clicks} votes, and was seen ${productsArr[i].views} times.`;
      ulContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleResults);
  }
}

// >>> Object Creation <<<
new Products('bag');
new Products('banana');
new Products('bathroom');
new Products('boots');
new Products('breakfast');
new Products('bubblegum');
new Products('chair');
new Products('cthulhu');
new Products('dog-duck');
new Products('dragon');
new Products('pen');
new Products('pet-sweep');
new Products('scissors');
new Products('shark');
new Products('sweep', 'png');
new Products('tauntaun');
new Products('unicorn');
new Products('water-can');
new Products('wine-glass');











// >>> Executable Code <<<
imgDiv.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleResults);
