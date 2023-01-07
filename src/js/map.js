import { mapData } from "./data/regions";

const MAP_REAL_WIDTH = 1682;
const MAP_REAL_HEIGHT = 1053;
const POINT_RADIUS = 20;

const balloonName = document.querySelector(".js-balloon-name");
const balloonCities = document.querySelector(".js-balloon-cities");
const balloonWells = document.querySelector(".js-balloon-wells");

const map = document.querySelector(".js-map");
const balloon = document.querySelector(".js-balloon");
const points = document.querySelectorAll(".js-circle");
const balloonLine = document.querySelector(".js-balloon-line");

export function initMap() {
  if (!map || !balloon || !points) {
    return;
  }

  points.forEach((point) => {
    point.addEventListener("mouseenter", function () {
      console.log("Enter");

      const regionName = point.dataset.region;
      const region = map.querySelector(`#${regionName}`);

      region.classList.add("geography__mapRegionActive");
      setBalloonData(regionName);

      const x = Number(point.getAttribute("x")) + POINT_RADIUS;
      const y = Number(point.getAttribute("y")) + POINT_RADIUS;

      const { offsetX, offsetY } = getBalloonOffset(x, y);

      const coefficientX = map.clientWidth / MAP_REAL_WIDTH;
      const coefficientY = map.clientHeight / MAP_REAL_HEIGHT;

      balloon.classList.toggle("geography__mapBalloon--leftLine", x < 500);

      balloon.style.left = x * coefficientX - offsetX + "px";
      balloon.style.top = y * coefficientY - offsetY + "px";

      balloon.classList.add("geography__mapBalloon--active");
    });

    point.addEventListener("mouseleave", function () {
      console.log("LEAVE");

      point.classList.remove("js-circle-active");
      point.setAttribute("href", "#circle");

      const activeMapElement = map.querySelector(".geography__mapRegionActive");

      if (activeMapElement) {
        activeMapElement.classList.remove("geography__mapRegionActive");
      }

      balloon.classList.remove("geography__mapBalloon--active");
    });
  });
}

function getBalloonOffset(x) {
  const lineOffset = Math.min(
    balloon.offsetWidth - balloonLine.offsetLeft,
    balloonLine.offsetLeft
  );

  const offsetX = x < 500 ? lineOffset : balloon.offsetWidth - lineOffset;
  const offsetY = balloon.offsetHeight + balloonLine.offsetHeight;

  return { offsetX, offsetY };
}

function setBalloonData(regionName) {
  const mapDataRegionName = mapData[regionName];

  if (!mapDataRegionName) {
    return;
  }

  balloonName.innerText = mapDataRegionName.name;
  balloonCities.innerText = mapDataRegionName.cities;
  balloonWells.innerText = mapDataRegionName.wells;
}
