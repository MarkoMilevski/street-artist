import { items } from "../../../data/db.js";
import { toggleFilterPanel } from "../../layout/filterPanel.js";
import { getPublishedItems } from "../../utils/global.js";
import { renderArtCards } from "./renderArtCards.js";

export function initVisitorListingPage() {
  const publishedItems = getPublishedItems(items);

  renderArtCards(publishedItems);
}
