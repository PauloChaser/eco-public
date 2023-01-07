const centralIcons = document.querySelectorAll(".js-main-tasks-central-icon");
const roundIcons = document.querySelectorAll(".js-main-tasks-round-icon");
const items = document.querySelectorAll(".js-main-tasks-item");

const prevArrow = document.querySelector(".js-main-tasks-prev");
const nextArrow = document.querySelector(".js-main-tasks-next");

const circleIconsViewport = document.querySelector(".js-circle-icons-viewport");

export function initMainTasks() {
  if (!centralIcons || !roundIcons || !items) {
    return;
  }

  let currentIndex = 0;

  roundIcons.forEach((item, index) => {
    item.addEventListener("click", function () {
      setSlide(index);
      currentIndex = index;
    });
  });

  if (!prevArrow || !nextArrow) {
    return;
  }

  prevArrow.addEventListener("click", function () {
    if (currentIndex === 0) {
      currentIndex = roundIcons.length - 1;
      setSlide(currentIndex);
      return;
    }

    setSlide(--currentIndex);
  });

  nextArrow.addEventListener("click", function () {
    if (currentIndex === roundIcons.length - 1) {
      currentIndex = 0;
      setSlide(currentIndex);
      return;
    }

    setSlide(++currentIndex);
  });
}

function setSlide(index) {
  const iconsCount = centralIcons.length;

  for (let i = 0; i < iconsCount; i++) {
    const isCurrent = index === i;

    centralIcons[i].classList.toggle(
      "circleSlider__centralIcon--active",
      isCurrent
    );
    roundIcons[i].classList.toggle("circleSlider__icon--active", isCurrent);
    items[i].classList.toggle("circleSlider__item--active", isCurrent);
  }

  const moreThenHalf = index > roundIcons.length / 2;

  circleIconsViewport.scrollTo({
    left: moreThenHalf ? 200 : 0,
    behavior: "smooth",
  });
}
