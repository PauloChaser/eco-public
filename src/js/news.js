import { isWindowSizeSmallerThen } from "./utils/helpers";
import { Body } from "./classes/Body";

import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";

export function initNews() {
  const newsItems = document.querySelector(".js-news-items");

  if (!newsItems) {
    return;
  }

  const newsItem = document.querySelector(".js-news-item");
  const closeNewsButton = newsItem.querySelectorAll(".js-news-item-close");
  const header = document.querySelector(".js-header-transparent");
  const overlay = document.querySelector(".js-overlay");

  newsItems.addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.target;
    if (target.closest(".js-news-open")) {
      newsItem.classList.add("newsItem--active");

      if (isWindowSizeSmallerThen(601)) {
        header.classList.add("header--transparent");
      }

      Body.fixBody();
      Body.toggleOverlay(true);
    }
  });

  closeNewsButton.forEach(function (button) {
    button.addEventListener("click", closeNewsItem);
  });

  overlay.addEventListener("click", closeNewsItem);

  function closeNewsItem() {
    newsItem.classList.remove("newsItem--active");
    header.classList.remove("header--transparent");

    Body.releaseBody();
    Body.toggleOverlay(false);
  }

  const imgWrapper = newsItem.querySelector(".js-news-item-img-wrapper");

  imgWrapper.addEventListener("mousewheel", function (e) {
    imgWrapper.classList.toggle("newsItem__imgWrapper--narrow", e.deltaY > 0);
  });

  const newsContent = newsItem.querySelector(".js-news-content");
  scrollNewsContent();

  function scrollNewsContent() {
    if (!newsContent) {
      return;
    }
    const simpleBar = new SimpleBar(
      document.querySelector(".js-news-content"),
      {
        classNames: {
          content: "simplebar-content",
          scrollContent: "simplebar-scroll-content",
          scrollbar: "simplebar-scrollbar",
          track: "simplebar-track",
        },
      }
    );

    simpleBar.getScrollElement().addEventListener("scroll", function () {
      const hasActiveClass = imgWrapper.classList.contains(
        "newsItem__imgWrapper--narrow"
      );

      imgWrapper.classList.toggle(
        "newsItem__imgWrapper--narrow",
        simpleBar.getScrollElement().scrollTop > 0
      );

      if (
        hasActiveClass !==
        imgWrapper.classList.contains("newsItem__imgWrapper--narrow")
      ) {
        simpleBar.recalculate();
      }
    });
  }
}
