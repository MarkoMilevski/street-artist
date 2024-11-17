import { itemTypes } from "../../data/db.js";
import { getItems } from "./storage.js";

let currentArtist;
const form = document.querySelector("#itemForm");

export function getArtist() {
  const artistName = localStorage.getItem("artistName");

  if (!artistName) {
    localStorage.setItem("artistName", artistName);
  }

  currentArtist = artistName;
  return currentArtist;
}

export function setArtist(_artist) {
  currentArtist = _artist;
  localStorage.setItem("artistName", currentArtist);
}

export function getPublishedItems(items) {
  const getItemsFromStorage = getItems();
  return getItemsFromStorage.filter((item) => item.isPublished);
}

export function createDropdownOption() {
  const option = document.createElement("option");
  option.value = "";
  option.textContent = "choose";
  return option;
}

export function handleNavBarclick() {
  const navDropDown = document.querySelector("#navDropdown");
  if (navDropDown) {
    navDropDown.classList.toggle("show");
  }
}

export function populateItemTypes() {
  const typeSelect = document.querySelector("#sortByType");
  typeSelect.innerHTML = "";
  const chooseOption = createDropdownOption();
  typeSelect.appendChild(chooseOption);

  itemTypes.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeSelect.appendChild(option);
  });
}

export function resetForm() {
  form.reset();
  form.querySelector("#isPublished").checked = true;

  const captureImageDiv = document.querySelector("#captureImage");
  captureImageDiv.innerHTML = `<span class="camera"><i class="fas fa-camera"></i></span><span>Take a snapshot</span>`;
}
