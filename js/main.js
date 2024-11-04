const API_KEY = '38de8a5b0705066b42f8acfb5e162636';

const form = document.querySelector('#form');
const input = document.querySelector('.form_input');

//_____________________________________________


form.onsubmit = submintHandler;

async function submintHandler(e) {
    e.preventDefault();
    
    if(!input.value){
        
        return
    }

    //trim() - обрезает пробелы в начале и в конце
    const cityInfo = await getGeo(input.value.trim())

    input.value = '';
    
    const weatherInfo = await getWeather(cityInfo[0]['lat'], cityInfo[0]['lon'])

    const weatherData = {
        name: weatherInfo.name,
        temp: weatherInfo.main.temp,
        humidity: weatherInfo.main.humidity,
        speed: weatherInfo.wind.speed,
        main: weatherInfo.weather[0]['main']
    }

    renderWeatherData(weatherData)
}

async function getGeo(name) {
    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
    const response = await fetch(geoURL)
    const data = await response.json()
    return data;
}

async function getWeather(lat,lon) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(weatherURL)
    const data = await response.json()
    return data;
}

function renderWeatherData(data){
    const temp = document.querySelector('#weatherTemp');
    const city = document.querySelector('#weatherCityName');
    const humidity = document.querySelector('#humidity');
    const speed = document.querySelector('#windSpeed');
    const img = document.querySelector('.weather_img')

    temp.textContent = Math.round(data.temp) + "°c";
    city.textContent = data.name;
    humidity.textContent = data.humidity + "%";
    speed.textContent = data.speed + " km/h";

    
    const fileNames = {
        'Clouds': 'clouds',
        'Clear': 'clear',
        'Rain': 'rain',
        'Snow': 'snow',
        'Mist': 'mist',
        'Drizzle': 'drizzle',
    }

    img.src = `/img/weather/${fileNames[data.main]}.svg`
}
