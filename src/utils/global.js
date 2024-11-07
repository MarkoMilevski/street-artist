import { getItems } from "./storage.js";

let currentArtist;

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
