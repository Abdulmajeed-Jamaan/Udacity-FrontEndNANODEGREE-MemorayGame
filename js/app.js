// ***************************************************************************************
// *************************            VARIABLES               **************************
// ***************************************************************************************

const winContainer = document.querySelector('.win__container');
const winTime = document.querySelector('.win__time');
const winMoves = document.querySelector('.win__moves');
const winStars = document.querySelector('.win__stars');
const playAgain = document.querySelector('.win__again');
const movesElement = document.querySelector('.moves');
const starsElement = document.querySelector('.stars');
const restart = document.querySelector('.restart');
const loading = document.querySelector('.loading');
const container = document.querySelector('.deck');
const startButton = document.querySelector('.start__button');
const startContainer = document.querySelector('.start');
const timerElement = document.querySelector('.timer');
const deck = document.querySelector('.deck');
const defaultStars = `                
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;


let cards = document.getElementsByClassName('card');
let firstCard = null;
let secondCard = null;
let moves = 0;
let winScore = 0;
let timer = null;





// ***************************************************************************************
// *************************            LISTENERS               **************************
// ***************************************************************************************
container.addEventListener('click', showCard);
playAgain.addEventListener('click', () => {
    winContainer.style.display = 'none';
});
startButton.addEventListener('click', startTheGame);







// ***************************************************************************************
// **********************            MAIN METHODS               **************************
// ***************************************************************************************

function showCard(event) {

    // ____________________ if anything clicked rather then cards return _________________
    if (event.target.nodeName !== 'LI' && event.target.nodeName !== 'I') {
        return;
    }

    // _________________________ check if elemnt clicked is LI ___________________________
    if (event.target.nodeName === 'LI') {

        // ____________________ check if elemnt click is chosen before ___________________
        if (event.target.classList.value.includes('match')) {
            return;
        }

        // ____________________ check if first card value not asigned ____________________
        if (!firstCard) {

            firstCard = event.target.firstElementChild;
        } else {

            // ________ check if the clicked element is the same as first element ________
            if (firstCard == event.target.firstElementChild) {
                return;
            }
            secondCard = event.target.firstElementChild
        }
    }
    // ___________________________ check if elemnt clicked is I __________________________
    if (event.target.nodeName === 'I') {

        // ___________________ check if elemnt click is chosen before ____________________
        if (event.target.parentNode.classList.value.includes('match')) {
            return;
        }

        // ____________________ check if first card value not asigned  ___________________
        if (!firstCard) {
            firstCard = event.target;
        } else {
            // _______ check if the clicked element is the same as first element _________
            if (firstCard == event.target) {
                return;
            }
            secondCard = event.target
        }
    }

    // _____________ check if second card chosen the call methode checkMatch _____________
    if (secondCard) {
        secondCard.parentNode.classList.add('open', 'show');

        container.removeEventListener('click', showCard);
        checkMatch();
    } else {
        firstCard.parentNode.classList.add('open', 'show');
    }

}


// __________________________ check the match of the chosen cards _________________________
function checkMatch() {

    console.log(firstCard.classList[1].split("-")[1] == secondCard.classList[1].split("-")[1]);
    if (firstCard.classList[1].split("-")[1] == secondCard.classList[1].split("-")[1]) {
        setTimeout(match, 300);
    } else {
        setTimeout(notMatch, 300);
    }

    addMove();

}

// _____________________________________ start the game ____________________________________
function startTheGame() {
    startContainer.style.display = 'none';
    restart.addEventListener('click', reset);

    startTimer();
}


// _____________________________________ reset the game _____________________________________
function reset() {
    restart.removeEventListener('click', reset);
    loading.style.display = 'flex';
    firstCard = null;
    secondCard = null;
    moves = 0;
    winScore = 0;
    movesElement.textContent = 0;
    starsElement.innerHTML = defaultStars;
    clearInterval(timer);
    timerElement.textContent = '00:00';

    setTimeout(() => {
        let fragment = '';
        let newCards = shuffle([...cards]);
        for (const card of newCards) {
            card.classList.remove('open', 'show', 'match');
            fragment += card.outerHTML;
        }
        deck.innerHTML = fragment;
    }, 500);
}



// *****************************************************************************************
// ***********************            HELPER METHODS             ***************************
// *****************************************************************************************


// _______________ Shuffle function from http://stackoverflow.com/a/2450976 ________________
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

    loading.style.display = 'none';
    startContainer.style.display = 'flex';

    return array;
}

// _____________________________________ if the use win ___________________________________
function win() {
    winTime.textContent = 'time' + timerElement.textContent;
    winMoves.textContent = 'Moves' + moves;
    winStars.innerHTML = starsElement.innerHTML;
}

// _________________________________ if the cards matched _________________________________
function match() {
    firstCard.parentNode.classList.add('match');
    secondCard.parentNode.classList.add('match');
    winScore++;
    firstCard = null;
    secondCard = null;
    container.addEventListener('click', showCard);

    if (winScore == 8) {
        win();
        reset();
        winContainer.style.display = 'flex';
    }
}

// _______________________________ if the cards not matched _______________________________
function notMatch() {
    firstCard.parentNode.classList.add('diff');
    secondCard.parentNode.classList.add('diff');
    setTimeout(() => {
        firstCard.parentNode.classList.remove('open', 'show', 'diff');
        secondCard.parentNode.classList.remove('open', 'show', 'diff');
        firstCard = null;
        secondCard = null;
        container.addEventListener('click', showCard);
    }, 750);
}

// _______________________________ increase the counter by 1 _______________________________
function addMove() {
    moves++;
    movesElement.textContent = moves;

    if (moves == 17) {
        starsElement.firstElementChild.remove();
    }
    if (moves == 25) {
        starsElement.firstElementChild.remove();
    }

}

// _____________________________________ start the time _____________________________________
function startTimer() {
    var time = 0,
        minutes, seconds;
    timer = setInterval(function () {
        minutes = parseInt(time / 60, 10);
        seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        time++;
        timerElement.textContent = minutes + ":" + seconds;

    }, 1000);
}