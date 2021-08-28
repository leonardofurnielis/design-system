window.onload = function () {
  ("use strict");

  /**
   * ------------------------------------------------------------------------
   * Event Listeners
   * ------------------------------------------------------------------------
   */
  document.addEventListener("click", navbarToggleListener);
  document.addEventListener("click", navbarHideListener);

  document.addEventListener("click", sidenavToggleListener);

  document.addEventListener("click", accordionToggleListener);

  document.addEventListener("click", menuToggleListener);
  document.addEventListener("click", menuToggleHideListener);

  document.addEventListener("click", dropdownToggleListener);
  document.addEventListener("click", dropdownHideListener);

  document.addEventListener("click", listSelectionListener);

  document.addEventListener("click", tabHandlerListener);

  document.addEventListener("click", carouselNextPrevListener);
  document.addEventListener("click", carouselIndicatorsListener);

  document.addEventListener("click", toastAlertCloseListener);

  /**
   * ------------------------------------------------------------------------
   * Initializers
   * ------------------------------------------------------------------------
   */
  carouselOnInit(1, undefined);
  fileListener();

  /**
   * ------------------------------------------------------------------------
   * Observer
   * ------------------------------------------------------------------------
   */
  const observer = new MutationObserver(Observer);
  observer.observe(document.body, { childList: true, subtree: true });

  function Observer() {
    carouselOnInit(1, undefined);
    fileListener();
  }
};

/**
 * ------------------------------------------------------------------------
 * Navbar
 * ------------------------------------------------------------------------
 */
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

/**
 * ------------------------------------------------------------------------
 * Sidenav
 * ------------------------------------------------------------------------
 */
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

/**
 * ------------------------------------------------------------------------
 * Accordion
 * ------------------------------------------------------------------------
 */
function accordionToggleListener(event) {
  const element = event.target;
  if (
    element.parentElement &&
    element.parentElement.classList.contains("accordion-item")
  ) {
    const accordionContent =
      element.parentElement.getElementsByClassName("accordion-content")[0];

    const accordionIcon =
      element.parentElement.getElementsByClassName("accordion-icon")[0];
    if (accordionIcon.innerHTML.trim() === "keyboard_arrow_right") {
      accordionIcon.innerHTML = "keyboard_arrow_down";
    } else {
      accordionIcon.innerHTML = "keyboard_arrow_right";
    }

    element.classList.toggle("show");
    accordionContent.classList.toggle("show");
  }
}

/**
 * ------------------------------------------------------------------------
 * Menu Toggle
 * ------------------------------------------------------------------------
 */
 function menuToggleListener(event) {
  const element = event.target;

  if (
    element.parentElement &&
    element.parentElement.classList.contains("menu-toggle")
  ) {
    const menuToggleList = document.querySelectorAll(".menu-toggle-options.show");
    const menuToggle =
      element.parentElement.getElementsByClassName("menu-toggle-options")[0];

    if (menuToggle) {
      menuToggle.classList.toggle("show");
    }

    menuToggleList.forEach((menu) => {
      menu.classList.remove("show");
    });
  }
}

function menuToggleHideListener(event) {
  const element = event.target;
  const menuToggleList = document.querySelectorAll(".menu-toggle-options.show");

  if (
    (!element.parentElement ||
      !element.parentElement.classList.contains("menu-toggle")) &&
      menuToggleList.length > 0
  ) {
    menuToggleList.forEach((menuToggle) => {
      menuToggle.classList.remove("show");
    });
  }
}

/**
 * ------------------------------------------------------------------------
 * Dropdown
 * ------------------------------------------------------------------------
 */
function dropdownToggleListener(event) {
  const element = event.target;

  if (
    element.parentElement &&
    element.parentElement.classList.contains("dropdown")
  ) {
    const dropdownList = document.querySelectorAll(".dropdown-menu.show");
    const dropdown =
      element.parentElement.getElementsByClassName("dropdown-menu")[0];

    if (dropdown) {
      dropdown.classList.toggle("show");
    }

    dropdownList.forEach((menu) => {
      menu.classList.remove("show");
    });
  }
}

function dropdownHideListener(event) {
  const element = event.target;
  const dropdownList = document.querySelectorAll(".dropdown-menu.show");

  if (
    (!element.parentElement ||
      !element.parentElement.classList.contains("dropdown")) &&
    dropdownList.length > 0
  ) {
    dropdownList.forEach((dropdown) => {
      dropdown.classList.remove("show");
    });
  }
}

/**
 * ------------------------------------------------------------------------
 * List
 * ------------------------------------------------------------------------
 */
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

/**
 * ------------------------------------------------------------------------
 * Tab
 * ------------------------------------------------------------------------
 */
function tabHandlerListener(event) {
  const element = event.target;
  if (
    element.parentElement &&
    element.parentElement.classList.contains("tab")
  ) {
    const tabParent = element.parentElement;
    const ariaControl = element.attributes["aria-control"].value;

    const tabContent = document.querySelector(
      '[aria-label="mytab"].tab-content'
    );

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

/**
 * ------------------------------------------------------------------------
 * Carousel
 * ------------------------------------------------------------------------
 */
const CAROUSEL_INDEX = {};
let CAROUSEL_INTERVAL = {};

function carouselOnInit(n, element) {
  let i;

  const carousel = element || document.getElementsByClassName("carousel");

  for (let c = 0; c < carousel.length; c++) {
    if (!CAROUSEL_INDEX[carousel[c].id]) {
      CAROUSEL_INDEX[carousel[c].id] = 1;
    }

    clearTimeout(CAROUSEL_INTERVAL[carousel[c].id]);
    carouselInterval(carousel[c]);
    const slides = carousel[c].getElementsByClassName("carousel-item");
    const indicators = carousel[c].getElementsByClassName(
      "carousel-indicators-item"
    );

    if (slides.length > 1) {
      const next = carousel[c].getElementsByClassName(
        "carousel-control-next"
      )[0];
      const prev = carousel[c].getElementsByClassName(
        "carousel-control-prev"
      )[0];
      next.classList.add("show");
      prev.classList.add("show");
    }

    if (n > slides.length) {
      CAROUSEL_INDEX[carousel[c].id] = 1;
    }

    if (n < 1) {
      CAROUSEL_INDEX[carousel[c].id] = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    if (indicators && indicators.length > 0) {
      for (i = 0; i < indicators.length; i++) {
        indicators[i].className = indicators[i].className.replace(
          " active",
          ""
        );
      }
      indicators[CAROUSEL_INDEX[carousel[c].id] - 1].className += " active";
    }

    slides[CAROUSEL_INDEX[carousel[c].id] - 1].style.display = "block";
  }
}

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
      carouselOnInit((CAROUSEL_INDEX[carousel.id] += 1), [carousel]);
    } else {
      carouselOnInit((CAROUSEL_INDEX[carousel.id] += -1), [carousel]);
    }
  }
}

function carouselIndicatorsListener(event) {
  const element = event.target;
  if (
    element.parentElement &&
    element.parentElement.classList.contains("carousel-indicators")
  ) {
    const carousel = element.parentElement.parentElement;

    carouselOnInit(
      (CAROUSEL_INDEX[carousel.id] = Number(
        element.attributes["data-slide-to"].value
      ))
    );
  }
}

function carouselInterval(element) {
  const interval = element.attributes["data-interval"]
    ? element.attributes["data-interval"].value
    : 5000;

  if (interval !== "none") {
    CAROUSEL_INTERVAL[element.id] = setTimeout(() => {
      const event = {
        target: element.getElementsByClassName("carousel-control-next-icon")[0],
      };
      carouselNextPrevListener(event);
    }, interval);
  }
}

/**
 * ------------------------------------------------------------------------
 * File Uploader
 * ------------------------------------------------------------------------
 */

const FILE_LIST = {};
function fileListener() {
  const fileHiddenList = document.querySelectorAll(".file-visibility-hidden");

  fileHiddenList.forEach((element) => {
    const fileWrapper = element.parentElement;
    const fileSelectedContainer = fileWrapper.getElementsByClassName(
      "file-selected-container"
    )[0];
    element.addEventListener("change", function () {
      for (let t = 0; t < this.files.length; t++) {
        if (!FILE_LIST[element.id]) {
          FILE_LIST[element.id] = [];
        }

        if (
          !FILE_LIST[element.id].filter((f) => this.files[t].name === f.name)[0]
        ) {
          FILE_LIST[element.id].push(this.files[t]);

          const divEl = document.createElement("div");
          divEl.className = "file-selected-wrapper";
          divEl.id = this.files[t].name;

          const spanEl = document.createElement("span");
          spanEl.className = "file-selected-file";
          spanEl.textContent = this.files[t].name;

          const iconEl = document.createElement("span");
          iconEl.className = "material-icons";
          iconEl.classList.add("file-selected-icon");
          iconEl.textContent = "attach_file";

          const removeEl = document.createElement("span");
          removeEl.className = "material-icons";
          removeEl.addEventListener("click", fileRemoveListener);
          removeEl.classList.add("file-selected-close-icon");
          removeEl.textContent = "close";

          divEl.appendChild(iconEl);
          divEl.appendChild(spanEl);
          divEl.appendChild(removeEl);

          fileSelectedContainer.appendChild(divEl);
        }
      }
    });
  });
}

function fileRemoveListener(event) {
  const element = event.target;
  const parentElement = element.parentElement;
  const ariaControl =
    parentElement.parentElement.attributes["aria-control"].value;

  FILE_LIST[ariaControl] = FILE_LIST[ariaControl].filter(
    (f) => f.name !== parentElement.id
  );

  element.parentElement.remove();
}

/**
 * ------------------------------------------------------------------------
 * Toast & Alert & Tag Close
 * ------------------------------------------------------------------------
 */
function toastAlertCloseListener(event) {
  const element = event.target;

  if (
    element.classList.contains("alert-close-button") ||
    element.classList.contains("toast-close-button") ||
    element.classList.contains("tag-close")
  ) {
    element.parentElement.style.display = "none";
  }
}
