/*
 * Create a list that holds all of your cards
 */

// fallowing are the some of the variables to start the project
var startTimer = false;
var moves = 0,
  matchCount = 0,
  min = 0,
  sec = 0;

// cardsArray is an variable to store all the elements which has class name card
var cardsArray = [...document.getElementsByClassName('card')];

// allClassNames variable is used to store all the class names whichis used to shuffle the cards
var allClassNames = [];
cardsArray.forEach((item, index) => {
  allClassNames[index] = item.children[0].className;
})

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
// shuffle function os used to shuffle the cards
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  for (var i = 0; i < array.length; i++) {
    cardsArray[i].children[0].className = array[i];
  }
  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Adding click event to all the cards
cardsArray.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.add('open', 'show', 'disable');
    openCheck(card)
  })
})

// in clickedElemArray we are going to store the clicked elements
var clickedElemArray = [];

// openCheck function is used to check the 2 opened cards matching are not if not matched turn arround,
// after checking one match the second match is going to start  after 500MS
function openCheck(card) {
  if (!startTimer) {
    startTimer = true;
    setInterval(timer, 1000);
  }
  setTimeout(() => {
    clickedElemArray.push(card);
    if (clickedElemArray.length == 2) {
      if (clickedElemArray[0].children[0].className === clickedElemArray[1].children[0].className) {
        clickedElemArray.map(i => {
          i.classList.add('match');
          i.classList.remove('open', 'show')
        })
        gameCompletion();
      } else {
        clickedElemArray.map(i => {
          i.classList.remove('open', 'show', 'match', 'disable')
        })
      }
      clickedElemArray = [];
      moveCount();
    }
  }, 500)

}


var ratingElem = document.getElementById('rating');
var startElem;

// gameCompletion is a function which is used to wether the game is completed
// are not when matchCountis equels to 8 then game is going to compleate
function gameCompletion() {
  matchCount += 1;
  if (matchCount == 8) {
    let resultDiv = document.getElementsByClassName('hideResult');
    resultDiv[0].classList.add('showResult');
    let winningStars = [...document.getElementsByClassName('fa-star')];
    for (i in winningStars) {
      ratingElem.appendChild(winningStars[i])

    }

  }

}
// movesElem is an variable to store all the elements which has class name moves
// movesElem is an variable to store all the elements which has class name moves
var movesElem = document.getElementsByClassName('moves');
// totalMovesElem is an variable to store all the elements which has class name totalMoves
var totalMovesElem = document.getElementsByClassName('totalMoves');

// moveCount is used to count the number of moves an accordingly it calls the decRating function to remove the rating
// and if the moves count is 16 and 21 then the star rating is decresing
function moveCount() {
  moves += 1;
  movesElem[0].textContent = moves;
  totalMovesElem[0].textContent = moves;
  if (moves == 16 || moves == 21) {
    decRating();
  }
}

// decRating is used to remove the star rating
function decRating() {
  let winningStars = [...document.getElementsByClassName('fa-star')];
  winningStars[winningStars.length - 1].classList.add('fa-star-o');
  winningStars[winningStars.length - 1].classList.remove('fa-star')
}

// the fallowing function is used to restart the game
function restart() {
  location.reload();
}

var minElem = document.getElementById("min");
var secElem = document.getElementById("sec");
var totalMinElem = document.getElementById("totalMin");
var totalSecElem = document.getElementById("totalSec");

// timer function is used to update the timer
function timer() {
  if (matchCount !== 8) {
    if (sec == 59) {
      min += 1;
      minElem.textContent = min;
      sec = 0
    }
    sec += 1;
    secElem.textContent = sec;
  }
  totalMinElem.textContent = min;
  totalSecElem.textContent = sec;
}
// when the game is loaded the startGamefunction is going to call accordingly ift calleds the shuffle function
function startGame() {
  shuffle(allClassNames);
}
