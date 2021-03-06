/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb",
"diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];

let openedCards = [];

let moveCounter = 0;

let starRating = ["star", "star", "star"];

let matchedCounter = 0;

let  timerInterval;

let seconds = 0;
let minutes = 0;
let hours = 0;

const parentSection = document.getElementsByClassName("timer");


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//the next functions display the cards symbols
function getSymbol(index) {
    return "fa-" + cards[index]; // fa-diamond
}


function createCardsHTML() {
    var array = shuffle(cards);
    for (let i = 0; i < array.length; i++) {
        const listItem = document.createElement("li");
        listItem.classList.add("card");
        const icon = document.createElement("i");
        const symbol = getSymbol(i); // get the class of card at index i
        icon.classList.add("fa");
        icon.classList.add(symbol);
        listItem.appendChild(icon);
        const list = document.getElementsByClassName("deck");
        list[0].appendChild(listItem);
    }
}


//add cards to a list of open cards when open
function openCard(cardEl1) {

    //setTimeout (function() {
        cardEl1.classList.add("clicked");
        cardEl1.classList.add("open");
        cardEl1.classList.add("show");
    //}, 1000);

}


function collectOpenCard(cardEl2){
    openedCards.push(cardEl2);
}


//verify if cards match
function verifyMatch(card1, card2) {
    const i1 = card1.firstChild;
    const i2 = card2.firstChild;
    const class1 = i1.className;
    const class2 = i2.className;
    if (class1 === class2) {
        return true;
    }
    else {
        return false;
    }
}


function lockOpenCards(carda, cardb) {
    carda.classList.add("match");
    cardb.classList.add("match");
}


//hide cards symbols
function hideSymbols(firstCard, secondCard) {

    firstCard.classList.add("nomatch");
    secondCard.classList.add("nomatch");

    setTimeout(function(){
        firstCard.classList.remove("show");
        firstCard.classList.remove("open");
        secondCard.classList.remove("show");
        secondCard.classList.remove("open");
        firstCard.classList.remove("clicked");
        secondCard.classList.remove("clicked");
        firstCard.classList.remove("nomatch");
        secondCard.classList.remove("nomatch");
    }, 1000);
}


//lock cards in the open position when they match
//remove cards from open cards lists when they do not match
function matchCards() {
    if (openedCards.length === 2) {
        const areMatched = verifyMatch(openedCards[0], openedCards[1]);
        if (areMatched === true) {
            matchedCounter += 2;
            lockOpenCards(openedCards[0], openedCards[1]);
            openedCards = [];
        }
        else {
            hideSymbols(openedCards[0], openedCards[1]);
            openedCards = [];
        }

    }

 }


//increment move counter
function countMoves() {
    if (openedCards.length === 2) {
        const movesCounting = document.querySelector(".moves");
        moveCounter++;
        movesCounting.textContent = moveCounter;
    }

 }


//create stars and display them
function getStars(index) {
    return "fa-" + starRating[index];
 }


function displayStar(array2) {
    for (let i = 0; i < array2.length; i++) {
        const starList = document.createElement("li");
        const starIcon = document.createElement("i");
        const starSymbol = getStars(i);
        starIcon.classList.add("fa");
        starIcon.classList.add(starSymbol);
        starList.appendChild(starIcon);
        const getList = document.getElementsByClassName("stars");
        getList[0].appendChild(starList);
    }
 }


//change star rating based on number of moves
function changeStarRating() {
    const listParent = document.getElementsByClassName("stars")[0];
    if ((moveCounter === 12 || moveCounter === 24) && openedCards.length === 2) {
    const firstChild = listParent.firstElementChild;
        listParent.removeChild(firstChild);
    }

}


//event listener function
function listenForClick() {
    const cardElements = document.querySelectorAll(".card");
    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].addEventListener("click", function() {
            if(cardElements[i].classList.contains("open") === false){
                openCard(cardElements[i]);
                collectOpenCard(cardElements[i]);
                countMoves();
                changeStarRating();
                matchCards();
                endGameWhenAllMatch();
            }

            if(moveCounter == 0){
                refreshTime();
            }
        })
    }
}


//the following 4 functions set and display timer

function refreshTime() {
    if(timerInterval != null){
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(setTime, 1000);
}


function getTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    // 09:06:40
    return (hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds);
}


function setTime() {
    let theTime = getTime();
    const t = document.querySelector("time");
    t.textContent = theTime;
}


function timeGame() {
    const newEl = document.createElement("time");
    newEl.setAttribute("class", "timing");
    const time = "00:00:00"; // TODO: get actual value
    newEl.textContent = time;
    //const parentSection = document.getElementsByClassName("timer");
    parentSection[0].appendChild(newEl);
}


//create a end of game modal showing a recap of game
function popUp() {
    const getDiv = document.getElementsByClassName("result");
    const starParent = document.getElementsByClassName("stars")[0];
    const childrenNum = starParent.childElementCount;
    const divChild1 = document.createElement("p");
    const theTimeValue = document.getElementsByTagName("time")[0];
    const time = theTimeValue.textContent;
    divChild1.textContent = "With " + moveCounter + " moves " + "and " + childrenNum + " stars " + "in " + time;
    getDiv[0].appendChild(divChild1);
    const divChild2 = document.createElement("p");
    divChild2.textContent = "Woooohoooo!";
    getDiv[0].appendChild(divChild2);
    $('#congratsModal').modal('toggle');
    clickReplay();
}


//indicate the end of the game
function endGameWhenAllMatch() {
     if (matchedCounter === cards.length) {
        clearInterval(timerInterval);
        popUp();
    }
}


function reinitialize() {
    // reinitialize game board
    const cardsDeck = document.getElementsByClassName("deck")[0];
    cardsDeck.innerHTML = "";
    createCardsHTML();
    listenForClick();

    // reinitialize stars
    const theStars = document.getElementsByClassName("stars")[0];
    theStars.innerHTML = "";
    displayStar(starRating);

    // reinitialize moves
    moveCounter = 0;
    const moveSection = document.querySelector(".moves");
    moveSection.textContent = moveCounter;

    //reinitialize timer
    //clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours =0;
    const timeReset = document.querySelector("time");
    timeReset.textContent = "00:00:00";

    //reinitialize the list of opened cards
    openedCards = [];

    //reinitialize matched cards counter
    matchedCounter = 0;

    // reinitialize popup content
    const modalContent = document.getElementsByClassName("result")[0];
    modalContent.innerHTML = "";
    if(timerInterval != null){
        clearInterval(timerInterval);
    }
}


//replay button
function clickReplay() {
    const startOverBtn = document.getElementsByClassName("replay");
        startOverBtn[0].addEventListener("click", function() {
            $('#congratsModal').modal('hide');
            reinitialize();
        });
}


createCardsHTML()
displayStar(starRating);
listenForClick();
timeGame();






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
