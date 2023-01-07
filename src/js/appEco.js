import { relativeCoords } from "./utils/helpers";

export function initAppEco() {
  const wrappers = document.querySelectorAll(".js-app-link-wrapper");
  if (!wrappers) {
    return;
  }
  const CIRCLE_COEFFICIENT = 8;
  const ICON_COEFFICIENT = 5;

  wrappers.forEach(function (wrapper) {
    const circle = wrapper.querySelector(".js-app-link-circle");
    const icon = wrapper.querySelector(".js-app-link-icon");

    const halfWrapperWidth = wrapper.offsetWidth / 2;

    wrapper.addEventListener("mouseenter", function (event) {
      wrapper.classList.add("appEco__linkWrapper--entered");

      setTimeout(() => {
        wrapper.classList.remove("appEco__linkWrapper--entered");
      }, 200);
    });

    wrapper.addEventListener("mousemove", function (event) {
      const { x, y } = relativeCoords(event);

      const posX = halfWrapperWidth - x;
      const posY = halfWrapperWidth - y;

      circle.style.transform = `translate(${-posX / CIRCLE_COEFFICIENT}px, ${
        -posY / CIRCLE_COEFFICIENT
      }px) scale(1.05)`;
      icon.style.transform = `translate(${-posX / ICON_COEFFICIENT}px, ${
        -posY / ICON_COEFFICIENT
      }px)`;
    });

    wrapper.addEventListener("mouseleave", function (event) {
      circle.removeAttribute("style");
      icon.removeAttribute("style");
    });
  });
}
