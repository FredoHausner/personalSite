generateBoard = new (function() {
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // vvv creates new board, creates puzzle board, depending on difficulty
  this.new_game = function(difficulty, callback) {
    emptyBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    let restartBoard = 0;
    // let start = Date.now();
    for (let row = 0; row < 9; row++) {
      let possibleRowNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      let numbersThatCant = [];
      for (let column = 0; column < 9; column++) {
        if (possibleRowNumbers.length == 0) {
          restartBoard++;
          if (restartBoard >= 11) {
            restartBoard = 0;
            row = 0;
            column = 0;
            emptyBoard[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            emptyBoard[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            emptyBoard[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            emptyBoard[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            emptyBoard[4] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            emptyBoard[5] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            emptyBoard[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            emptyBoard[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            emptyBoard[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
          } else {
            column = -1;
            possibleRowNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            numbersThatCant = [];
            emptyBoard[row] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
          }
        } else {
          let randomNumber = eval(
            possibleRowNumbers
              .splice(
                Math.ceil(Math.random() * possibleRowNumbers.length - 1),
                1
              )
              .join()
          );
          if (
            !checkColumn(emptyBoard, column, randomNumber) ||
            !checkUnit(emptyBoard, column, row, randomNumber)
          ) {
            numbersThatCant.push(randomNumber);
            randomNumber = undefined;
            column--;
          } else {
            emptyBoard[row][column] = randomNumber;
            for (let i = 0; i < numbersThatCant.length; i++) {
              possibleRowNumbers.push(numbersThatCant[i]);
            }
            numbersThatCant = [];
          }
        }
      }
    }

    let board_answers = copyBoard(emptyBoard);
    createPuzzle(emptyBoard, difficulty);
    let board_puzzle = copyBoard(emptyBoard);
    let solvedPuzzle = sudokuSolver(emptyBoard);
    let solved = checkIfSolvedCorrectly(solvedPuzzle, board_answers);
    if (!solved) {
      //   console.log("bad game");
      this.new_game(difficulty, callback);
    } else {
      let new_game = {
        answers_board: board_answers,
        puzzle_board: board_puzzle
      };
      callback(new_game);
    }
  };

  //checks column on creation
  function checkColumn(sudokuBoard, column, numberToTry) {
    for (let i = 0; i < 9; i++) {
      if (sudokuBoard[i][column] == numberToTry) {
        return false;
      }
    }
    return true;
  }

  //checks for valid unit on creation
  function checkUnit(sudokuBoard, column, row, numberToTry) {
    let columnToStart = undefined;
    let columnToEnd = undefined;
    let rowToStart = undefined;
    let rowToEnd = undefined;

    if (column <= 2) {
      columnToStart = 0;
      columnToEnd = 3;
    } else if (column <= 5) {
      columnToStart = 3;
      columnToEnd = 6;
    } else {
      columnToStart = 6;
      columnToEnd = 9;
    }

    if (row <= 2) {
      rowToStart = 0;
      rowToEnd = 3;
    } else if (row <= 5) {
      rowToStart = 3;
      rowToEnd = 6;
    } else {
      rowToStart = 6;
      rowToEnd = 9;
    }

    for (let r = rowToStart; r < rowToEnd; r++) {
      for (let c = columnToStart; c < columnToEnd; c++) {
        if (sudokuBoard[r][c] == numberToTry) {
          return false;
        }
      }
    }

    return true;
  }

  function createPuzzle(sudokoBoard, difficulty) {
    squaresToRemove = undefined;
    let squaresRemoved = 0;
    difficulty == "easy"
      ? (squaresToRemove = 2)
      : difficulty == "medium"
      ? (squaresToRemove = 22)
      : (squaresToRemove =
          difficulty == "hard"
            ? (squaresToRemove = 25)
            : (squaresToRemove = 28));

    // console.log("sqaures to remove: " + squaresToRemove);
    for (let i = 0; i < squaresToRemove; i++) {
      let randomRow = Math.ceil(Math.random() * 8) - 1;
      let randomColumn = Math.ceil(Math.random() * 8) - 1;

      if (sudokoBoard[randomRow][randomColumn] != 0) {
        let mirroredRow = mirrorPair(randomRow);
        let mirroredColumn = mirrorPair(randomColumn);
        if (mirroredRow && mirroredColumn) {
          sudokoBoard[mirroredRow][mirroredColumn] = 0;
          squaresRemoved++;
        }
        sudokoBoard[randomRow][randomColumn] = 0;
        squaresRemoved++;
      } else {
        i--;
      }
    }
    // console.log("squares removed: " + squaresRemoved);
    return sudokoBoard;
  }

  //function to mirrors pairs
  function mirrorPair(number) {
    let pairs = {
      0: 8,
      1: 7,
      2: 6,
      3: 5,
      4: 4,
      5: 3,
      6: 2,
      7: 1,
      8: 0
    };
    if (number != 4) {
      return pairs[number];
    }
    return false;
  }

  function sudokuSolver(sudokuPuzzle) {
    let numberToContinue = undefined;
    let previousSolvedCells = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (sudokuPuzzle[r][c] == 0) {
          if (numberToContinue) {
            if (numberToContinue <= 9) {
              for (let i = numberToContinue; i <= 9; i++) {
                if (isValidPlacement(sudokuPuzzle, r, c, i)) {
                  sudokuPuzzle[r][c] = i;
                  previousSolvedCells.push({
                    row: r,
                    column: c
                  });
                  numberToContinue = undefined;
                  break;
                }
              }
            }
            if (sudokuPuzzle[r][c] == 0) {
              if (previousSolvedCells.length != 0) {
                let lastIndex = previousSolvedCells.pop();
                numberToContinue =
                  sudokuPuzzle[lastIndex.row][lastIndex.column];
                numberToContinue++;
                sudokuPuzzle[lastIndex.row][lastIndex.column] = 0;
                r = lastIndex.row;
                c = lastIndex.column - 1;
                continue;
              } else {
                for (let i = 1; i < 9; i++) {
                  if (isValidPlacement(sudokuPuzzle, r, c, i)) {
                    sudokuPuzzle[r][c] = i;
                    previousSolvedCells.push({
                      row: r,
                      column: c
                    });
                    numberToContinue = undefined;
                    continue;
                  }
                }
              }
            } else {
              continue;
            }
          } else if (!numberToContinue) {
            for (let i = 1; i <= 9; i++) {
              if (isValidPlacement(sudokuPuzzle, r, c, i)) {
                sudokuPuzzle[r][c] = i;
                previousSolvedCells.push({
                  row: r,
                  column: c
                });
                numberToContinue = undefined;
                break;
              }
            }
            if (sudokuPuzzle[r][c] == 0) {
              let lastIndex = previousSolvedCells.pop();
              numberToContinue = sudokuPuzzle[lastIndex.row][lastIndex.column];
              numberToContinue++;
              sudokuPuzzle[lastIndex.row][lastIndex.column] = 0;
              r = lastIndex.row;
              c = lastIndex.column - 1;
              continue;
            }
          }
        }
      }
    }
    return sudokuPuzzle;
  }

  //checks to see if valid placement on solve
  function isValidPlacement(sudokoBoard, row, col, number) {
    for (let i = 0; i < 9; i++) {
      var m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      var n = 3 * Math.floor(col / 3) + (i % 3);
      if (
        sudokoBoard[row][i] == number ||
        sudokoBoard[i][col] == number ||
        sudokoBoard[m][n] == number
      ) {
        return false;
      }
    }
    return true;
  }

  function copyBoard(board) {
    let board_to_return = [];
    for (let i = 0; i < 9; i++) {
      board_to_return[i] = board[i].slice();
    }
    return board_to_return;
  }

  //checks to see if puzzle matches original...
  function checkIfSolvedCorrectly(puzzleToSolve, solvedPuzzle) {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (puzzleToSolve[r][c] != solvedPuzzle[r][c]) {
          //   console.log("is not solved!");
          //   console.log("r: " + r);
          //   console.log("c: " + c);
          return false;
        }
      }
    }
    return true;
  }

  //vvv code and puzzle to check if solver was working vvv

  // this.new_game("expert", function (game_obj) {
  //   console.log(game_obj);
  // });

  //testing solver...
  //   let finished_board = [
  //     [9, 6, 2, 4, 7, 5, 3, 8, 1],
  //     [7, 4, 3, 1, 8, 6, 2, 5, 9],
  //     [1, 8, 5, 3, 2, 9, 7, 6, 4],
  //     [6, 1, 7, 2, 9, 8, 4, 3, 5],
  //     [5, 3, 9, 7, 1, 4, 8, 2, 6],
  //     [8, 2, 4, 6, 5, 3, 9, 1, 7],
  //     [2, 9, 1, 8, 6, 7, 5, 4, 3],
  //     [4, 5, 8, 9, 3, 1, 6, 7, 2],
  //     [3, 7, 6, 5, 4, 2, 1, 9, 8]
  //   ];

  //   let board_to_solve = [
  //     [9, 0, 2, 4, 7, 0, 3, 0, 1],
  //     [0, 4, 0, 1, 8, 6, 2, 0, 9],
  //     [1, 0, 0, 3, 2, 0, 0, 6, 4],
  //     [6, 1, 7, 2, 9, 8, 0, 0, 5],
  //     [5, 3, 9, 7, 1, 0, 8, 2, 6],
  //     [8, 0, 0, 6, 5, 3, 9, 1, 7],
  //     [2, 9, 0, 0, 6, 7, 0, 0, 3],
  //     [4, 0, 8, 9, 3, 1, 0, 7, 0],
  //     [3, 0, 6, 0, 4, 2, 1, 0, 8]
  //   ];
  //   console.log(sudokuSolver(board_to_solve));
  //   checkIfSolvedCorrectly(board_to_solve, finished_board);
})();
