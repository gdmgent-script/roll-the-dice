//Get elements
const allDices = document.getElementsByClassName('dice');
const btnRoll = document.getElementById('btn-roll');
const spanCounter = document.getElementById('counter');
const divAlert = document.getElementById('alert');

let maxCounts = 6;
let counter = 0;

//Lock a dice
const lockDice = (dice) => {
    dice.classList.toggle('locked');
};

//Generate random image of dice
const generateRandomDice = () => {
    return `images/dice-${Math.ceil(Math.random() * 6)}.png`;
}

const setAlert = (isSucces, message) => {
    divAlert.innerText = message;
    isSucces ? divAlert.classList = 'alert alert-success' : divAlert.classList = 'alert alert-danger';

}

//Returns true false, check if dice is not locked
const checkIfNotLocked = (dice) => {
    return dice.classList.contains('locked') ? false : true;
}

//Returns true or false if all dices are the same
const allDicesTheSame = () => {
    let srcOne;
    let srcTwo;
    let isTheSame = false;
    for (dice of allDices) {
        srcOne ? srcTwo = dice.src : srcOne = dice.src;
        if (srcTwo) {
            if (srcOne === srcTwo) {
                isTheSame = true
            } else {
                //If one is not equel stop the check en set isTheSame to false
                isTheSame = false;
                break
            }
        }
    }
    return isTheSame;
}

//Roll the dices who are not locked
const roll = () => {
    if (allDicesTheSame()) {
        startGame();
    } else if (counter < maxCounts) {
        counter++
        spanCounter.innerText = counter;
        for (dice of allDices) {
            if (checkIfNotLocked(dice)) {
                dice.src = generateRandomDice();
            }
        }
        //After random changing unlocked dices, check if all are the same
        if (allDicesTheSame()) {
            setAlert(true, 'Yay, You won. Click Restart to start a new game!');
            btnRoll.innerText = 'Restart';
        } else {
            divAlert.classList.add('hide');
        }
        if ((counter == maxCounts) && allDicesTheSame() === false) {
            setAlert(false, 'Oh No, game Over. Click Restart to start a new ame');
            btnRoll.innerText = 'Restart';
        }

    } else {
        //Reset counter
        counter = 0;
        spanCounter.innerText = counter;
        startGame();
    }

}

//start/restart the game
const startGame = () => {
    btnRoll.innerText = 'Roll';
    counter = 0;
    spanCounter.innerText = counter;
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