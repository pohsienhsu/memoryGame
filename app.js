const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);
 
function createDivsForColors(colorArray) {
    if (localStorage.bestScore === undefined){
        localStorage.bestScore = 20;
    } 
    let retrieveBest = parseInt(localStorage.bestScore);
  bestScore.textContent =  `Best Score: ${retrieveBest}`
    yourScore.textContent = `Your Score: ${tries}`;
  restartBtn.style.display = 'none';  
  for (let color of colorArray) {
    const newDiv = document.createElement("div");

    newDiv.classList.add(color);
    newDiv.classList.add('incomplete');

    newDiv.addEventListener("click", handleCardClick);
    newDiv.addEventListener('mouseover', function(e){
        if(e.target.classList.contains('incomplete')){
            e.target.style.background = 'rgb(119, 3, 252)'
        }
    })
    newDiv.addEventListener('mouseleave', function(e){
        if (e.target.classList.contains('incomplete')){
            e.target.style.backgroundColor = 'rgb(152, 3, 252)'
        }
    })
    gameContainer.append(newDiv);
  }
}
const restartBtn = document.querySelector('#restart a');
const startBtn = document.querySelector('#start a');
let yourScore = document.querySelector('#score #yourScore');
let bestScore = document.querySelector('#score #bestScore')

//start button
startBtn.addEventListener('click', function(e){
    const game = document.querySelector('#game');
    restartBtn.style.display = 'none';
    e.target.parentElement.style.display = 'none';
    game.style.display = 'inline';
    yourScore.style.display = 'inline';
    bestScore.style.display = 'inline';
    yourScore.textContent = `Your Score: ${tries}`;
})

//restart button
restartBtn.addEventListener('click', function(e) {
    if (tries < parseInt(localStorage.bestScore)) {
        localStorage.bestScore = tries;
    }
    total = 0;
    tries = 0;
    const cards = document.querySelectorAll('#game div');
    for (let card of cards) {
        card.remove();
    }
    shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
    
})

let tries = 0;
let total = 0;
let count = 0;
let pickColor = "";

function reset(){
    count = 0;
    pickColor = "";
}

function handleCardClick(event) {
  const target = event.target;
  if (total != 5) {
    if (!target.classList.contains('completed')){
        if (count < 1) {
            count ++;
            target.classList.remove('incomplete');
            pickColor = target.className;
            target.style.backgroundColor = target.className;
            target.classList.add('selected');
            yourScore.textContent = `Your Score: ${tries}`;
        }
        else if (count === 1) {
            count ++;  
            target.classList.remove('incomplete');   
            if (pickColor === target.className) {
              target.style.backgroundColor = target.className;
              target.classList.add('selected');
              let cards = document.querySelectorAll('#game div')
              for (let card of cards) {
                  if (card.classList.contains('selected')) {
                      card.classList.remove('selected');
                      card.classList.add('completed');
                  }
              }
            total ++;
            tries ++;
            yourScore.textContent = `Your Score: ${tries}`;
            reset();
            }
            else {
              target.style.background = target.className;
              target.classList.add('selected');
              let cards = document.querySelectorAll('#game div');  
              const delay = setTimeout(function(){
                for (let card of cards) {
                    if (card.classList.contains('selected')) {
                      card.style.backgroundColor = 'rgb(152, 3, 252)';  
                      card.classList.add('incomplete');
                      card.classList.remove('selected');
                    }
                    reset();
                }
              }, 1000)
              tries ++;
              yourScore.textContent = `Your Score: ${tries}`;      
            }
        }
      }
      if (total == 5){
        restartBtn.style.display = 'inline';
      }
    }  
}

// when the DOM loads
createDivsForColors(shuffledColors);
yourScore.textContent = 'MEMORY GAME!';

