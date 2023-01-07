import Swiper from "swiper/bundle";

const breakpoint = window.matchMedia("(max-width: 980px)");

export function iniMainIntellectual() {
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
}

function initSwiper() {
  new Swiper(".js-intellectual-slider", {
    slidesPerView: 1,

    effect: "fade",
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    centeredSlides: true,
    centeredSlidesBounds: true,

    navigation: {
      nextEl: ".js-intellectual-slider-next",
      prevEl: ".js-intellectual-slider-prev",
    },
    runCallbacksOnInit: true,
  });

  new Swiper(".js-swiper-data", {
    slidesPerView: 1,
    effect: "fade",
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".js-intellectual-slider-next",
      prevEl: ".js-intellectual-slider-prev",
    },
  });

  new Swiper(".js-swiper-control", {
    slidesPerView: 1,
    effect: "fade",
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".js-intellectual-slider-next",
      prevEl: ".js-intellectual-slider-prev",
    },
  });

  new Swiper(".js-swiper-multi", {
    slidesPerView: 1,
    effect: "fade",
    loop: true,
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".js-intellectual-slider-next",
      prevEl: ".js-intellectual-slider-prev",
    },
  });
}

const breakpointChecker = function () {
  if (breakpoint.matches === true) {
    return initSwiper();
  }
};
