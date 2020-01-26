var ChatTile = document.getElementsByClassName('ChatFlipper')[0];
var SudokuTile = document.getElementsByClassName('SudokuFlipper')[0];
var PincodeTile = document.getElementsByClassName('PincodeFlipper')[0];
var chatInfoButton = document.getElementById('ChatTileInfoButton');
var chatTileFront = document.getElementById('ChatTileFront');
var chatTileBack = document.getElementById('ChatTileBack');
var sudokuInfoButton = document.getElementById('SudokuTileInfoButton');
var sudokuTileFront = document.getElementById('SudokuTileFront');
var sudokuTileBack = document.getElementById('SudokuTileBack');
var pincodeInfoButton = document.getElementById('PincodeTileInfoButton');
var pincodeTileFront = document.getElementById('PincodeTileFront');
var pincodeTileBack = document.getElementById('PincodeTileBack');

var chatTileFlipped = false;
var sudokuTileFlipped = false;
var pincodeTileFlipped = false;


chatInfoButton.addEventListener('click', flipChatTile);

function flipChatTile() {
    if (!chatTileFlipped) {
        ChatTile.classList.add('FlipTile');
        chatTileFlipped = true;
        chatInfoButton.classList.add('infoClicked');
        let rotateTransition = setTimeout(function () {
            chatTileFront.classList.add('tileHidden');
            chatTileBack.classList.remove('tileHidden');
        }, 150);
    } else {
        ChatTile.classList.remove('FlipTile');
        chatTileFlipped = false;
        chatInfoButton.classList.remove('infoClicked');
        let rotateTransition = setTimeout(function () {
            chatTileBack.classList.add('tileHidden');
            chatTileFront.classList.remove('tileHidden');
        }, 150);
    }
}

sudokuInfoButton.addEventListener('click', flipSudokuTile);


function flipSudokuTile() {
    if (!sudokuTileFlipped) {
        SudokuTile.classList.add('FlipTile');
        sudokuTileFlipped = true;
        sudokuInfoButton.classList.add('infoClicked');
        let rotateTransition = setTimeout(function () {
            sudokuTileFront.classList.add('tileHidden');
            sudokuTileBack.classList.remove('tileHidden');
        }, 150);
    } else {
        SudokuTile.classList.remove('FlipTile');
        sudokuTileFlipped = false;
        sudokuInfoButton.classList.remove('infoClicked');
        let rotateTransition = setTimeout(function () {
            sudokuTileBack.classList.add('tileHidden');
            sudokuTileFront.classList.remove('tileHidden');
        }, 150);
    }
}

pincodeInfoButton.addEventListener('click', flipPincodeTile);

function flipPincodeTile() {
    if (!pincodeTileFlipped) {
        PincodeTile.classList.add('FlipTile');
        pincodeTileFlipped = true;
        pincodeInfoButton.classList.add('infoClicked');
        let rotateTransition = setTimeout(function () {
            pincodeTileFront.classList.add('tileHidden');
            pincodeTileBack.classList.remove('tileHidden');
        }, 150);
    } else {
        PincodeTile.classList.remove('FlipTile');
        pincodeTileFlipped = false;
        pincodeInfoButton.classList.remove('infoClicked');
        let rotateTransition = setTimeout(function () {
            pincodeTileBack.classList.add('tileHidden');
            pincodeTileFront.classList.remove('tileHidden');
        }, 150);
    }
}