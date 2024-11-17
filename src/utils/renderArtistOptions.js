import { createDropdownOption } from "./global.js";

export function fetchUsers(usersSelect) {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(handleResponse)
    .then((users) => {
      renderUserOptions(users, usersSelect);
    });
}

function handleResponse(response) {
  if (!response) {
    throw new Error("Response was not ok");
  }

  return response.json();
}

export function renderUserOptions(users, usersSelect) {
  usersSelect.innerHTML = "";
  const chooseOption = createDropdownOption();
  usersSelect.appendChild(chooseOption);

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.name;
    option.textContent = user.name;

    usersSelect.appendChild(option);
  });
}
