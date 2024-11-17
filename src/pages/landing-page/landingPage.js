import { setArtist } from "../../utils/global.js";
import { fetchUsers } from "../../utils/renderArtistOptions.js";

const usersSelect = document.querySelector("#users");
export function initLandingPage() {
  console.log("init Landing page");

  fetchUsers(usersSelect);
}

usersSelect.addEventListener("change", function () {
  const selectedArtist = usersSelect.value;

  setArtist(selectedArtist);
  window.location.hash = "#artistHomePage";
});
