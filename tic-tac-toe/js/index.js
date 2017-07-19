let player;
let symb;
let gameArr = ["", "", "", "", "", "", "", "", ""];
let clickCount = 0;
let Xwin = 0;
let Owin = 0;
let winnerTally;
let comptoken;
let compcall;
let currentPlayer;

function players(x) {
  player = x;
 document.getElementById("selectToken").style.display = "block";

}
function token(sym) {
  symb = sym;
   document.getElementById("startGameButton").style.display = "block";
}

function start() {

  document.getElementById("top-div").style.display = "none";
  document.getElementById("controlBox").style.display = "block";
  document.getElementById("tic-tac-toe-box").style.display = "block";
  if (player === 1) {
    let starts = Math.floor(Math.random() * 2) + 1;
    playSolo(starts);
  }else if (player === 2){
        document.getElementById("Winner").innerHTML = `${symb}'s  turn`;
  }

}

function gameView(arr) {
  for (let i = 0; i < arr.length; i++) {
    let num = i;
    if (arr[i] !== "") {
      document.getElementById(
        `btn${num}`
      ).innerHTML = `<h2 style="font-size: 40px; text-align: center;">${arr[
        i
      ]}</h2>`;

      document.getElementById(`btn${num}`).disabled = true;
    }
  }
}
function theWinner(winner) {
  console.log(comptoken + " comptoken");
  console.log("winner " + winner);
  if (winner === comptoken) {
    document.getElementById("Winner").innerHTML = "Computer Wins";
    winnerTally = winner === "X" ? (Xwin = Xwin + 1) : (Owin = Owin + 1);
    document.getElementById(`${winner}score`).innerHTML = `${winnerTally}`;
    setTimeout(function() {
      reset(gameArr);
      document.getElementById("Winner").innerHTML = "You Start " + symb;
    }, 1000);
  }

  if (winner && winner !== comptoken) {
    document.getElementById("Winner").innerHTML = `${winner} wins!`;
    winnerTally = winner === "X" ? (Xwin = Xwin + 1) : (Owin = Owin + 1);
    document.getElementById(`${winner}score`).innerHTML = `${winnerTally}`;
    clearTimeout(compcall);
    setTimeout(function() {
      reset(gameArr);
    }, 1000);
  }
  if (clickCount === 9 && !checkWinner(gameArr) && player === 2) {
    document.getElementById("Winner").innerHTML = "Cat's game";
    clearTimeout(compcall);
    setTimeout(function() {
      reset(gameArr);
    }, 1000);
  }
   if (clickCount === 9 && !checkWinner(gameArr) && player === 1) {
    document.getElementById("Winner").innerHTML = "Cat's game";
    clearTimeout(compcall);
    setTimeout(function() {
      reset(gameArr);
    }, 1000);
  }
}

function toggleToken(symb){
  if( symb === "X"){
      document.getElementById("Winner").innerHTML = "O's turn";
  }else{
          document.getElementById("Winner").innerHTML = "X's turn";
  }
}


function clicked(num) {

  if (player === 2) {
    toggleToken(symb)
    clickCount++;
    let currentToken = newToken(symb);
    gameArr.splice(num, 1, currentToken);
    gameView(gameArr);
    let winner = checkWinner(gameArr);
    theWinner(winner);
  } else if (player === 1) {

    clickCount++;
    let currentToken = newToken(symb);
    gameArr.splice(num, 1, currentToken);
    gameView(gameArr);
    let winner = checkWinner(gameArr);
    let win = theWinner(winner);
    newToken(symb);
    if (!win) {
      compcall = setTimeout(function() {
        computer();
      }, 1000);
    } else {
      clearTimeout(compcall);
    }
  }
}

function playSolo(starts) {
  let yourToken = symb;
  let computerToken = symb === "X" ? "O" : "X";
  let randomnumber = Math.floor(Math.random() * 9);
  if (starts === 2) {
    document.getElementById("Winner").innerHTML = "Computer";
    computer();
  } else {
    document.getElementById("Winner").innerHTML = "You Start " + symb;
  }
}

function computer() {
  document.getElementById("Winner").innerHTML = "Computer";
  comptoken = symb === "X" ? "O" : "X";
  let index = Math.floor(Math.random() * 9);
  if (gameArr[index] === "") {
    clickCount++;
    gameArr.splice(index, 1, comptoken);
    gameView(gameArr);
    let winner = checkWinner(gameArr);
    theWinner(winner);
    setTimeout(function() {
      document.getElementById("Winner").innerHTML = "Your turn " + symb;
    }, 1000);
  } else {
    computer();
  }
}

function newToken(symb) {
  if (symb === "X") {
    token("O");
    return "X";
  } else {
    token("X");
    return "O";
  }
}

function restart() {
  window.location.reload(true);
}

function checkWinner(arr) {
  const winner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winner.length; i++) {
    const [a, b, c] = winner[i];

    if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
      return arr[a];
    }
  }
  return null;
}

function reset(arr) {
  gameArr = ["", "", "", "", "", "", "", "", ""];
  clickCount = 0;

  for (let i = 0; i < arr.length; i++) {

    let index = i;
    function doStuff(index, arr) {
      document.getElementById(`btn${index}`).innerHTML = "";
      document.getElementById(`btn${index}`).disabled = false;
 setTimeout(function() {
    document.getElementById("Winner").innerHTML = "";
      }, 1000);
      if (player === 2){
 setTimeout(function() {
    document.getElementById("Winner").innerHTML = "You Start " + symb; ;
      }, 1000);}
    }
    doStuff(index, gameArr);
  }

}
