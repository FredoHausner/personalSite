const sudokuInput = document.getElementsByClassName("sudokuInput");
const newGameButton = document.getElementById("NewGameButton");
const sudokuNumberButton = document.getElementsByClassName(
  "sudokuNumberButton"
);
const lightIndicator = document.getElementById("AnswerIndicator");
const sudokuTimer = document.getElementById("SudokuTimer");

var timer = false;
var timerInterval;
var timerCount = 0;

var selectedInputRow = undefined;
var selectedInputColumn = undefined;
var answers_board = [];
var puzzle_board = [];

//vvv event listener for selecting inputs vvv
for (let i = 0; i < sudokuInput.length; i++) {
  sudokuInput[i].addEventListener("click", selectInput);
}

for (let i = 0; i < sudokuNumberButton.length; i++) {
  sudokuNumberButton[i].addEventListener("click", placeNumber);
}

newGameButton.addEventListener("click", createNewGame);

function initializeBoard() {
  generateBoard.new_game("easy", function(obj) {
    answers_board = obj.answers_board;
    puzzle_board = obj.puzzle_board;

    populateBoard(puzzle_board);
  });
}

initializeBoard();

function populateBoard(board_obj) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board_obj[r][c] != 0) {
        document.getElementsByClassName(`r${r}c${c}`)[0].innerHTML =
          board_obj[r][c];
      } else {
        document.getElementsByClassName(`r${r}c${c}`)[0].innerHTML = "";
      }
    }
  }
}

function placeNumber() {
  if (!timer) {
    startTimer();
  }
  if (
    selectedInputRow != undefined &&
    puzzle_board[selectedInputRow][selectedInputColumn] == 0
  ) {
    if (
      this.getAttribute("data-val") ==
      answers_board[selectedInputRow][selectedInputColumn]
    ) {
      document.getElementsByClassName(
        `r${selectedInputRow}c${selectedInputColumn}`
      )[0].innerHTML = this.getAttribute("data-val");
      puzzle_board[selectedInputRow][selectedInputColumn] = this.getAttribute(
        "data-val"
      );
      checkIfComplete();
      lightIndicator.classList.add("rightAnswer");
      setTimeout(function() {
        lightIndicator.classList.remove("rightAnswer");
      }, 800);
    } else {
      lightIndicator.classList.add("wrongAnswer");
      setTimeout(function() {
        lightIndicator.classList.remove("wrongAnswer");
      }, 800);
    }
  }
}

function checkIfComplete() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (puzzle_board[r][c] == 0) {
        return;
      }
    }
  }
  stopTimer();
  for (let y = 0; y < sudokuInput.length; y++) {
    sudokuInput[y].classList.remove("highlightInput");
    sudokuInput[y].classList.remove("selectedInput");
  }

  for (let i = 0; i < sudokuInput.length; i++) {
    sudokuInput[i].removeEventListener("click", selectInput);
  }
  //confetti happens here...
  // ConfettiAnimation();
  setTimeout(ConfettiAnimation, 1000);
}

function startTimer() {
  timer = true;
  timerInterval = setInterval(function() {
    timerCount++;

    if (timerCount < 60) {
      if (timerCount.toString().length == 1) {
        sudokuTimer.innerHTML = `00:0${timerCount}`;
      } else {
        sudokuTimer.innerHTML = `00:${timerCount}`;
      }
    } else {
      let numberToPlace = undefined;
      if (Math.floor(timerCount / 60).toString().length == 1) {
        numberToPlace = `0${Math.floor(timerCount / 60)}:`;
      } else {
        numberToPlace = `${Math.floor(timerCount / 60)}:`;
      }
      let secondsToPlace = (timerCount % 60).toString();
      if (secondsToPlace.length == 1) {
        numberToPlace += `0${secondsToPlace}`;
      } else {
        numberToPlace += secondsToPlace;
      }
      sudokuTimer.innerHTML = numberToPlace;
    }
  }, 1000);
}

function stopTimer() {
  timer = false;
  clearInterval(timerInterval);
  timerCount = 0;
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
function selectInput() {
  for (let y = 0; y < sudokuInput.length; y++) {
    sudokuInput[y].classList.remove("highlightInput");
    sudokuInput[y].classList.remove("selectedInput");
  }

  this.classList.add("selectedInput");

  let inputString = this.classList[4].toString();

  selectedInputRow = parseInt(inputString.substring(1, 2));
  selectedInputColumn = parseInt(inputString.substring(3, 4));

  let row = document.getElementsByClassName(`${this.classList[1]}`);
  let column = document.getElementsByClassName(`${this.classList[2]}`);
  let unit = document.getElementsByClassName(`${this.classList[3]}`);

  for (let r = 0; r < row.length; r++) {
    row[r].classList.add("highlightInput");
  }

  for (let r = 0; r < column.length; r++) {
    column[r].classList.add("highlightInput");
  }

  for (let r = 0; r < unit.length; r++) {
    unit[r].classList.add("highlightInput");
  }
}

function createNewGame() {
  StopConfetti();
  stopTimer();
  sudokuTimer.innerHTML = "00:00";
  for (let y = 0; y < sudokuInput.length; y++) {
    sudokuInput[y].classList.remove("highlightInput");
    sudokuInput[y].classList.remove("selectedInput");
  }

  for (let i = 0; i < sudokuInput.length; i++) {
    sudokuInput[i].addEventListener("click", selectInput);
  }

  generateBoard.new_game("expert", function(obj) {
    answers_board = obj.answers_board;
    puzzle_board = obj.puzzle_board;

    populateBoard(puzzle_board);
  });
}
