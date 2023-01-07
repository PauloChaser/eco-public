import Swiper from "swiper/bundle";

export function initMainBannerSlider() {
  const total = document.querySelector(".js-banner-slider-total");
  const current = document.querySelector(".js-banner-slider-current");
  const counter = document.querySelector(".js-banner-slider-counter");

  scrollEvents();

  const updateCounter = (swiper) => {
    if (!total || !current) {
      return;
    }

    counter.innerText = String(swiper.realIndex + 1).padStart(2, "0");
    total.innerText = String(swiper.slides.length - 2).padStart(2, "0");
    current.innerText = String(swiper.realIndex + 1).padStart(2, "0");
  };

  new Swiper(".js-banner-slider", {
    slidesPerView: 1,

    effect: "fade",
    loop: true,

    pagination: {
      el: ".js-banner-slider-progressbar",
      type: "progressbar",
    },

    navigation: {
      nextEl: ".js-banner-slider-next",
      prevEl: ".js-banner-slider-prev",
    },
    runCallbacksOnInit: true,
    on: {
      slideChange: updateCounter,
      init: updateCounter,
    },
  });
}

function scrollEvents() {
  const numbers = document.querySelector(".js-main-banner-numbers");
  const works = document.querySelector(".js-how-it-works");

  if (!numbers || !works) {
    return;
  }

  function onScroll() {
    if (window.scrollY > 100) {
      numbers.classList.add("mainBanner__numbers--active");
    }

    if (window.scrollY > document.body.scrollHeight - window.innerHeight * 2) {
      window.removeEventListener("scroll", onScroll);

      works.classList.add("mainHowItWorks__img--scroll");

      setTimeout(() => {
        works.classList.remove("mainHowItWorks__img--scroll");
      }, 1000);
    }
  }

  if (window.innerHeight < 800) {
    numbers.classList.add("mainBanner__numbers--active");
  }

  setTimeout(() => {
    window.addEventListener("scroll", onScroll);
  }, 1500);
}
