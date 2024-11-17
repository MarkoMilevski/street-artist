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

  const wrapper = document.createElement("div");

  const toggle = document.createElement("div");
  toggle.classList.add("hamburger-icon");
  toggle.innerHTML = `<i class="fas fa-bars"></i>`;

  const navDropDown = document.createElement("div");
  navDropDown.classList.add("nav-bar--dropdown");
  navDropDown.innerHTML = `
        <ul>
          <li><a href="#artistHomePage">Home</a></li>
          <li><a href="#artistItemsPage">Items</a></li>
          <li><a href="#landingPage">Auction</a></li>
        </ul>`;

  toggle.addEventListener("click", function () {
    navDropDown.classList.toggle("show");
  });

  const nav = document.createElement("nav");

  nav.classList.add("nav-bar", navBarClass);

  nav.innerHTML = `
    <a href="#landingPage">
      <img src="./assets/logo.png" alt="logo" />
    </a>
<h1 class="nav-bar--heading" id="artistName">${selectedArtist}</h1>`;

  nav.appendChild(toggle);

  wrapper.append(nav, navDropDown);
  return wrapper;
}
