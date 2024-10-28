import { initArtistHomePage } from "./src/pages/artist-home-page/artistHomePage.js";
import { initLandingPage } from "./src/pages/landingPage.js";
import { initVisitorListingPage } from "./src/pages/visitor-listing-page/visitorListingPage.js";
import { initVisitorHomePage } from "./src/pages/visitorHomePage.js";

function handleRouting() {
  const hash = location.hash || "#landingPage";

  hideAllPages();
  showPage(hash);
  initializePage(hash);
}

function hideAllPages() {
  const allPages = document.querySelectorAll(".page");

  allPages.forEach((page) => (page.style.display = "none"));
}

function showPage(hash) {
  const page = document.querySelector(hash);
  if (page) {
    page.style.display = "block";
  }
}

function initializePage(hash) {
  switch (hash) {
    case "#landingPage":
      initLandingPage();
      break;
    case "#visitorHomePage":
      initVisitorHomePage();
      break;
    case "#artistHomePage":
      initArtistHomePage();
      break;
    case "#visitorListingPage":
      initVisitorListingPage();
      break;
    default:
      console.error(`page ${hash} was not found `);
      break;
  }
}

window.addEventListener("load", handleRouting);
window.addEventListener("hashchange", handleRouting);
