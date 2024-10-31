let currentArtist;

export function getArtist() {
  return currentArtist;
}

export function setArtist(_artist) {
  currentArtist = _artist;
}

export function getPublishedItems(items) {
  return items.filter((item) => item.isPublished);
}

export function createDropdownOption() {
  const option = document.createElement("option");
  option.value = "";
  option.textContent = "choose";
  return option;
}
