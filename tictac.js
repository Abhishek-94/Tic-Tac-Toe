class Tictac {
  constructor() {
    this.elemObj = {};
    this.countbox = 0;
    this.init();
    this.currPlayer = "X";
    this.winplayer = null;
  }

  init() {
    this.createUI();
    this.gameStart();
  }

  createUI() {
    //Create UI of TicTacToe
    let mainBox = document.createElement("div");
    mainBox.setAttribute("class", "mainBox");
    for (let i = 0; i < 9; i++) {
      this.elemObj[i] = document.createElement("button");
      this.elemObj[i].setAttribute("class", "box");
      this.elemObj[i].setAttribute("id", `box_${i}`);
      mainBox.appendChild(this.elemObj[i]);
    }
    let winnerBox = document.createElement("div");
    winnerBox.setAttribute("id", "winnerBox");
    document.body.appendChild(mainBox);
    document.body.appendChild(winnerBox);
  }

  gameStart() {
    let x = document.getElementsByClassName("box");
    let y = Array.from(x); //Converting nodelist into Array
    const thisObj = this;
    for (let i = 0; i < y.length; i++) {
      y[i].addEventListener("click", function(e) {
        y[i].innerHTML = thisObj.currPlayer;
        if (y[i].innerHTML == "X") y[i].style.background = " #ffff99";
        else y[i].style.background = "#66ffff";
        y[i].disabled = true;
        thisObj.countbox++;
        thisObj.checkWin(this); //Click Function this
        thisObj.togglePlayer();
      });
    }
  }

  //Switch Player
  togglePlayer() {
    if (this.currPlayer === "X") {
      this.currPlayer = "O";
    } else {
      this.currPlayer = "X";
    }
  }

  //Check Win Condition
  checkWin(_button) {
    let x = _button.getAttribute("id");
    let y = parseInt(x.split("_")[1]);
    let count;
    let isWinnerDecided = false;
    let winningCond = [
      [0, 1, 2],
      [0, 3, 6],
      [3, 4, 5],
      [6, 7, 8],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winningCond.length; i++) {
      count = 0;
      if (winningCond[i].includes(y)) {
        for (let j = 0; j < winningCond[i].length; j++) {
          let id = "box_" + winningCond[i][j];
          let buttonText = document.getElementById(id).innerHTML;
          if (buttonText == this.currPlayer) {
            count++;
            this.winplayer = this.currPlayer;
          }
        }
        if (count === 3) {
          isWinnerDecided = true;
          winnerBox.innerHTML =
            "Winner Winner Chicken Dinner Player: " + this.winplayer;
          this.afterWin();
        }
      }
    }
    if (this.countbox === 9 && !isWinnerDecided) {
      winnerBox.innerHTML = "No One Wins Better Luck Next Time";
    }
  }

  afterWin() {
    let b1 = Array.from(document.getElementsByClassName("box"));
    for (let i = 0; i < b1.length; i++) {
      b1[i].style.pointerEvents = "none";
    }
  }
}

new Tictac();
