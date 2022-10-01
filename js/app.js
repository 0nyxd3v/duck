'use strict';

// >>> Create GLOBAL variables <<<
let voteCount = 25;
let productsArr = [];
let myChart;


// >>> DOM Manipulation <<<
let imgDiv = document.getElementById('img-div'); // images container
let imgOne = document.getElementById('img1');
let imgTwo = document.getElementById('img2');
let imgThree = document.getElementById('img3');

// grabbing vote button
let voteBtn = document.getElementById('vote-btn');

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
// MDN web docs
function randIdx() {
  return Math.floor(Math.random() * productsArr.length);
}

let indexArr = [];

// function that generates random images
function randImg() {

  // >>> while condition to make sure 3 images are unique <<<
  while (indexArr.length < 6) {
    let imgTwoIdx = randIdx();
    if (!indexArr.includes(imgTwoIdx)) {
      indexArr.push(imgTwoIdx);
      console.log(imgTwoIdx);
    }
  }

  let imgOneIdx = indexArr.shift();
  let imgTwoIdx = indexArr.shift();
  let imgThreeIdx = indexArr.shift();


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
  myChart = new Chart(canvasElement, myChartObj);
}



// >>> Create EVENT Handlers <<<

function handleVoteAgain() {

  // reassigning vote back to this number
  voteCount = 25;
  // generates another 3 images
  randImg();
  // listen to the image clicks
  imgDiv.addEventListener('click', handleClick);
  // removes listener once voteCount reaches 0
  if (voteCount === 0) {
    imgDiv.removeEventListener('click', handleClick);
  }
  /* worked with TA Joel, removing the initial display of chart,
   removes the initial chart data*/
  myChart.destroy();
  renderChart();
}


// Events for image clicked
function handleClick(event) {
  console.dir(event.target);
  let clickedImg = event.target.alt;
  // for loop to iterate through the array, and increment clicks on the image clicked
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

    // >>> Local Storage <<<

    // Step 1: stringify our data
    let stringifiedProducts = JSON.stringify(productsArr);

    // Step 2: add our data to local storge
    localStorage.setItem('myProduct', stringifiedProducts);
  }
}



// >>>>>> Local Storage <<<<<<<

// Step 3: Pull data out of local storage
let retrieveProducts = localStorage.getItem('myProduct');

// Step 4: Parse our data into code
let parsedProducts = JSON.parse(retrieveProducts);


// >>> Executable Code <<<

// >>> Object Creation <<<

// check if item is in our local storage
if (retrieveProducts) {
  productsArr = parsedProducts;
} else {
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
}

randImg();
imgDiv.addEventListener('click', handleClick);
voteBtn.addEventListener('click', handleVoteAgain);

console.log(productsArr[0].clicks);
