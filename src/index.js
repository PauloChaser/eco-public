import "./css/style.css";
import "swiper/css/bundle";

import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
import "lightgallery/css/lightgallery-bundle.css";

import { initFooter } from "./js/footer";
import { initHeader } from "./js/header";
import { initModals } from "./js/modals";
import { initFaq } from "./js/faq";
// import { initMainBanner } from "./js/mainBanner";
import { initMainAboutCard } from "./js/mainAboutCard";
import { initMainBannerSlider } from "./js/mainBannerSlider";
import { initMap } from "./js/map";
import { initNews } from "./js/news";
import { initMainHowItWorks } from "./js/mainHowItWorks";
import { initMainTasks } from "./js/mainTasks";
import { initFunctionalEco } from "./js/functionalEco";
import { iniMainIntellectual } from "./js/mainIntellectual";
import { initCookie } from "./js/cookie";
import { initAppEco } from "./js/appEco";
import { initTextEffect } from "./js/textEffect";
import { initPreloader } from "./js/preloader";
import { initSphere } from "./js/sphere";

document.addEventListener("DOMContentLoaded", function () {
  initPreloader();

  initFooter();
  initHeader();
  initFaq();
  initModals();
  initMainAboutCard();
  initMainBannerSlider();
  initMap();
  initNews();
  initMainHowItWorks();
  initMainTasks();
  initFunctionalEco();
  iniMainIntellectual();
  initCookie();
  initAppEco();
  initTextEffect();
  initSphere();
});
