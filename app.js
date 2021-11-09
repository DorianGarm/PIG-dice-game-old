var scores, roundScore, activePlayer, gamePlaying;

init();

// ROLL button functionality

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Random number generation between 1 and 6.
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result.
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    // 3. If not a 1 then add the number to the round score.
  }
  if (dice1 !== 1 && dice2 !== 1) {
    // Add
    roundScore += dice1 + dice2;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    // Change player
    //alert("Oh no! You rolled a 1!");
    nextPlayer();
  }
});

// HOLD button functionality

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add currentscore to globalscore
    scores[activePlayer] += roundScore;

    // Update the UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if the current player has just won the game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById("name-" + activePlayer).textContent = "winner!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Change player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //document.getElementById("dice-1").style.display = "none";
  //document.getElementById("dice-2").style.display = "none";
}

// NEW button functionality

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  alert(
    "The game has 2 players, playing in rounds. In each turn, a player rolls the dice as many times as they wish. \n \nEach dice roll gets added to the CURRENT score but, if the player rolls a 1, all of it gets lost. After that, it's the next player's turn. \n \nThe player can choose to HOLD, which means that their CURRENT score gets added to their TOTAL score. After that, it's the next player's turn. \n \n The first player to reach 100 points on TOTAL score wins the game. You can edit that number in the WINNING SOCRE box."
  );
}
