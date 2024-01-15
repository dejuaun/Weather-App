// Assign the api information to variables
const apiKey = 'fe7e8e8ab554e7506dc3c48d3cc9ad93';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

// Assing the html info to variables
const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');

const weatherIcon = document.querySelector('.weather-icon')

// This function takes in the city and outputs data from the api
async function checkWeather(city) {
    if (!city) {
        console.error("City is not specified");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        const data = await response.json();

        console.log(data);

        // Display the information depending on the entered city
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.floor(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' mph';

        // Update images according to weather condition
        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = '/images/clouds.png';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = '/images/rain.png';
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = '/images/drizzle.png';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = '/images/mist.png';
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = '/images/clear.png';
        } else if (data.weather[0].main == 'Snow') {
            weatherIcon.src = '/images/snow.png';
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Sends the search box information when the search button is clicked
searchButton.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

// Sends the search box information when the enter key is pressed
searchBox.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        checkWeather(searchBox.value);
    }
});

// Display a default city
checkWeather('London');
