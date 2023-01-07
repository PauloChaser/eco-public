import { SlideToggle } from "./classes/SlideToggle";

export function initFaq() {
  const itemsWrapper = document.querySelector(".js-items-wrapper");

  if (!itemsWrapper) {
    return;
  }

  itemsWrapper.addEventListener("click", function (event) {
    const target = event.target;
    const item = target.closest(".faq__itemContentUnitQuestion");
    const btn = item?.querySelector(".faq__itemContentUnitOpenBtn");

    if (!item) {
      return;
    }

    const SpoilerElement = new SlideToggle(
      item.dataset.container,
      "faq__itemContentUnitAnswer--active"
    );

    item.classList.toggle("faq__itemContentUnitQuestion--active");
    btn.classList.toggle("roundButton--whiteActive");
    SpoilerElement.toggle();
  });
}
