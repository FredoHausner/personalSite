var pageLink = document.getElementsByClassName('menuToggle')[0];
var projectMain = document.getElementById("ProjectMain");
var aboutMain = document.getElementById("AboutMain");
var emailInput = document.getElementById("EmailInput");
var contentInput = document.getElementById("ContentInput");

pageLink.addEventListener('click', showAbout);

function showProjects() {
  projectMain.classList.remove("inactive");
  aboutMain.classList.add("inactive");
  // pageLink.classList.remove('SamplesButton');
  // pageLink.classList.add('AboutButton');
  pageLink.removeEventListener('click', showProjects);
  pageLink.addEventListener('click', showAbout);
  pageLink.innerHTML = "ABOUT"
}

function showAbout() {
  aboutMain.classList.remove("inactive");
  projectMain.classList.add("inactive");
  // pageLink.classList.remove('AboutButton');
  // pageLink.classList.add('SamplesButton');
  pageLink.removeEventListener('click', showAbout);
  pageLink.addEventListener('click', showProjects);
  pageLink.innerHTML = "SAMPLES"
}

///contact form vvv

var emailInput = document.getElementById("EmailInput");
var contentInput = document.getElementById("ContentInput");
var emailHeader = document.getElementsByClassName("emailVisual")[0];
var contentHeader = document.getElementsByClassName("contentVisual")[0];
var SubmitFormButton = document.getElementById("SubmitFormButton");

emailInput.addEventListener("focus", function () {
  emailHeader.classList.add("emailBoxFilled");
});

emailInput.addEventListener("focusout", function () {
  if (!emailInput.value.replace(/\s/g, "").length) {
    emailHeader.classList.remove("emailBoxFilled");
  }
});

contentInput.addEventListener("focus", function () {
  contentHeader.classList.add("contentBoxFilled");
});

contentInput.addEventListener("focusout", function () {
  if (!contentInput.value.replace(/\s/g, "").length) {
    contentHeader.classList.remove("contentBoxFilled");
  }
});

SubmitFormButton.addEventListener("click", function () {
  let user_email = emailInput.value;
  let user_body = contentInput.value;

  if (
    user_email.replace(/\s/g, "").length &&
    user_body.replace(/\s/g, "").length
  ) {
    let data = {
      userEmail: user_email,
      userContent: user_body
    };
    $.post("/send_email", data, function (res, err) { });

    emailInput.value = "";
    contentInput.value = "";
    emailHeader.classList.remove("emailBoxFilled");
    contentHeader.classList.remove("contentBoxFilled");
  }
});
