import Swiper from "swiper/bundle";
import { SlideToggle } from "./classes/SlideToggle";
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "swiped-events";
import { isWindowSizeSmallerThen } from "./utils/helpers";

const functionalLinks = document.querySelector(".js-functional-links");
const subLinks = document.querySelectorAll(".js-func-sub-link");
const topLinks = document.querySelectorAll(".js-func-top-link");
const nextItemButton = document.querySelector(".js-next-item");
const functionalItems = document.querySelectorAll(".js-functional-item");

let moveFlag = false;
let timeout = null;

export function initFunctionalEco() {
  if (!functionalLinks) {
    return;
  }

  ecoSwiper();
  changeListItem();
  scrollToItems();
  zoomItems();
  mobileNavBar();
  itemsObserver();

  if (nextItemButton) {
    nextItemButton.addEventListener("click", function () {
      const currentLinkIndex = [...subLinks].findIndex((item) =>
        item.classList.contains("functional__pointSublistItemLink--active")
      );

      subLinks[currentLinkIndex + 1].click();
    });
  }
}

function mobileNavBar() {
  document.addEventListener("swiped", function ({ target, detail }) {
    const navBar = target.closest(".js-nav-bar");
    if (!navBar || !isWindowSizeSmallerThen(601)) {
      return;
    }

    const direction = detail.dir;

    switch (direction) {
      case "up": {
        navBar.classList.add("functional__leftSide--expanded");

        topLinks.forEach((topLink) => {
          if (topLink.classList.contains("functional__pointLink--active")) {
            const hisSublist =
              topLink.nextElementSibling.classList.contains("js-sublist") &&
              topLink.nextElementSibling;

            if (hisSublist) {
              hisSublist.removeAttribute("style");
              hisSublist.style.height = hisSublist.clientHeight + "px";
            }
          }
        });
        break;
      }

      case "down": {
        navBar.classList.remove("functional__leftSide--expanded");
        break;
      }

      default:
        return;
    }
  });
}

function ecoSwiper() {
  if (!functionalItems) {
    return;
  }

  functionalItems.forEach(function (functionalItem) {
    const swiper = functionalItem.querySelector(".js-functional-slider");
    const arrowPrev = functionalItem.querySelector(
      ".js-functional-slider-prev"
    );
    const arrowNext = functionalItem.querySelector(
      ".js-functional-slider-next"
    );

    const swiperOptions = {
      slidesPerView: "auto",
      spaceBetween: 0,
      loop: true,

      breakpoints: {
        1022: {
          spaceBetween: 40,
        },
      },
    };

    if (arrowPrev && arrowNext) {
      swiperOptions.navigation = {
        nextEl: arrowNext,
        prevEl: arrowPrev,
      };
    }

    new Swiper(swiper, swiperOptions);
  });
}

function changeListItem() {
  topLinks.forEach(function (topLink) {
    topLink.slide = new SlideToggle(
      topLink.dataset.container,
      "functional__pointSublist--active"
    );
    const hisSublist =
      topLink.nextElementSibling.classList.contains("js-sublist") &&
      topLink.nextElementSibling;

    topLink.addEventListener("click", function () {
      const currentLink = topLink;

      topLinks.forEach(function (topLink) {
        if (
          topLink.classList.contains("functional__pointLink--active") &&
          !topLink.isEqualNode(currentLink)
        ) {
          topLink.classList.remove("functional__pointLink--active");
          topLink.slide.toggle();
        }
      });

      if (currentLink.classList.contains("functional__pointLink--active")) {
        return;
      } else {
        currentLink.classList.toggle("functional__pointLink--active");
        currentLink.slide.toggle();
      }

      if (hisSublist) {
        const firstSubLink = hisSublist.querySelector(".js-func-sub-link");

        firstSubLink.classList.add("functional__pointSublistItemLink--active");
      }
    });
  });

  if (!functionalLinks) {
    return;
  }

  functionalLinks.addEventListener("click", function (e) {
    const currentSubLink = e.target.closest(".js-func-sub-link");

    if (!currentSubLink) {
      return;
    }

    subLinks.forEach(function (subLink) {
      subLink.classList.toggle(
        "functional__pointSublistItemLink--active",
        subLink.isEqualNode(currentSubLink)
      );
    });
  });
}

function scrollToItems() {
  if (!functionalLinks) {
    return;
  }

  [...subLinks, ...topLinks].forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      if (moveFlag) {
        return;
      }

      const id = link.getAttribute("href");

      if (!id.includes("#") || id.length < 2) {
        return;
      }

      const element = document.querySelector(id);

      if (!element) {
        return;
      }

      window.scrollTo({
        behavior: "smooth",
        top: element.getBoundingClientRect().top + window.scrollY - 15,
      });
    });
  });
}

function zoomItems() {
  const galleries = document.querySelectorAll(".js-open-gallery");

  if (!galleries) {
    return;
  }

  galleries.forEach(function (gallery) {
    lightGallery(gallery, {
      plugins: [lgZoom, lgThumbnail],
      speed: 500,
      thumbnail: false,
      download: false,
      zoom: true,
      counter: false,
    });
  });
}

export function itemsObserver() {
  const elementsMap = [...functionalItems].reduce((acc, item) => {
    const link = [...subLinks].find(
      (link) => link.getAttribute("href") === "#" + item.id
    );

    if (link) {
      acc[item.id] = link;
    }

    return acc;
  }, {});

  window.addEventListener("scroll", function () {
    const thirdWindowHeight = window.innerHeight / 3;
    const windowScroll = window.scrollY;

    functionalItems.forEach((item, index) => {
      const currentSubLink = elementsMap[item.id];
      const offsetTop = item.getBoundingClientRect().top;
      const isCurrentItemInArea =
        offsetTop < thirdWindowHeight &&
        offsetTop + item.clientHeight > thirdWindowHeight;

      currentSubLink.classList.toggle(
        "functional__pointSublistItemLink--active",
        isCurrentItemInArea
      );

      if (isCurrentItemInArea) {
        const currentTopLink = currentSubLink
          .closest(".functional__point")
          .querySelector(".functional__pointLink");

        if (
          !currentTopLink.classList.contains("functional__pointLink--active")
        ) {
          moveFlag = true;
          clearTimeout(timeout);

          timeout = setTimeout(() => {
            moveFlag = false;
          }, 600);

          currentTopLink.click();
        }
      }
    });

    if (windowScroll < functionalItems[0].getBoundingClientRect().top + 50) {
      // выделяем первый
      subLinks[0].classList.add("functional__pointSublistItemLink--active");
    }

    if (
      functionalItems[historyItems.length - 1].getBoundingClientRect().top <
      -functionalItems[historyItems.length - 1].clientHeight * 0.7
    ) {
      // выделяем последний
      subLinks[subLinks.length - 1].classList.add(
        "functional__pointSublistItemLink--active"
      );
    }
  });
}
