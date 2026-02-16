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

  chart = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: times,
      datasets: [{
        label: label,
        data: values,
        borderColor: "#4da6ff",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0
      }]
    },
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
