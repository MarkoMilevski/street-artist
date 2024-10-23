import { initLandingPage } from "./src/pages/landingPage.js";
import { initVisitorHomePage } from "./src/pages/visitorHomePage.js";

function handleRouting() {
  const hash = location.hash || "#landingPage";

  const allPages = document.querySelectorAll(".page");

  allPages.forEach((page) => (page.style.display = "none"));
  document.querySelector(hash).style.display = "block";

  switch (hash) {
    case "#landingPage":
      initLandingPage();
      break;
    case "#visitorsHomePage":
      initVisitorHomePage();
      break;
    default:
      break;
  }
}

window.addEventListener("load", handleRouting);
window.addEventListener("hashchange", handleRouting);
