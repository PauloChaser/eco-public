import { SlideToggle } from "./classes/SlideToggle";
import { isWindowSizeSmallerThen } from "./utils/helpers";

export function initFooter() {
  const footerToggles = document.querySelectorAll(".js-footer-slide");

  footerToggles.forEach((spoiler) => {
    const SpoilerElement = new SlideToggle(
      spoiler.dataset.container,
      "footer__links--active"
    );
    spoiler.addEventListener("click", function () {
      if (!isWindowSizeSmallerThen()) {
        return;
      }

      spoiler.classList.toggle("footer__columnTitle--active");
      SpoilerElement.toggle();
    });
  });
}
