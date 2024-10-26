import { setArtist } from "../utils/global.js";

const usersSelect = document.querySelector("#users");

export function initLandingPage() {
  console.log("init Landing page");

  fetchUsers();
}

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(handleResponse)
    .then(renderUserOptions)
    .then(onOptionChange);
}

function handleResponse(response) {
  if (!response) {
    throw new Error("Response was not ok");
  }

  return response.json();
}

function renderUserOptions(users) {
  usersSelect.innerHTML = "";
  const chooseOption = document.createElement("option");

  chooseOption.value = "";
  chooseOption.textContent = "Choose";
  usersSelect.appendChild(chooseOption);

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.name;
    option.textContent = user.name;

    usersSelect.appendChild(option);
  });
}
usersSelect.addEventListener("change", function () {
  const selectedArtist = usersSelect.value;

  setArtist(selectedArtist);
  window.location.hash = "#artistHomePage";
});

function onOptionChange() {
  usersSelect.addEventListener("change", function () {
    const selectedArtist = usersSelect.value;

    setArtist(selectedArtist);
    window.location.hash = "#artistHomePage";
  });
}
