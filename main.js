// variable initialization
let uncoveredCards = 0;
let card1 = null;
let card2 = null;
let firstAnswer = null;
let secondAnswer = null;
let movements = 0;
let scores = 0;
let timers = false;
let timer = 40;
let initialTimer = timer;
let regressiveTimeId = null;

let winAudio = new Audio ('./audio/win.wav');
let loseAudio = new Audio ('./audio/lose.wav');
let rightAudio = new Audio ('./audio/right.wav');
let clickAudio = new Audio ('./audio/click.wav');
let wrongAudio = new Audio ('./audio/wrong.wav'); 

// document HTML
let showMovements = document.getElementById("movements");
let showScores = document.getElementById("scores");
let showTime = document.getElementById ("t-left");

// randon numbers generator
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});
console.log(numbers);

// functions
function countDownTime(){
  regressiveTimeId = setInterval(()=>{
    timer--;
    showTime.innerHTML = `Time: ${timer} secs`;
    if(timer == 0){
      clearInterval(regressiveTimeId);
      cardLock();
      loseAudio.play();
    }
  },1000);
}

function cardLock(){
  for (let i = 0; i <=15; i++){
    let cardLocked = document.getElementById(i);
    cardLocked.innerHTML = `<img src="./img/${numbers[i]}.png" alt="">`;
    cardLocked.disabled = true;
  }
} 

// main function
function uncover(id) {
  if(timers == false){
    countDownTime();
    timers = true;
  }

  uncoveredCards++;
  console.log(uncoveredCards);

  if (uncoveredCards == 1) {
    // show first number
    card1 = document.getElementById(id);
    firstAnswer = numbers[id];
    card1.innerHTML = `<img src="./img/${firstAnswer}.png" alt="">`;
    clickAudio.play();

    // disable first button
    card1.disabled = true;
  } else if (uncoveredCards == 2) {
    // show second number
    card2 = document.getElementById(id);
    secondAnswer = numbers[id];
    card2.innerHTML = `<img src="./img/${secondAnswer}.png" alt="">`;
    //disable second button
    card2.disabled = true;

    // increase movements
    movements++;
    showMovements.innerHTML = `Movements: ${movements}`;

    if (firstAnswer == secondAnswer) {
      // Counting down uncovered cards
      uncoveredCards = 0;

      //increase scores
      scores++;
      showScores.innerHTML = `Scores: ${scores}`;
      rightAudio.play();

      if(scores == 8){
        clearInterval(regressiveTimeId);
        showScores.innerHTML = `Scores: ${scores} 🔥`;
        showTime.innerHTML = `You're on Fire!🎉 It took you ${initialTimer - timer} secs`;
        showMovements.innerHTML = `Movements: ${movements} 🔥🔥🔥`;
      }

    } else {
      wrongAudio.play();
      //show and uncovered movements
      setTimeout(() => {
        card1.innerHTML = "";
        card2.innerHTML = "";
        card1.disabled = false;
        card2.disabled = false;
        uncoveredCards = 0;
      },500);
    }
  }
}
