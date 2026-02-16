const LAT = 40.4168;
const LON = -3.7038;

let chart;

document.getElementById("load").addEventListener("click", loadData);

async function loadData(){

  const variable = document.getElementById("variable").value;

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&hourly=${variable}&forecast_days=7`;

  const response = await fetch(url);
  const data = await response.json();

  const times = data.hourly.time;
  const values = data.hourly[variable];

  drawChart(times, values, variable);
}

function drawChart(times, values, label){

  if(chart) chart.destroy();

  // Simulamos 3 modelos (ensembles)
  const datasets = [
    {label: label + " - Modelo A", data: values, borderColor: "#4da6ff", tension: 0.3, pointRadius: 0},
    {label: label + " - Modelo B", data: values.map(v => v + (Math.random()*2-1)), borderColor: "#ff9933", tension: 0.3, pointRadius: 0},
    {label: label + " - Modelo C", data: values.map(v => v + (Math.random()*2-1)), borderColor: "#33ff99", tension: 0.3, pointRadius: 0},
  ];

  chart = new Chart(document.getElementById("chart"), {
    type: "line",
    data: { labels: times, datasets: datasets },
    options:{
      responsive:true,
      plugins:{
        legend:{ labels:{ color:"white" } }
      },
      scales:{
        x:{ ticks:{ color:"white" }},
        y:{ ticks:{ color:"white" }}
      }
    }
  });
}


// Carga inicial
loadData();
