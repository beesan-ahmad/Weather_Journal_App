// Personal API Key for OpenWeatherMap API
const apiKey = '3dc50562cc6566108370cfae0716a62d&units=imperial';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

// Function called by event listener
function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(apiKey, zip)
        .then((data) => {
            postData('/add', { date: new Date().toLocaleDateString(), temp: data.main.temp, content: feelings });
        })
        .then(() => retrieveData());
}

// Function to GET Web API Data
const getWeather = async (apiKey, zip) => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

// Function to POST data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

// Function to GET Project Data
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json();
        console.log(allData);
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.content;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.log('error', error);
    }
};
