import { getWeather } from './API'
import { renderIcon } from './render'
import { updateTemperatureChart } from './eChart'

export const todayContent = document.getElementById('today-content')
export const tomorrowContent = document.getElementById('tomorrow-content')

const todayTab = document.getElementById('today-tab')
const tomorrowTab = document.getElementById('tomorrow-tab')

export const weatherData = {
	today: null,
	tomorrow: null,
}

todayContent.classList.remove('is-hidden')
tomorrowContent.classList.add('is-hidden')

todayTab.addEventListener('click', () => {
	todayContent.classList.remove('is-hidden')
	tomorrowContent.classList.add('is-hidden')
})

tomorrowTab.addEventListener('click', () => {
	tomorrowContent.classList.remove('is-hidden')
	todayContent.classList.add('is-hidden')
})

export function renderWeather(tab, weatherData) {
	const container = tab === 'today' ? todayContent : tomorrowContent

	// Очистим контейнер перед рендерингом
	container.innerHTML = ''

	// В зависимости от того, что передано, рендерим для одного дня
	const { location, day: elem } = weatherData

	container.innerHTML += `
    <div class="cards__div">
      <div class="cards__title">
        <h2 class="cards__current--weather">Weather 
          <span class="city-name">${location.name}</span>
        </h2>
        <button class="cards__title__button--delete" data-index="0">
          <svg class="cards__title__icon"></svg>
        </button>
      </div>
      <div class="content-wrapper">
        <div class="content-wrapper__left">
          <img class="cards__condition-icon" src="${elem.condition.icon}" alt="Weather icon">
          <div class="content-wrapper__left__text">
            <div class="temperature">${elem.avgtemp_c}&deg;</div>
            <div class="cards__condition-text">${elem.condition.text}</div>
          </div>
        </div>
        <div class="content-wrapper__right">
          <div>
            <div class="cards__wind">Windgeschwindigkeit
              <span class="cards__wind__right">${elem.maxwind_kph} km/h</span>
            </div>
            <div class="temperature-feels">fühlt sich an wie 
              <span class="temperature-feels__right">${elem.avgtemp_c}&deg;</span>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="cards__button">More details</button>
      <div class="cards__additionally is-hidden">
        <div class="cards__precip">Niederschlag in Millimetern 
          <span class="cards__precip__right"> ${elem.totalprecip_mm} mm </span>
        </div>
        <div class="cards__cloud">wolkig 
          <span class="cards__cloud__right"> ${elem.avgcloud} %</span>
        </div>
        <div class="cards__humidity">Luftfeuchtigkeitsprozentsatz 
          <span class="cards__humidity__right"> ${elem.avghumidity} %</span>
        </div>
        <div class="weatherChart">
          <div id="temperature-chart-${location.name}-${tab}" style="width: 100%; height: 400px; margin-top: 20px;"></div>
        </div>
      </div>
    </div>
  `

	renderIcon()

	// Обработчик кнопок удаления карточек
	document.querySelectorAll('.cards__title__button--delete').forEach(button => {
		button.addEventListener('click', event => {
			const index = event.target.getAttribute('data-index')
			deleteCards(index)
		})
	})

	// Рендерим диаграмму для температуры
	setTimeout(() => {
		updateTemperatureChart(location.name, tab)
	}, 500)
}

// Функция обновления данных погоды
export async function updateWeather(inputValue) {
	try {
		const response = await getWeather(inputValue)
		console.log('API response:', response.data) // Проверьте это

		if (response.status === 200) {
			const forecast = response.data.forecast.forecastday
			weatherData.today = {
				location: response.data.location,
				day: forecast[0].day, // Сегодняшние данные
			}
			weatherData.tomorrow = {
				location: response.data.location,
				day: forecast[1].day, // Завтрашние данные
			}

			// Рендеринг вкладок
			renderWeather('today', weatherData.today) // Рендерим сегодня
			renderWeather('tomorrow', weatherData.tomorrow) // Рендерим завтра

			// Сохранение данных в localStorage
			addWeatherCards(weatherData.today)
			addWeatherCards(weatherData.tomorrow)
		} else {
			console.error('Unexpected response status:', response.status)
		}
	} catch (error) {
		console.error('Error updating weather:', error)
	}
}
