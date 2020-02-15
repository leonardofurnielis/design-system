window.onload = function() {
  ("use strict");
  document.addEventListener("click", navbarToggleListener);
  document.addEventListener("click", navbarHideListener);
  document.addEventListener("click", accordionToggleListener);
};

function navbarToggleListener(event) {
  const nav = document.querySelector("#global-navbar");
  const body = document.querySelector("body");
  const element = event.target;

  if (
    element.classList.contains("navbar-menu-icon") ||
    element.classList.contains("navbar-menu")
  ) {
    nav.classList.toggle("navbar-show");
    body.classList.toggle("navbar-body-show");
  }
}

function navbarHideListener(event) {
  const nav = document.querySelector("#global-navbar");
  const body = document.querySelector("body");

  const element = event.target;
  if (element.classList.contains("navbar-link")) {
    nav.classList.toggle("navbar-show");
    body.classList.remove("navbar-show");
  }
}

function accordionToggleListener(event) {
  const element = event.target;
  if (element.parentElement.classList.contains("accordion")) {
    const accordion = element.parentElement.getElementsByClassName(
      "accordion-content"
    )[0];

    const accordionIcon = element.parentElement.getElementsByClassName(
      "accordion-icon"
    )[0];
    if (accordionIcon.innerHTML.trim() === "keyboard_arrow_down") {
      accordionIcon.innerHTML = "keyboard_arrow_up";
    } else {
      accordionIcon.innerHTML = "keyboard_arrow_down";
    }

    accordion.classList.toggle("accordion-show");
  }
}
