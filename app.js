const LAT = 40.4168;
const LON = -3.7038;

let chartTemp2m, chartT850;

document.getElementById("load").addEventListener("click", loadMultipleCharts);

async function loadMultipleCharts(){

  // Variables que queremos mostrar
  const variables = [
    {id:"chart_temp2m", name:"temperature_2m"},
    {id:"chart_t850", name:"temperature_850hPa"}
  ];

  for(const v of variables){
    const url = `https://api.open-meteo.com/v1/ensemble?latitude=${LAT}&longitude=${LON}&models=gfs_ensemble,ecmwf_ensemble,icon_eps&hourly=${v.name}&forecast_days=7`;
    
    const response = await fetch(url);
    const data = await response.json();

    const datasets = [];

    // GFS Ensemble
    if(data.models.gfs_ensemble){
      data.models.gfs_ensemble.members.forEach(member=>{
        datasets.push({
          label:`GFS ${member.name}`,
          data: member[v.name],
          borderColor:"#4da6ff",
          tension:0.3,
          pointRadius:0
        });
      });
    }

    // ECMWF Ensemble
    if(data.models.ecmwf_e_
