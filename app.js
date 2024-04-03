const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "04f99194647faf42fea3e18ee32a6c05";


const UnsplashApiURL = "https://api.unsplash.com/search/photos?page=1&query=haze&client_id=";
const UnsplashApiKey = "yNzhcqgsZBKYI_FdtDAL5A7Yl6Qawvd9hcPWvV2tWLY";

const currentDate = document.querySelector(".current-date");
const date = new Date();
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
currentDate.innerHTML =`${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;


const searchInput = document.querySelector(".search-container input");
const search = document.querySelector(".search-container .search");


async function weather(loc) {
    const fetchWeather = await fetch(apiURL + loc + `&appid=${apiKey}`);

    if (fetchWeather.status == 404) {
        document.querySelector(".invalid-message-container").style.display = 'block';
        document.querySelector(".weather-info").style.display = 'none';
    } else {
        let weatherData = await fetchWeather.json()

    let location = document.querySelector(".location");
    let tempareture = document.querySelector(".tempareture");
    let weatherType = document.querySelector(".weather-type");
    let feelsLike = document.querySelector(".feels-like");
    let humidity = document.querySelector(".humidity-per");
    let wimdSpeed = document.querySelector(".wimd-speed");
    let weatherImg = document.querySelector('.weather-img img')

    location.innerHTML = weatherData.name;
    weatherType.innerHTML = weatherData.weather[0].main;
    tempareture.innerHTML = Math.round(weatherData.main.temp) + "°C";
    feelsLike.innerHTML = "Feels Like " + Math.round(weatherData.main.feels_like) + "°C";
    humidity.innerHTML = weatherData.main.humidity + "%";
    wimdSpeed.innerHTML = weatherData.wind.speed + " Km/h";


    if (weatherData.weather[0].main === 'Clear') {
        weatherImg.src = "images/clear.png";
    } else if (weatherData.weather[0].main === 'Clouds') {
        weatherImg.src = "images/clouds.png";
    } else if (weatherData.weather[0].main === 'Rain') {
        weatherImg.src = "images/rain.png";
    } else if (weatherData.weather[0].main === 'Mist') {
        weatherImg.src = "images/mist.png";
    } else if (weatherData.weather[0].main === 'Drizzle') {
        weatherImg.src = "images/drizzle.png";
    } else if (weatherData.weather[0].main === 'Snow') {
        weatherImg.src = "images/snow.png";
    }

    // console.log(weatherData);
    document.querySelector(".weather-info").style.display = 'block';
    document.querySelector(".invalid-message-container").style.display = 'none';
    }
}

search.addEventListener('click', () => {
    weather(searchInput.value);
})

