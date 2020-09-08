window.onload = function () {
  ("use strict");
  document.addEventListener("click", navbarToggleListener);
  document.addEventListener("click", navbarHideListener);
  document.addEventListener("click", accordionToggleListener);
  document.addEventListener("click", sidenavToggleListener);
  document.addEventListener("click", menuToggleListener);
  document.addEventListener("click", menuHideListener);
  document.addEventListener("click", listGroupSelectionListener);
  document.addEventListener("click", tabHandlerListener);
};

function sidenavToggleListener(event) {
  const element = event.target;

  if (
    (element.classList.contains("navbar-menu-icon") ||
      element.classList.contains("navbar-menu")) &&
    (element.id === "sidenav-menu" ||
      element.parentElement.id === "sidenav-menu")
  ) {
    const nav = document.querySelector("#global-sidenav");
    const menuIcon = document.querySelector("#sidenav-menu");

    nav.classList.toggle("show");
    menuIcon.getElementsByClassName("one")[0].classList.toggle("show");
    menuIcon.getElementsByClassName("two")[0].classList.toggle("show");
  }
}

function navbarToggleListener(event) {
  const element = event.target;

  if (
    (element.classList.contains("navbar-menu-icon") ||
      element.classList.contains("navbar-menu")) &&
    (element.id === "navbar-menu" || element.parentElement.id === "navbar-menu")
  ) {
    const nav = document.querySelector("#global-navbar");
    const menuIcon = document.querySelector("#navbar-menu");
    const body = document.querySelector("body");

    menuIcon.getElementsByClassName("one")[0].classList.toggle("show");
    menuIcon.getElementsByClassName("two")[0].classList.toggle("show");
    nav.classList.toggle("show");
    body.classList.toggle("show");
  }
}

function navbarHideListener(event) {
  const element = event.target;

  if (element.classList.contains("navbar-link")) {
    const nav = document.querySelector("#global-navbar");
    const menuIcon = document.querySelector("#navbar-menu");

    if (menuIcon) {
      nav.classList.remove("show");
      menuIcon.getElementsByClassName("one")[0].classList.remove("show");
      menuIcon.getElementsByClassName("two")[0].classList.remove("show");
    }
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

    accordion.classList.toggle("show");
  }
}

function menuToggleListener(event) {
  const element = event.target;

  if (element.parentElement.classList.contains("menu")) {
    const menus = document.querySelectorAll(".menu-menu.show");
    const menu = element.parentElement.getElementsByClassName(
      "menu-menu"
    )[0];

    menu.classList.toggle("show");
    menus.forEach((menu) => {
      menu.classList.remove("show");
    });
  }
}

function menuHideListener(event) {
  const element = event.target;
  const menus = document.querySelectorAll(".menu-menu.show");

  if (
    !element.parentElement.classList.contains("menu") &&
    menus.length > 0
  ) {
    menus.forEach((menu) => {
      menu.classList.remove("show");
    });
  }
}

function listGroupSelectionListener(event) {
  const element = event.target;
  if (element.parentElement.classList.contains("list-group-selection")) {
    const listItens = element.parentElement.querySelectorAll(
      ".list-group-item.active"
    );

    listItens.forEach((listItem) => {
      listItem.classList.remove("active");
    });

    element.classList.toggle("active");
  }
}

function tabHandlerListener(event) {
  const element = event.target;
  if (element.parentElement.classList.contains("tab")) {
    const tabParent = element.parentElement;
    const ariaControl = element.attributes["aria-controls"].value;

    const tabContent = document.querySelectorAll(
      "#" + tabParent.id + ".tab-content"
    )[0];

    tabParent.childNodes.forEach((el) => {
      if (el.classList) {
        el.classList.remove("active");
      }
    });
    tabContent.childNodes.forEach((el) => {
      if (el.classList) {
        el.classList.remove("show");
      }
    });

    tabContent.querySelector("#" + ariaControl).classList.add("show");
    element.classList.add("active");
  }
}
