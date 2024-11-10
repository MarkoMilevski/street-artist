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
    case "#captureImagePage":
      navBarClass = "capture-image--nav";
      break;
    default:
      navBarClass = "";
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
