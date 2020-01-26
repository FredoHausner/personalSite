const canvas = document.getElementById("ConfettiCanvas");
let SudokuTileWidth = document.getElementById("SudokuTile").offsetWidth;
canvas.height = "500";
canvas.width = `${SudokuTileWidth}`;
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
var darkCircle = new Image();
darkCircle.src = "../images/darkCircle.png";
var lightCircle = new Image();
lightCircle.src = "../images/lightCircle.png";
var darkDiamond = new Image();
darkDiamond.src = "../images/darkDiamond.png";
var lightDiamond = new Image();
lightDiamond.src = "../images/lightDiamond.png";
var darkSquare = new Image();
darkSquare.src = "../images/darkSquare.png";
var lightSquare = new Image();
lightSquare.src = "../images/lightSquare.png";
var darkTriangle = new Image();
darkTriangle.src = "../images/darkTriangle.png";
var lightTriangle = new Image();
lightTriangle.src = "../images/lightTriangle.png";
var darkSquiggle = new Image();
darkSquiggle.src = "../images/darkSquiggle.png";
var lightSquiggle = new Image();
lightSquiggle.src = "../images/lightSquiggle.png";
var confettiArray = [];
let moreConfetti;
// vvv specs for drawing image to canvas vvv
//   ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

// vvv event listener for resizing canvas on screen width change vvv
window.onresize = adjustCanvas;

function adjustCanvas() {
  SudokuTileWidth = document.getElementById("SudokuTile").offsetWidth;
  if (SudokuTileWidth != 288) {
    canvas.width = `${SudokuTileWidth}`;
  }
}

// vvv shape canvas specs object vvv
var shapeObj = {
  Circle: {
    w: 107,
    h: 113,
    dw: 12,
    dh: 12
  },
  Diamond: {
    w: 371,
    h: 900,
    dw: 6,
    dh: 14
  },
  Square: {
    w: 500,
    h: 500,
    dw: 9,
    dh: 9
  },
  Squiggle: {
    w: 109,
    h: 150,
    dw: 9,
    dh: 16
  },
  Triangle: {
    w: 94,
    h: 89,
    dw: 12,
    dh: 12
  }
};

// vvv confetti class vvv
class ConfettiPiece {
  constructor() {
    this.shape, this.shade, this.img, this.height, this.width, this.spin;
    this.speed, this.dw, this.dh, this.dx, this.dy, this.degree, this.xDir;
  }
}

function createConfetti() {
  confettiArray = [];
  for (let i = 0; i < 10; i++) {
    var C = new ConfettiPiece();
    C.shape = randomShape();
    C.shade = randomShade();
    C.img = `../images/${C.shade}${C.shape}.png`;
    C.width = shapeObj[C.shape].w;
    C.height = shapeObj[C.shape].h;
    C.degree = 0;
    C.spin = randomSpeed();
    C.speed = randomSpeed();
    C.dw = shapeObj[C.shape].dw;
    C.dh = shapeObj[C.shape].dh;
    C.dx = randomXCoor();
    C.dy = -30;
    C.xDir = randomXdir();
    confettiArray.push(C);
  }
}

function ConfettiAnimation() {
  createConfetti();
  let drawInterval = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (confettiArray.length == 0) {
      clearInterval(drawInterval);
    }
    for (let i = 0; i < confettiArray.length; i++) {
      if (confettiArray[i].dy >= canvas.height) {
        confettiArray.splice(i, 1);
        continue;
      } else {
        let C = confettiArray[i];
        var image;
        if (C.shade == "dark" && C.shape == "Circle") {
          image = darkCircle;
        } else if (C.shade == "light" && C.shape == "Circle") {
          image = lightCircle;
        } else if (C.shade == "dark" && C.shape == "Diamond") {
          image = darkDiamond;
        } else if (C.shade == "light" && C.shape == "Diamond") {
          image = lightDiamond;
        } else if (C.shade == "dark" && C.shape == "Square") {
          image = darkSquare;
        } else if (C.shade == "light" && C.shape == "Square") {
          image = lightSquare;
        } else if (C.shade == "dark" && C.shape == "Triangle") {
          image = darkTriangle;
        } else if (C.shade == "light" && C.shape == "Triangle") {
          image = lightTriangle;
        } else if (C.shade == "dark" && C.shape == "Squiggle") {
          image = darkSquiggle;
        } else if (C.shade == "light" && C.shape == "Squiggle") {
          image = lightSquiggle;
        }
        ctx.save();
        ctx.translate(C.dx, C.dy);
        ctx.translate(C.dw / 2, C.dh / 2);
        ctx.rotate(C.degree * (Math.PI / 180));
        ctx.drawImage(
          image,
          0,
          0,
          C.width,
          C.height,
          -C.dw / 2,
          -C.dh / 2,
          C.dw,
          C.dh
        );
        ctx.restore();
        C.degree += parseFloat(C.spin);
        C.dy += parseFloat(C.spin);
        C.dx += C.xDir;
      }
    }
  }, 5);

  moreConfetti = setInterval(function () {
    for (let i = 0; i < 4; i++) {
      var C = new ConfettiPiece();
      C.shape = randomShape();
      C.shade = randomShade();
      C.img = `../images/${C.shade}${C.shape}.png`;
      C.width = shapeObj[C.shape].w;
      C.height = shapeObj[C.shape].h;
      C.degree = 0;
      C.spin = randomSpeed();
      C.speed = randomSpeed();
      C.dw = shapeObj[C.shape].dw;
      C.dh = shapeObj[C.shape].dh;
      C.dx = randomXCoor();
      C.dy = -20;
      C.xDir = randomXdir();
      confettiArray.push(C);
    }
  }, 500);
}

function StopConfetti() {
  clearInterval(moreConfetti);
}

function randomShade() {
  let shadeArr = ["light", "dark"];
  let randomIndex = Math.floor(Math.random() * shadeArr.length);
  return [shadeArr[randomIndex]];
}

function randomShape() {
  let shapeArr = ["Circle", "Diamond", "Square", "Squiggle", "Triangle"];
  let randomIndex = Math.floor(Math.random() * shapeArr.length);
  return [shapeArr[randomIndex]];
}

function randomSpeed() {
  let randomSpeedArr = [
    0.4,
    0.41,
    0.42,
    0.43,
    0.44,
    0.45,
    0.46,
    0.47,
    0.48,
    0.49,
    0.5,
    0.51,
    0.52,
    0.53,
    0.54
  ];
  return randomSpeedArr[Math.floor(Math.random() * randomSpeedArr.length)];
}

function randomXdir() {
  let randomSpeedArr = [
    0.01,
    0.02,
    0.03,
    0.04,
    0.05,
    0.06,
    0.07,
    0.08,
    0.09,
    0.1,
    0.11,
    -0.01,
    -0.02,
    -0.03,
    -0.04,
    -0.05,
    -0.06,
    -0.07,
    -0.08,
    -0.09,
    -0.1,
    -0.11
  ];
  return randomSpeedArr[Math.floor(Math.random() * randomSpeedArr.length)];
}

function randomXCoor() {
  return Math.floor(Math.random() * canvas.width);
}
