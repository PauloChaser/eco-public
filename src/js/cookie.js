import { getCookie, setCookie } from "./utils/helpers";

export function initCookie() {
  let cookieNote = document.querySelector(".js-cookie");

  if (!cookieNote) {
    return;
  }

  const cookieBtnAccept = cookieNote.querySelector(".js-cookie-accept");

  if (!cookieBtnAccept) {
    return;
  }

  if (!getCookie("cookies_policy")) {
    cookieNote.classList.add("cookie--active");
  }

  cookieBtnAccept.addEventListener("click", function () {
    setCookie("cookies_policy", "true", 5);
    cookieNote.classList.remove("cookie--active");
  });
}
