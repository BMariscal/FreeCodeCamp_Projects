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
let currentArr = [];
let parser;
//================================================
let colorBtnView = {
  green: function() {
    playerCombo.push("green");
    currentArr.push("green");
    greenBtn.play();
    let checkG = controller.checker("green", currentArr);
    if (playerCombo.length === counted && checkG) {
      if (on && start) {
        controller.count();
        centerConsoleView.countView();
        playerCount++;
        playerCombo = [];
        controller.game();
      }
    } else if (!checkG && strict) {
      controller.wrong();
      lostSound.play();
      setTimeout(function() {
        playerCombo = [];
        counted = 0;
        playerCount = 0;
        controller.reset();
        controller.init();
        centerConsoleView.startView();
      }, 1000);
    } else if (!checkG) {
      lostSound.play();
      controller.wrong();
      setTimeout(function() {
        playerCombo.pop();
        playerCombo = [];
        controller.game();
      }, 2000);
    }
  },
  red: function() {
    playerCombo.push("red");
    currentArr.push("red");
    redBtn.play();
    let checkR = controller.checker(playerCombo, currentArr);
    if (playerCombo.length === counted && checkR) {
      if (on && start) {
        controller.count();
        centerConsoleView.countView();
        playerCount++;
        playerCombo = [];
        controller.game();
      }
    } else if (!checkR && strict) {
      controller.wrong();
      lostSound.play();
      setTimeout(function() {
        playerCombo = [];
        counted = 0;
        playerCount = 0;
        controller.reset();
        controller.init();
        centerConsoleView.startView();
      }, 1000);
    } else if (!checkR) {
      controller.wrong();
      lostSound.play();
      setTimeout(function() {
        playerCombo.pop();
        playerCombo = [];
        controller.game();
      }, 2000);
    }
  },
  blue: function() {
    playerCombo.push("blue");
    currentArr.push("blue");
    blueBtn.play();
    let checkB = controller.checker(playerCombo, currentArr);
    if (playerCombo.length === counted && checkB) {
      if (on && start && playerCombo.length === counted) {
        controller.count();
        centerConsoleView.countView();
        playerCount++;
        playerCombo = [];
        controller.game();
      }
    } else if (!checkB && strict) {
      controller.wrong();
      lostSound.play();
      setTimeout(function() {
        playerCombo = [];
        counted = 0;
        playerCount = 0;
        controller.reset();
        controller.init();
        centerConsoleView.startView();
      }, 1000);
    } else if (!checkB) {
      lostSound.play();
      controller.wrong();
      setTimeout(function() {
        playerCombo.pop();
        playerCombo = [];
        controller.game();
      }, 2000);
    }
  },
  yellow: function() {
    playerCombo.push("yellow");
    currentArr.push("yellow");
    yellowBtn.play();
    let checkY = controller.checker(playerCombo, currentArr);
    if (playerCombo.length === counted && checkY) {
      if (on && start) {
        controller.count();
        centerConsoleView.countView();
        playerCount++;
        playerCombo = [];
        controller.game();
      }
    } else if (!checkY && strict) {
      controller.wrong();
      lostSound.play();
      setTimeout(function() {
        playerCombo = [];
        counted = 0;
        playerCount = 0;
        controller.reset();
        controller.init();
        centerConsoleView.startView();
      }, 1000);
    } else if (!checkY) {
      lostSound.play();
      controller.wrong();
      setTimeout(function() {
        playerCombo.pop();
        playerCombo = [];
        controller.game();
      }, 2000);
    }
  }
};
//===================================================
let computercolorBtnView = {
  colorSelect: function(color) {
    if (color === "green" && start) {
      setTimeout(function() {
        greenBtn.play();
        greenLightBtn.className += " " + "quarterCircleTopLeftPressed";
      }, 500);

      setTimeout(function() {
        greenLightBtn.classList.remove("quarterCircleTopLeftPressed");
      }, 800);
    } else if (color === "red" && start) {
      setTimeout(function() {
        redBtn.play();
        redLightBtn.className += " " + "quarterCircleTopRightPressed";
      }, 500);

      setTimeout(function() {
        redLightBtn.classList.remove("quarterCircleTopRightPressed");
      }, 800);
    } else if (color === "blue" && start) {
      setTimeout(function() {
        blueBtn.play();
        blueLightBtn.className += " " + "quarterCircleBottomLeftPressed";
      }, 500);

      setTimeout(function() {
        blueLightBtn.classList.remove("quarterCircleBottomLeftPressed");
      }, 800);
    } else if (color === "yellow" && start) {
      setTimeout(function() {
        yellowBtn.play();
        yellowLightBtn.className += " " + "quarterCircleBottomRightPressed";
      }, 500);

      setTimeout(function() {
        yellowLightBtn.classList.remove("quarterCircleBottomRightPressed");
      }, 800);
    }
  }
};


//================================================
let centerConsoleView = {
  onView: function() {
    let onBtn = document.getElementsByClassName("switch-input")[0].checked
      ? "yes"
      : "no";
    if (onBtn === "yes") {
      this.init();
      on = true;
    } else {
      on = false;
      this.offBtnView();
    }
  },
  startView: function() {
    if (on && counted === 0) {
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
    } else if (counted > 0){
      start = false;
      this.init();
      this.offBtnView();
      on = true;
      clearTimeout(parser);
      setTimeout(function(){
        centerConsoleView.startView()},2000)
 
    }
  },
  offBtnView: function() {
    greenLightBtn.className += " " + "disabledbutton";
    redLightBtn.className += " " + "disabledbutton";
    blueLightBtn.className += " " + "disabledbutton";
    yellowLightBtn.className += " " + "disabledbutton";
    controller.off();
  },
  strictView: function() {
    if (on) {
      if (!strict){
      strict = true;
      console.log("STRICT" + strict);
      let light = document.getElementById("strictlight");
      light.classList.remove("strictlightOff");
      light.className += " " + "strictlightON";  
      }else{
        strict = false;
       console.log("STRICT false" + strict);
      let light = document.getElementById("strictlight");
      light.classList.remove("strictlightON");
      light.className += " " + "strictlightOff";  
        
        
      }

    }
  },
  removeStrict: function() {
    strict = false;
    console.log("STRICT" + strict);
    let light = document.getElementById("strictlight");
    light.classList.remove("strictlightON");
    light.className += " " + "strictlightOff";
  },
  countView: function() {
    let num = Number(counted) < 10 ? "0" + counted : counted;
    if (num === "00") {
      num = "!!";
    }
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

//================================================

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
  checker: function(color, arr) {
    let data = this.get();
    let everyVal = arr.every((item, index) => item === data[index]);
    console.log(everyVal + "everyval");

    return everyVal;
  },
  win: function() {
    document.getElementById("winAudio").play();
    alert("YOU WIN!");
    setTimeout(function() {
      centerConsoleView.offBtnView();
      on = true;
      start = false;
      centerConsoleView.init();
    }, 1000);
  },
  wrong: function() {
    document.getElementById("count").innerHTML = `<h1>!!</h1>`;
    setTimeout(function() {
      document.getElementById("count").innerHTML = `<h1>  </h1>`;
      setTimeout(function() {
        count = document.getElementById("count").innerHTML = `<h1>!!</h1>`;
        centerConsoleView.countView();
      }, 500);
    }, 500);
  },
  game: function() {
    console.log("inside controller game");
    let data = model.getData();
    let newarr = data.slice(0, counted);
    console.log(newarr + "newarr");
    if (start === false) {
      return;
    }
    for (let i = 0; i < newarr.length; i++) {
      let index = i;

      (function(index) {
        parser = setTimeout(function() {
          computercolorBtnView.colorSelect(newarr[index]);
        }, index * 1000);
      })(index);
    }
    currentArr = [];
  },
  get: function() {
    let compData = model.getData();
    return compData;
  },
  count: function() {
    if (counted === 20) {
      this.win();
    }
    counted = Number(counted);
    counted++;
    counted = counted;
  },
  off: function() {
    document.getElementById("count").innerHTML = `<h1>  </h1>`;
    gameCombo = [];
    playerCombo = [];
    localstorage = {};
    playerCount = 0;
    start = false;
    strict = false;
    counted = 0;
    on = false;
    currentArr = [];
    //window.location.reload(true);
    centerConsoleView.removeStrict();
    this.init();
  },
  reset: function() {
    document.getElementById("count").innerHTML = `<h1>  </h1>`;
    gameCombo = [];
    playerCombo = [];
    localstorage = {};
    playerCount = 0;
    start = true;
    counted = 0;
    on = true;
    currentArr = [];
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

//================================================
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
