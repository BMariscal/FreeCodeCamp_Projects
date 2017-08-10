let greenBtn = document.getElementById("greenBtnAudio");
let redBtn = document.getElementById("redBtnAudio");
let blueBtn = document.getElementById("blueBtnAudio");
let yellowBtn = document.getElementById("yellowBtnAudio");
let lostSound = document.getElementById("lostAudio");
let greenLightBtn = document.querySelector(".quarterCircleTopLeft");
let redLightBtn = document.querySelector(".quarterCircleTopRight");
let blueLightBtn = document.querySelector(".quarterCircleBottomLeft");
let yellowLightBtn = document.querySelector(".quarterCircleBottomRight");

greenLightBtn.className += " " + "disabledbutton";
redLightBtn.className += " " + "disabledbutton";
blueLightBtn.className += " " + "disabledbutton";
yellowLightBtn.className += " " + "disabledbutton";
let gameCombo = [];
let playerCombo = [];
let localstorage = {};
let playerCount = 0;
let start = false;
let strict = false;
let counted = 0;
let on = false;
let indexarr = [];

let colorBtnView = {
  green: function() {
    playerCombo.push("green");
    greenBtn.play();
    if (
      playerCombo.length === counted 
      // &&
      // controller.checker(playerCombo, counted)
    ) {
      if (
        on &&
        start &&
        JSON.stringify(controller.get().slice(0, [counted])) ===
          JSON.stringify(playerCombo)
      ) {
        controller.count();
        centerConsoleView.countView();
        playerCount++;
        playerCombo = [];
        controller.game();
      } else {
        lostSound.play();
        playerCombo.pop();
        playerCombo = [];
        controller.game();
      }
    } 
  },
  red: function() {
    playerCombo.push("red");
    redBtn.play();
    if (
      playerCombo.length === counted
      // &&
      // controller.checker(playerCombo, counted)
    ) {
      if (
        on &&
        start &&
        JSON.stringify(controller.get().slice(0, [counted])) ===
          JSON.stringify(playerCombo)
      ) {
        controller.count();
        centerConsoleView.countView();
        playerCount++;
        playerCombo = [];
        controller.game();
      } else {
        lostSound.play();
        playerCombo = [];
        playerCombo.pop();
        controller.game();
      }
    } 
  },
  blue: function() {
    playerCombo.push("blue");
    blueBtn.play();
    if (
      playerCombo.length === counted 
      // &&
      // controller.checker(playerCombo, counted)
    ) {
      if (
        on &&
        start &&
        JSON.stringify(controller.get().slice(0, [counted])) ===
          JSON.stringify(playerCombo)
      ) {
        controller.count();
        centerConsoleView.countView();
        playerCount++;
        playerCombo = [];
        controller.game();
      } else {
        lostSound.play();
        playerCombo.pop();
        playerCombo = [];
        controller.game();
      }
    }
  },
  yellow: function() {
    playerCombo.push("yellow");
    yellowBtn.play();
    if (
      playerCombo.length === counted 
      // &&
      // controller.checker(playerCombo, counted)
    ) {
      if (
        on &&
        start &&
        JSON.stringify(controller.get().slice(0, [counted])) ===
          JSON.stringify(playerCombo)
      ) {
        controller.count();
        centerConsoleView.countView();
        playerCount++;
        playerCombo = [];
        controller.game();
      } else {
        lostSound.play();
        playerCombo.pop();
        playerCombo = [];
        controller.game();
      }
    } 
  }
};

let computercolorBtnView = {
  colorSelect: function(color) {
    if (color === "green") {
      setTimeout(function() {
        greenBtn.play();
        greenLightBtn.className += " " + "quarterCircleTopLeftPressed";
      }, 1000);

      setTimeout(function() {
        greenLightBtn.classList.remove("quarterCircleTopLeftPressed");
      }, 2000);
    } else if (color === "red") {
      setTimeout(function() {
        redBtn.play();
        redLightBtn.className += " " + "quarterCircleTopRightPressed";
      }, 1000);

      setTimeout(function() {
        redLightBtn.classList.remove("quarterCircleTopRightPressed");
      }, 2000);
    } else if (color === "blue") {
      setTimeout(function() {
        blueBtn.play();
        blueLightBtn.className += " " + "quarterCircleBottomLeftPressed";
      }, 1000);

      setTimeout(function() {
        blueLightBtn.classList.remove("quarterCircleBottomLeftPressed");
      }, 2000);
    } else if (color === "yellow") {
      setTimeout(function() {
        yellowBtn.play();
        yellowLightBtn.className += " " + "quarterCircleBottomRightPressed";
      }, 1000);

      setTimeout(function() {
        yellowLightBtn.classList.remove("quarterCircleBottomRightPressed");
      }, 2000);
    }
  }
};

let centerConsoleView = {
  onView: function() {
    let onBtn = document.getElementsByClassName("switch-input")[0].checked
      ? "yes"
      : "no";
    if (onBtn === "yes") {
      on = true;
    } else {
      on = false;
      this.offBtnView();
    }
  },
  startView: function() {
    if (on) {
      start = true;
      this.init();
      document.getElementById("startAudio").play();
      greenLightBtn.classList.remove("disabledbutton");
      redLightBtn.classList.remove("disabledbutton");
      blueLightBtn.classList.remove("disabledbutton");
      yellowLightBtn.classList.remove("disabledbutton");
      setTimeout(function() {
        controller.on();
      }, 2000);

      //controller.on()
    }
  },
  offBtnView: function() {
    //document.getElementById("goodbyeAudio").play();
    greenLightBtn.className += " " + "disabledbutton";
    redLightBtn.className += " " + "disabledbutton";
    blueLightBtn.className += " " + "disabledbutton";
    yellowLightBtn.className += " " + "disabledbutton";
    controller.off();
  },
  strictView: function() {
    strict = true;
  },
  countView: function() {
    let num = Number(counted) < 10 ? "0" + counted : counted;
    count = document.getElementById("count").innerHTML = `<h1>${num}</h1>`;
  },
  init: function() {
    document.getElementById("count").innerHTML = `<h1>- -</h1>`;
    setTimeout(function() {
      document.getElementById("count").innerHTML = `<h1>   </h1>`;
      setTimeout(function() {
        count = document.getElementById("count").innerHTML = `<h1>- -</h1>`;
      }, 500);
    }, 500);
  }
};

let controller = {
  on: function() {
    console.log("inside");
    let data = model.getData();
    console.log(data);
    let currentIndex = Number(counted);
    console.log(currentIndex);
    console.log(currentIndex + " is currentIndex");
    computercolorBtnView.colorSelect(data[currentIndex]);
    this.count();
    console.log(counted + " counted");
    centerConsoleView.countView();
    this.game();
  },
  checker: function(arr, index) {
    let data = this.get();
//     console.log(arr, " *arr");
//     console.log(index - 1, " *index");
      let newarr = data.slice(0, index);

//     return newarr.indexOf(arr[0]) !== -1;
    console.log(arr[0] + "ARR[0]")
    console.log(data[index-1] + "index in arr")
    return arr[0] === data[index-1]
  },
  game: function() {
    let data = model.getData();
    let newarr = data.slice(0, counted);
    console.log(newarr + "newarr");
    for (let i = 0; i < newarr.length; i++) {
      let index = i;
      (function(index) {
        setTimeout(function() {
          computercolorBtnView.colorSelect(newarr[index]);
        }, index * 1000);
      })(index);
    }
  },
  get: function() {
    let compData = model.getData();
    return compData;
  },
  count: function() {
    counted = Number(counted);
    counted++;
    counted = counted;
  },
  off: function() {
    counted = 0;
    start = false;
    on = false;
    strict = false;
    gameCombo = [];
    playerCombo = [];
    document.getElementById("count").innerHTML = `<h1>  </h1>`;
  },
  init: function() {
    let counter = 0;
    let colors = {
      0: colorBtnView.green,
      1: colorBtnView.red,
      2: colorBtnView.blue,
      3: colorBtnView.yellow
    };
    let colorArr = ["green", "red", "blue", "yellow"];
    while (counter <= 19) {
      let randomNum = Math.floor(Math.random() * (4 - 0)) + 0;
      let colorkey = colorArr[randomNum];
      counter++;
      gameCombo.push(colorkey);
    }

    model.setData(gameCombo);
    document.getElementsByClassName("switch-input")[0].onchange = function() {
      centerConsoleView.onView();
    };
  }
};

let model = {
  setData: function(gameCombo) {
    console.log(gameCombo);
    localstorage.gameData = gameCombo;
  },
  getData: function() {
    let storage = localstorage.gameData;
    return storage;
  }
};
controller.init();