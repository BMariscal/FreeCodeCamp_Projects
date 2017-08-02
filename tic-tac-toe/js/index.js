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
let targetPosition = [];
let computerCount = 0;

// choose number of players playing
function players(x) {
  player = x;
  document.getElementById("selectToken").style.display = "block";
}
//choose your token
function token(sym) {
  symb = sym;
  document.getElementById("startGameButton").style.display = "block";
}

// click on start button
function start() {
  document.getElementById("top-div").style.display = "none";
  document.getElementById("controlBox").style.display = "block";
  document.getElementById("tic-tac-toe-box").style.display = "block";
  if (player === 1) {
    let starts = Math.floor(Math.random() * 2) + 1;
    playSolo(starts);
  } else if (player === 2) {
    document.getElementById("Winner").innerHTML = `${symb}'s  turn`;
  }
}

//the view is populated by the items in the gameArr array
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

//update view with the winner
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

//updates view indicating the current player's token
function toggleToken(symb) {
  if (symb === "X") {
    document.getElementById("Winner").innerHTML = "O's turn";
  } else {
    document.getElementById("Winner").innerHTML = "X's turn";
  }
}

//called from DOM when tic-tac-toe cell is clicked; num is the id of the cell
function clicked(num) {
  if (player === 2) {
    toggleToken(symb);
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

//initializes game when playing against computer
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

//computer's actions when playing against the computer
function computer() {
  document.getElementById("Winner").innerHTML = "Computer";
  comptoken = symb === "X" ? "O" : "X";
  let index = Math.floor(Math.random() * 9);
  if (gameArr[index] === "" && computerCount === 0) {
    clickCount++;
    computerCount++;
    gameArr.splice(index, 1, comptoken);
    gameView(gameArr);
    let winner = checkWinner(gameArr);
    theWinner(winner);
    setTimeout(function() {
      document.getElementById("Winner").innerHTML = "Your turn " + symb;
    }, 1000);
  } else if(computerCount > 0){
     let newidx = computerChoice(gameArr, comptoken);
     clickCount++;
     computerCount++;
     gameArr.splice(newidx, 1, comptoken);
     gameView(gameArr);
     let winner = checkWinner(gameArr);
    theWinner(winner);
    setTimeout(function() {
      document.getElementById("Winner").innerHTML = "Your turn " + symb;
    }, 1000);
      
  }else {
    computer();
  }
}

//makes computer smarter
function computerChoice(arr,token){
    const opponentToken = (token === "X"? "O": "X");
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
    const idx1 = (arr[a] === token && arr[b] === token) && arr[c] === "";
    const idx2 = (arr[a] === token && arr[c] === token) && arr[b] === "";
    const idx3 = (arr[b] === token && arr[c] === token) && arr[a] === "";
    const first =(arr[a] === opponentToken && arr[b] === opponentToken) && arr[c] === "";
    const second =(arr[a] === opponentToken && arr[c] === opponentToken) && arr[b] === "";
    const third =(arr[b] === opponentToken && arr[c] === opponentToken) && arr[a] === "";
    if (idx1 || idx2 || idx3){
        if ( idx3 ){
          console.log('idx a' + a)
          return a;
        }else if(idx2 ){
          console.log('idx b' + b)
          return b;
        }else if(idx1 ){
          console.log('idx c' + c)
          return c;
        }    
        
    }
    if( first|| second || third ){
        if ( third ){
          console.log('third a' + a)
          return a;
        }else if(second){
           console.log('third b' + b)
          return b;
        }else if(first ){
           console.log('third c' + c)
          return c;
        }    
            
    }
  }
 for (let i = 0; i < winner.length; i++) {
    const [a, b, c] = winner[i]; 
 
      if (arr[a] === ""){
        return a;
      }else if(arr[b] === ""){
        return b;
      }else if(arr[c] === ""){
        return c;
      }
 }
}


//toggles token for two player game
function newToken(symb) {
  if (symb === "X") {
    token("O");
    return "X";
  } else {
    token("X");
    return "O";
  }
}

//restarts game from the top/beginning
function restart() {
  window.location.reload(true);
}

//Checks for winner; returns winning token of winner or null if no winner
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

//resets game
function reset(arr) {
  gameArr = ["", "", "", "", "", "", "", "", ""];
  clickCount = 0;
  computerCount = 0;

  for (let i = 0; i < arr.length; i++) {
    let index = i;
    function doStuff(index, arr) {
      document.getElementById(`btn${index}`).innerHTML = "";
      document.getElementById(`btn${index}`).disabled = false;
      setTimeout(function() {
        document.getElementById("Winner").innerHTML = "";
      }, 1000);
      if (player === 2) {
        setTimeout(function() {
          document.getElementById("Winner").innerHTML = "You Start " + symb;
        }, 1000);
      }
    }
    doStuff(index, gameArr);
  }
}
