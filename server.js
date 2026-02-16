const express = require('express');
const axios = require('axios');
const { processGrib2 } = require('./grib2Processor'); // Assume there's a module for processing GRIB2 files

const app = express();
const PORT = process.env.PORT || 3000;

// Function to fetch GFS data
const fetchGFSData = async (lat, lon) => {
    const url = `https://www.ncdc.noaa.gov/nodata/gfs?lat=${lat}&lon=${lon}`;
    const response = await axios.get(url);
    return response.data; // Process response as needed
};

// Endpoint to get weather chart for Madrid
app.get('/chart/madrid', async (req, res) => {
    try {
        const weatherData = await fetchGFSData(40.4168, -3.7038);
        const processedData = processGrib2(weatherData);
        res.json(processedData);
    } catch (error) {
        console.error('Error fetching GFS data:', error);
        res.status(500).send('Error fetching weather data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
