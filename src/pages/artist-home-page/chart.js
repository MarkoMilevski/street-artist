import { items } from "../../../data/db.js";
import { formatDate, generateDateLabels } from "../../utils/dates.js";
let chartInstance;

export function initChart(config) {
  const ctx = document.getElementById("myChart");

  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: config.labels,
      datasets: [
        {
          label: "Amount sold",
          data: config.data,
          borderWidth: 1,
          backgroundColor: ["rgba(161, 106, 94, 1)"],
        },
      ],
    },
    options: {
      indexAxis: "y",
    },
  });

  return chart;
}

export function drawChart(daysAgo, selectedArtist) {
  const labels = generateDateLabels(daysAgo);

  const artistItems = items.filter(
    (item) => item.artist === selectedArtist && !!item.priceSold
  );

  const data = getChartData(artistItems, labels);

  if (chartInstance) {
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = data;

    chartInstance.update();
  } else {
    chartInstance = initChart({
      labels: labels,
      data: data,
    });
  }
}

export function getChartData(items = [], labels = []) {
  const chartData = [];

  labels.forEach((label) => {
    let sum = 0;

    items.forEach((item) => {
      if (formatDate(item.dateSold) === label) {
        sum += item.priceSold;
      }
    });

    chartData.push(sum);
  });
  return chartData;
}

export function setupChartButtons(selectedArtist) {
  const daysOptions = [7, 14, 30];
  const buttons = {
    7: document.querySelector("#last7Days"),
    14: document.querySelector("#last14Days"),
    30: document.querySelector("#last30Days"),
  };

  drawChart(14, selectedArtist);

  daysOptions.forEach((days) => {
    buttons[days].addEventListener("click", () => {
      drawChart(days, selectedArtist);
      setActiveButton(days, buttons);
    });
  });

  setActiveButton(14, buttons);
}

function setActiveButton(activeDays, buttons) {
  const daysOptions = [7, 14, 30];
  for (let i = 0; i < daysOptions.length; i++) {
    const button = buttons[daysOptions[i]];
    button.classList.remove("button-contrast");
    button.classList.add("button-default");
  }
  buttons[activeDays].classList.remove("button-default");
  buttons[activeDays].classList.add("button-contrast");
}
