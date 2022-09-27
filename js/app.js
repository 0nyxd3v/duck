'use strict';

// >>> Create GLOBAL variables <<<
let voteCount = 5;
let productsArr = [];

// >>> DOM Manipulation <<<
let imgDiv = document.getElementById('img-div'); // images container
let imgOne = document.getElementById('img1');
let imgTwo = document.getElementById('img2');
let imgThree = document.getElementById('img3');

// let resultsBtn = document.getElementById('results-btn');

// >>> canvas element for the chart to render to
let canvasElement = document.getElementById('my-chart').getContext('2d');

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

  // >>> while condition to make sure 3 images are unique <<<
  // work with TA Ben
  const indexArr = [];
  while(indexArr.length < 3) {
    let imgTwoIdx = randIdx();
    if (!indexArr.includes(imgTwoIdx)) {
      indexArr.push(imgTwoIdx);
      // console.log(imgTwoIdx);
    }
  }


  // .img >>> contains the filename of images, ex. bag.jpg
  imgOne.src = productsArr[indexArr[0]].img;
  imgTwo.src = productsArr[indexArr[1]].img;
  imgThree.src = productsArr[indexArr[2]].img;

  // increment the views property
  productsArr[indexArr[0]].views++;
  productsArr[indexArr[1]].views++;
  productsArr[indexArr[2]].views++;

  // assigning alt attribute the name property
  imgOne.alt = productsArr[indexArr[0]].name;
  imgTwo.alt = productsArr[indexArr[1]].name;
  imgThree.alt = productsArr[indexArr[2]].name;

}

// >>> create chart function <<<

function renderChart() {

  const productNames = [];
  const productVotes = [];
  const productViews = [];

  for (let i = 0; i < productsArr.length; i++) {
    productNames.push(productsArr[i].name);
    productVotes.push(productsArr[i].clicks);
    productViews.push(productsArr[i].views);
  }

  let myChartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        data: productVotes,
        label: '# of Votes',
        backgroundColor: [
          '#D7B1A9',
        ],
        borderColor: [
          '#D7B1A9'

        ],
        borderWidth: 10
      },
      {
        data: productViews,
        label: '# of Views',
        backgroundColor: [
          '#9DAAE8'

        ],
        borderColor: [
          '#9DAAE8'
        ],
        borderWidth: 10
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // calling Chart constructor, passing in the canvas element and the data Object
  new Chart(canvasElement, myChartObj);

}

// >>> Create EVENT Handlers <<<

// Events for image clicked
function handleClick(event) {
  console.dir(event.target);
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
    renderChart();
  }
}

// Events for showing results
// function handleResults() {
//   if (voteCount === 0) {
//     resultsBtn.removeEventListener('click', handleResults);
//   }
// }

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
randImg();
imgDiv.addEventListener('click', handleClick);
// resultsBtn.addEventListener('click', handleResults);
