export function generateDateLabels(daysAgo = 7) {
  const labels = [];
  const today = new Date();

  for (let i = 0; i < daysAgo; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - i);

    const formattedLabel = formatDate(currentDate);
    labels.push(formattedLabel);
  }

  return labels;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB");
}
