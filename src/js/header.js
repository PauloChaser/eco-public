import { Body } from "./classes/Body";

export function initHeader() {
  const burgerOpen = document.querySelector(".js-burger");
  const burgerClose = document.querySelector(".js-main-menu-close");
  const headerMenu = document.querySelector(".js-main-menu");

  if (!burgerOpen || !burgerClose || !headerMenu) {
    return;
  }

  burgerOpen.addEventListener("click", function () {
    headerMenu.classList.add("mainMenu--active");

    Body.toggleBody();
  });

  burgerClose.addEventListener("click", function () {
    headerMenu.classList.remove("mainMenu--active");

    Body.toggleBody();
  });
}
