import fetchJsonp from 'fetch-jsonp';


const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp"
// for testing purposes I used the data for all month
// const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojsonp"

async function getEarthquakeData() {
    const response = await fetchJsonp(url, {jsonpCallbackFunction: 'eqfeed_callback'})
    return await response.json(); 
};

export default getEarthquakeData;
