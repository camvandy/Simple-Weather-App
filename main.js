const weatherDetails = document.querySelector('.weather-details');
const errorMessage = document.querySelector('.not-found');
const mainContainer = document.querySelector('.container');
const userSearch = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');

userSearch.addEventListener('click', () => {

    //Add Your Own APIKey
    const APIKey = '728b0ee6df5687559812bd3169ad77b7';
    const enteredCity = document.querySelector('.search-box input').value;

    if (enteredCity === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                mainContainer.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                errorMessage.style.display = 'block';
                errorMessage.classList.add('fadeIn');
                return;
            }
            errorMessage.style.display = 'none';
            errorMessage.classList.remove('fadeIn');

            const weatherImage = document.querySelector('.weather-box img');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');

            switch (json.weather[0].main) {
                case 'Clouds':
                    weatherImage.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    weatherImage.src = 'images/mist.png';
                    break;
                case 'Clear':
                    weatherImage.src = 'images/clear.png';
                    break;
                case 'Rain':
                    weatherImage.src = 'images/rain.png';
                    break;
                case 'Snow':
                    weatherImage.src = 'images/snow.png';
                    break;
                default:
                    weatherImage.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            mainContainer.style.height = '590px';
        });
});