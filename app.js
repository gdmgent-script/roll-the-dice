//Get elements
const allDices = document.getElementsByClassName('dice');
const btnRoll = document.getElementById('btn-roll');
const spanCounter = document.getElementById('counter');
const spanCounterGames = document.getElementById('counter-games');
const divAlert = document.getElementById('alert');

let maxCounts = 6;
let counter = 0;
let counterGames = 0;

/** 
 * Lock a dice
 * 
 */
const lockDice = (dice) => {
    dice.classList.toggle('locked');
};

/** 
 * Generate random image of a dic 1 - 6
 * 
 * @return {string} dice-image path
 */
const generateRandomDice = () => {
    return `images/dice-${Math.ceil(Math.random() * 6)}.png`;
}

/** 
 * Create alert - message 
 * 
 * @param {boolean} isSucces 
 * @param {string} message 
 */
const setAlert = (isSucces, message) => {
    divAlert.innerText = message;
    divAlert.classList  = isSucces ? 'alert alert-success' : 'alert alert-danger';
}

/** 
 * Checks if dice is locked
 * 
 * @param {object} dice 
 * @return {boolean} 
 */
const checkIfNotLocked = (dice) => {
    return dice.classList.contains('locked') ? false : true;
}

/** 
 * Checks if all the dices are the same
 * 
 * @return {boolean} 
 */
const allDicesTheSame = () => {
    let srcOne;
    let srcTwo;
    let isTheSame = false;
    for (dice of allDices) {
        srcOne ? srcTwo = dice.src : srcOne = dice.src;
        if (srcTwo) {
            isTheSame = (srcOne === srcTwo) ? true : false;
            if (!isTheSame) break;
        }
    }
    return isTheSame;
}


/** 
 * Roll the dices that are not locked
 * 
 */
const roll = () => {
    if (allDicesTheSame()) {
        startGame();
    } else if (counter < maxCounts) {
        counter++
        spanCounter.innerText = maxCounts - counter;
        for (dice of allDices) {
            if (checkIfNotLocked(dice)) {
                dice.src = generateRandomDice();
            }
        }
        //After random changing unlocked dices, check if all are the same
        if (allDicesTheSame()) {
            setAlert(true, 'Yay, You won. Click Restart to start a new game!');
            btnRoll.innerText = 'Restart';
            counterGames = 0;
            spanCounterGames.innerText = counterGames;
        } else {
            divAlert.classList.add('hide');
        }
        if ((counter == maxCounts) && allDicesTheSame() === false) {
            setAlert(false, 'Oh No, game Over. Click Restart to start a new ame');
            btnRoll.innerText = 'Restart';
            counterGames++;
            spanCounterGames.innerText = counterGames;
        }
    } else {
        startGame();
    }

}

/** 
 * Start or Restart game
 * 
 */
const startGame = () => {
    btnRoll.innerHTML = '<i class="fas fa-dice"></i> Roll';
    counter = 0;
    spanCounter.innerText = maxCounts - counter;
    divAlert.classList.add('hide')
    for (dice of allDices) {
        dice.src = generateRandomDice();
        if (dice.classList.contains('locked')) dice.classList.remove('locked');
    }
}

//Events
for (dice of allDices) {
    dice.addEventListener('click', function (e) {
        lockDice(e.target)
    });
}
btnRoll.addEventListener('click', roll);

//Start the game on pageload
startGame();