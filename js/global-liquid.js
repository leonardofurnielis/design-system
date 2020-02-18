window.onload = function() {
  ("use strict");
  document.addEventListener("click", navbarToggleListener);
  document.addEventListener("click", navbarHideListener);
  document.addEventListener("click", accordionToggleListener);
  document.addEventListener("click", sidenavToggleListener);
  document.addEventListener("click", dropdownToggleListener);
  document.addEventListener("click", dropdownHideListener);
};

function sidenavToggleListener(event) {
  const nav = document.querySelector("#global-sidenav");
  const body = document.querySelector("body");
  const element = event.target;
  if (
    (element.classList.contains("navbar-menu-icon") ||
      element.classList.contains("navbar-menu")) &&
    element.id === "sidenav-menu"
  ) {
    nav.classList.toggle("sidenav-show");
    body.classList.toggle("navbar-body-show");
  }
}

function navbarToggleListener(event) {
  const nav = document.querySelector("#global-navbar");
  const body = document.querySelector("body");
  const element = event.target;

  if (
    (element.classList.contains("navbar-menu-icon") ||
      element.classList.contains("navbar-menu")) &&
    element.id === "navbar-menu"
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

function dropdownToggleListener(event) {
  const element = event.target;
  const dropdowns = document.querySelectorAll(".dropdown-menu-show");

  if (element.parentElement.classList.contains("dropdown")) {
    const dropdown = element.parentElement.getElementsByClassName(
      "dropdown-menu"
    )[0];
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove("dropdown-menu-show");
    });

    dropdown.classList.toggle("dropdown-menu-show");
  }
}

function dropdownHideListener(event) {
  const element = event.target;
  const dropdowns = document.querySelectorAll(".dropdown-menu-show");
  if (
    !element.parentElement.classList.contains("dropdown") &&
    dropdowns.length > 0
  ) {
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove("dropdown-menu-show");
    });
  }
}
