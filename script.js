const framesPerSecond = 20;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var knight = new Image();
var knightPos = {
  x: 0,
  y: 0,
};
var knightMove = "idle";
var i = 1;

function init() {
  window.requestAnimationFrame(draw);
}

// Utility functions

function getSprite(sprite, spriteName, action) {
  setTimeout(function () {
    sprite.src = `${spriteName}/${action}/${action.toLowerCase()}${i}.png`;
    window.requestAnimationFrame(draw);
  }, 1000 / framesPerSecond);
}

function move() {
  knightPos.x += 5;
}

// Moves

function attack() {
  if (knightPos.x < 50) {
    move();
    getSprite(knight, "Knight", "Run_Attack");
  } else if (knightPos.x < 200) {
    move();
    getSprite(knight, "Knight", "Run");
  } else {
    getSprite(knight, "Knight", "Run_Attack");
    if (i === 8) {
      knightMove = "idle";
    }
  }
  if (i < 8) {
    i++;
  } else {
    i = 1;
  }
}

function attackBig() {
  if (knightPos.x < 200) {
    move();
    getSprite(knight, "Knight", "Run");
  } else {
    getSprite(knight, "Knight", "Attack_Extra");
    if (i === 8) {
      knightMove = "idle";
    }
  }
  if (i < 8) {
    i++;
  } else {
    i = 1;
  }
}

function idle() {
  i = "";
  getSprite(knight, "Knight", "Static");
}

// Buttons

document.getElementById("attack").addEventListener("click", function () {
  knightMove = "attack";
});

document.getElementById("attackBig").addEventListener("click", function () {
  knightMove = "attackBig";
});

// Draw

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  switch (knightMove) {
    case "attack":
      attack();
      break;
    case "attackBig":
      attackBig();
      break;
    case "idle":
      idle();
      break;
    default:
      console.log("erf!");
  }

  ctx.drawImage(knight, knightPos.x, knightPos.y);
}

init();
