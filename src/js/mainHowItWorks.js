import { isWindowSizeSmallerThen } from "./utils/helpers";
import SimpleBar from "simplebar";

export function initMainHowItWorks() {
  const howItWorkScrollBar = document.querySelector(".js-how-it-works");

  if (!isWindowSizeSmallerThen(1021) || !howItWorkScrollBar) {
    return;
  }

  new SimpleBar(howItWorkScrollBar, {
    classNames: {
      content: "simplebar-content",
      scrollContent: "simplebar-scroll-content",
      scrollbar: "simplebar-scrollbar",
      track: "simplebar-track",
    },
  });
}
