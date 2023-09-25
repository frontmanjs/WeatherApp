const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';

const API_KEY = '&appid=d7670e6a62d01bcb9e5ee9c306e7bde6';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value || 'London';
	const URL = API_LINK + city + API_KEY + API_UNITS;
	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + '°C';
			humidity.textContent = hum + '%';
			weather.textContent = status.main;

			warning.textContent = '';
			input.value = '';

			if (status.id >= 200 && status.if < 300) {
				photo.setAttribute('src', './img/thunderstorm.png');
			} else if (status.id >= 300 && status.if < 400) {
				photo.setAttribute('src', './img/drizze.png');
			} else if (status.id >= 500 && status.if < 600) {
				photo.setAttribute('src', './img/rain.png');
			} else if (status.id >= 600 && status.if < 700) {
				photo.setAttribute('src', './img/ice.png');
			} else if (status.id >= 700 && status.if < 800) {
				photo.setAttribute('src', './img/fog.png');
			} else if (status.id === 800) {
				photo.setAttribute('src', './img/sun.png');
			} else if (status.id > 800 && status.if < 900) {
				photo.setAttribute('src', './img/cloud.png');
			} else {
				photo.setAttribute('src', './img/unknown.png');
			}
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'));
};

const enterKeyFunction = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

input.addEventListener('keyup', enterKeyFunction);
getWeather();
button.addEventListener('click', getWeather);
