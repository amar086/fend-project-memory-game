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



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function getSymbol(index) {
    return "fa-" + cards[index]; // fa-diamond
}
function createCardsHTML(array) {
    array = shuffle(array);
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
function openCard(cardEl1) {
    cardEl1.classList.add("open");
    cardEl1.classList.add("show");

}


function collectOpenCard(cardEl2){
    openedCards.push(cardEl2);
}

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

function hideSymbols(firstCard, secondCard) {
    firstCard.classList.remove("show");
    firstCard.classList.remove("open");
    secondCard.classList.remove("show");
    secondCard.classList.remove("open");

}

function matchCards() {
    if (openedCards.length === 2) {
        const areMatched = verifyMatch(openedCards[0], openedCards[1]);
        if (areMatched === true) {
            lockOpenCards(openedCards[0], openedCards[1]);
            openedCards = [];
        }
        else {
            hideSymbols(openedCards[0], openedCards[1]);
            openedCards = [];
        }

    }

 }



function countMoves() {
    if (openedCards.length === 2) {
        const movesCounting = document.querySelector(".moves");
        moveCounter++;
        movesCounting.textContent = moveCounter;
    }

 }

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


createCardsHTML(cards);
displayStar(starRating);


const cardElements = document.querySelectorAll(".card");
for (let i = 0; i < cardElements.length; i++) {
    cardElements[i].addEventListener("click", function() {
        openCard(cardElements[i]);
        collectOpenCard(cardElements[i]);
        countMoves();
        matchCards();
    })
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
