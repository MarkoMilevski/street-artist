import { getArtist } from "../../utils/global.js";

export function initArtistHomePage() {
  console.log("Init artist page");

  const selectedArtist = getArtist();

  document.querySelector("#artistName").textContent = selectedArtist;
}
