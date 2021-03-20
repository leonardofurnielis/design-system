window.onload = function () {
  ("use strict");
  // Navbar
  document.addEventListener("click", navbarToggleListener);
  document.addEventListener("click", navbarHideListener);
  // Sidenav
  document.addEventListener("click", sidenavToggleListener);
  // Accordion
  document.addEventListener("click", accordionToggleListener);
  // Menu
  document.addEventListener("click", menuToggleListener);
  document.addEventListener("click", menuHideListener);
  // List
  document.addEventListener("click", listSelectionListener);
  // Tab
  document.addEventListener("click", tabHandlerListener);
  // Carousel
  document.addEventListener("click", carouselNextPrevListener);
  document.addEventListener("click", carouselIndicatorsListener);

  carouselInit(1);
};

// Navbar
function navbarToggleListener(event) {
  const element = event.target;
  if (
    (element.classList.contains("navbar-menu-icon") ||
      element.classList.contains("navbar-menu")) &&
    (element.id === "global-navbar-menu" ||
      element.parentElement.id === "global-navbar-menu")
  ) {
    const nav = document.querySelector("#global-navbar");
    const menuIcon = document.querySelector("#global-navbar-menu");
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
    const menuIcon = document.querySelector("#global-navbar-menu");

    if (menuIcon) {
      nav.classList.remove("show");
      menuIcon.getElementsByClassName("one")[0].classList.remove("show");
      menuIcon.getElementsByClassName("two")[0].classList.remove("show");
    }
  }
}

// Sidenav
function sidenavToggleListener(event) {
  const element = event.target;

  if (
    (element.classList.contains("navbar-menu-icon") ||
      element.classList.contains("navbar-menu")) &&
    (element.id === "bd-sidebar-menu" ||
      element.parentElement.id === "bd-sidebar-menu")
  ) {
    const nav = document.querySelector("#global-bd-sidebar");
    const menuIcon = document.querySelector("#bd-sidebar-menu");

    nav.classList.toggle("show");
    menuIcon.getElementsByClassName("one")[0].classList.toggle("show");
    menuIcon.getElementsByClassName("two")[0].classList.toggle("show");
  }
}

// Accordion
function accordionToggleListener(event) {
  const element = event.target;
  if (
    element.parentElement &&
    element.parentElement.classList.contains("accordion")
  ) {
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
// Menu
function menuToggleListener(event) {
  const element = event.target;

  if (
    element.parentElement &&
    element.parentElement.classList.contains("menu")
  ) {
    const menus = document.querySelectorAll(".menu-menu.show");
    const menu = element.parentElement.getElementsByClassName("menu-menu")[0];

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
    element.parentElement &&
    !element.parentElement.classList.contains("menu") &&
    menus.length > 0
  ) {
    menus.forEach((menu) => {
      menu.classList.remove("show");
    });
  }
}

// List
function listSelectionListener(event) {
  const element = event.target;
  if (
    element.parentElement &&
    element.parentElement.classList.contains("list-group-selection")
  ) {
    const listItems = element.parentElement.querySelectorAll(
      ".list-group-item.active"
    );

    listItems.forEach((listItem) => {
      listItem.classList.remove("active");
    });

    element.classList.toggle("active");
  }
}

// Tab
function tabHandlerListener(event) {
  const element = event.target;
  if (
    element.parentElement &&
    element.parentElement.classList.contains("tab")
  ) {
    const tabParent = element.parentElement;
    const ariaControl = element.attributes["aria-control"].value;

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

// Carousel
const CAROUSEL_INDEX = {};
let CAROUSEL_INTERVAL;
function carouselInit(n) {
  let i;

  const carousel = document.getElementsByClassName("carousel");
  for (let c = 0; c < carousel.length; c++) {
    if (!CAROUSEL_INDEX[carousel[c].id]) {
      CAROUSEL_INDEX[carousel[c].id] = 1;
    }
    clearTimeout(CAROUSEL_INTERVAL);
    carouselInterval(carousel[c]);
    const slides = carousel[c].getElementsByClassName("carousel-item");
    const indicators = carousel[c].getElementsByClassName(
      "carousel-indicators-item"
    );

    if (n > slides.length) {
      CAROUSEL_INDEX[carousel[c].id] = 1;
    }

    if (n < 1) {
      CAROUSEL_INDEX[carousel[c].id] = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < indicators.length; i++) {
      indicators[i].className = indicators[i].className.replace(" active", "");
    }

    indicators[CAROUSEL_INDEX[carousel[c].id] - 1].className += " active";
    slides[CAROUSEL_INDEX[carousel[c].id] - 1].style.display = "block";
  }
}
// Carousel control next/previous controls
function carouselNextPrevListener(event) {
  const element = event.target;
  if (
    element.parentElement &&
    element.parentElement.parentElement &&
    element.parentElement.parentElement.classList.contains("carousel") &&
    (element.classList.contains("carousel-control-next-icon") ||
      element.classList.contains("carousel-control-prev-icon"))
  ) {
    const carousel = element.parentElement.parentElement;

    if (element.classList.contains("carousel-control-next-icon")) {
      carouselInit((CAROUSEL_INDEX[carousel.id] += 1));
    } else {
      carouselInit((CAROUSEL_INDEX[carousel.id] += -1));
    }
  }
}
// Carousel thumbnail controls
function carouselIndicatorsListener(event) {
  const element = event.target;
  if (
    element.parentElement &&
    element.parentElement.classList.contains("carousel-indicators")
  ) {
    const carousel = element.parentElement.parentElement;

    carouselInit(
      (CAROUSEL_INDEX[carousel.id] = Number(
        element.attributes["data-slide-to"].value
      ))
    );
  }
}

function carouselInterval(element) {
  const interval = element.attributes["data-interval"]
    ? element.attributes["data-interval"]
    : 5000;
  CAROUSEL_INTERVAL = setTimeout(() => {
    const event = {
      target: element.getElementsByClassName("carousel-control-next-icon")[0],
    };
    carouselNextPrevListener(event);
  }, interval);
}
