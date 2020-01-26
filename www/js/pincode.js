const pincodeButton = document.getElementsByClassName("pincodeButton");
var pincodeNumber = newPincode();
const pincodeDot = document.getElementsByClassName("pincodeDot");
const deletePincode = document.getElementById("DeletePincode");
const pincodeDotsContainer = document.getElementById("PincodeDotsContainer");
var pincodeTried = "";

function newPincode() {
  let pincodeToReturn = "";
  for (let i = 0; i < 4; i++) {
    pincodeToReturn += Math.floor(Math.random() * 10);
  }
  return pincodeToReturn;
}

function addEventListenerToButtons() {
  for (let i = 0; i < pincodeButton.length; i++) {
    pincodeButton[i].addEventListener("click", tryPincode);
  }
}

function tryPincode() {
  pincodeTried += this.getAttribute("data-val");
  pincodeDot[pincodeTried.length - 1].classList.add("filledPin");
  if (pincodeTried.length == 4) {
    checkPincode();
    removeEventListenerFromDeleteButton();
  }
}

function updatePincode() {
  pincodeNumber = newPincode();
  document.getElementById("CodeContainer").innerHTML = pincodeNumber;
  pincodeTried = "";
  for (let i = 0; i < 4; i++) {
    pincodeDot[i].classList.remove("filledPin");
  }
  addEventListenerToDeleteButton();
}

function checkPincode() {
  for (let i = 0; i < pincodeButton.length; i++) {
    pincodeButton[i].removeEventListener("click", tryPincode);
  }
  if (pincodeTried == pincodeNumber) {
    setTimeout(function() {
      updatePincode();
    }, 600);
  } else {
    setTimeout(function() {
      pincodeDotsContainer.classList.add("wrongPinCode");
      setTimeout(function() {
        pincodeDotsContainer.classList.remove("wrongPinCode");
        updatePincode();
      }, 500);
    }, 300);
  }

  setTimeout(addEventListenerToButtons(), 700);
}

function addEventListenerToDeleteButton() {
  deletePincode.addEventListener("click", deleteNumber);
}
function removeEventListenerFromDeleteButton() {
  deletePincode.removeEventListener("click", deleteNumber);
}

function deleteNumber() {
  if (pincodeTried.length != 0) {
    pincodeDot[pincodeTried.length - 1].classList.remove("filledPin");
  }
  pincodeTried = pincodeTried.slice(0, -1);
}

updatePincode();
addEventListenerToButtons();
addEventListenerToDeleteButton();
