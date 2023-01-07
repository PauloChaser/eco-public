export function initMainBanner() {
  const banner = document.getElementById("banner");

  if (!banner) {
    return;
  }

  setTimeout(() => {
    banner.classList.remove("mainBanner--initial");
  }, 500);
}
