const LAT = 40.4168;
const LON = -3.7038;

let chart;

// Evento botón
document.getElementById("load").addEventListener("click", loadData);

// Función principal para cargar datos de varios modelos
async function loadData() {

  const variable = document.getElementById("variable").value;

  const url = `https://api.open-meteo.com/v1/ensemble?latitude=${LAT}&longitude=${LON}&models=gfs_ensemble,ecmwf_ensemble,icon_eps&hourly=${variable}&forecast_days=7`;

  const response = await fetch(url);
  const data = await response.json();

  // Construir datasets de cada miembro de cada modelo
  const datasets = [];

  // GFS Ensemble
  if(data.models.gfs_ensemble){
    data.models.gfs_ensemble.members.forEach((member, i)=>{
      datasets.push({
        label: `GFS ${member.name}`,
        data: member[variable],
        borderColor: "#4da6ff",
        tension: 0.3,
        pointRadius: 0
      });
    });
  }

  // ECMWF Ensemble
  if(data.models.ecmwf_ensemble){
    data.models.ecmwf_ensemble.members.forEach((member,i)=>{
      datasets.push({
        label: `ECMWF ${member.name}`,
        data: member[variable],
        borderColor: "#ff9933",
        tension: 0.3,
        pointRadius: 0
      });
    });
  }

  // ICON EPS
  if(data.models.icon_eps){
    data.models.icon_eps.members.forEach((member,i)=>{
      datasets.push({
        label: `ICON ${member.name}`,
        data: member[variable],
        borderColor: "#33ff99",
        tension: 0.3,
        pointRadius: 0
      });
    });
  }

  const times = data.models.gfs_ensemble.members[0].time;

  drawChart(times, datasets, variable);
}

// Función para dibujar el gráfico
function drawChart(times, datasets, label){

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: times,
      datasets: datasets
    },
    options:{
      responsive:true,
      plugins:{
        legend:{ labels:{ color:"white", maxHeight:100 } }
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

