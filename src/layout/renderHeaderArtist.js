import { getArtist } from "../utils/global.js";

export function renderHeaderArtistPage() {
  let navBarClass;

  const selectedArtist = getArtist();

  switch (location.hash) {
    case "#artistHomePage":
      navBarClass = "artist-homepage--nav";
      break;
    case "#artistItemsPage":
      navBarClass = "artist-items--nav";
      break;
    case "#addNewItemPage":
      navBarClass = "add-new-item--nav";
      break;
    default:
      navBarClass = "";
  }

  if (location.hash === "#artistHomePage") {
    navBarClass = "artist-homepage--nav";
  } else if (location.hash === "#artistItemsPage") {
    navBarClass = "artist-items--nav";
  } else if (location.hash === "#addNewItemPage") {
    navBarClass = "add-new-item--nav";
  }
  return `
    <nav class="nav-bar ${navBarClass}">
        <a href="#landingPage">
          <img src="./assets/logo.png" alt="logo" />
        </a>
        <h1 class="nav-bar--heading" id="artistName">${selectedArtist}</h1>
        <div class="hamburger-icon" id="navToggle">
          <i class="fas fa-bars"></i>
        </div>
      </nav>
      <div class="nav-bar--dropdown" id="navDropdown">
        <ul>
          <li><a href="#artistHomePage">Home</a></li>
          <li><a href="#artistItemsPage">Items</a></li>
          <li><a href="#visitorHomePage">Auction</a></li>
        </ul>
      </div>
    `;
}
