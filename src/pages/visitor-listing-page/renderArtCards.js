export function renderArtCards(items) {
  artistCards.innerHTML = "";

  items.forEach((item, index) => {
    const card =
      index % 2 === 0 ? createNormalCard(item) : createHighlightedCard(item);

    artistCards.appendChild(card);
  });
}

function createHighlightedCard(item) {
  const card = document.createElement("div");

  card.classList.add("card", "card--highlighted");

  card.innerHTML += `
      <div class="card-item">
          <div class="card-inner">
              <div class="card-image">
                <img
                  loading="lazy"
                  src="${item.image}"
                  alt="${item.title}"
                />
              </div>
              <div class="card-content">
                <div class="card-content--inner">
                  <h3 class="card-heading card-heading--highlighted">${item.artist}</h3>
                  <span class="price price--highlighted">$${item.price}</span>
                </div>
                <span class="title title--highlighted">${item.title}</span>
                <p class="description description--hightlighted">${item.description}</p>
              </div>
            </div>
          </div>`;

  return card;
}

function createNormalCard(item) {
  const card = document.createElement("div");

  card.classList.add("card");

  card.innerHTML += `
            <div class="card-item">
            <div class="card-inner">
              <div class="card-image">
                <img
                  loading="lazy"
                  src="${item.image}"
                  alt="${item.title}"
                />
              </div>
              <div class="card-content">
                <div class="card-content--inner">
                  <h3 class="card-heading">${item.artist}</h3>
                  <span class="price">$${item.price}</span>
                </div>
  
                <span class="title">${item.title}</span>
                <p class="description">${item.description}</p>
              </div>
            </div>
          </div>`;

  return card;
}
