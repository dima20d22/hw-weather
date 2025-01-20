import 'izitoast/dist/css/iziToast.min.css'
import { tryAndCatch } from './js/tryAndCatch.js'
import iziToast from 'izitoast'
import {
	addWeatherCards,
	deleteCards,
	loadDataFromLocalStorage,
	savedWeatherData,
} from './js/localStorage.js'
// import { renderCards } from './js/render.js'
import { updateTemperatureChart } from './js/eChart.js'
import { updateWeather } from './js/daysWeather.js'
import { tomorrowContent } from './js/daysWeather.js'
import { renderWeather } from './js/daysWeather.js'
import { weatherData } from './js/daysWeather.js'
import { renderCards } from './js/render.js'

const form = document.querySelector('.header__form')
const input = document.querySelector('.header__form__input')

document.addEventListener('DOMContentLoaded', () => {
	renderCards(loadDataFromLocalStorage())
})

form.addEventListener('submit', async e => {
	e.preventDefault()
	const inputValue = input.value.trim()

	if (inputValue === '') {
		iziToast.error({
			title: 'Error',
			message: 'Please enter a city name',
			position: 'topRight',
		})
		return
	}
	await updateWeather(inputValue)
	if (!tomorrowContent.classList.contains('is-hidden')) {
		renderWeather('tomorrow', weatherData.tomorrow)
	} else {
		renderWeather('today', weatherData.today)
	}
	const data = await tryAndCatch(inputValue)
	if (data) {
		addWeatherCards(data)
		input.value = ''
	}
})

document.addEventListener('click', e => {
	// Удаление карточки
	if (e.target.classList.contains('cards__title__button--delete')) {
		const index = Array.from(
			document.querySelectorAll('.cards__title__button--delete')
		).indexOf(e.target.closest('.cards__title__button--delete'))
		deleteCards(index)
	}

	// Открытие/закрытие подробностей карточки
	if (e.target.classList.contains('cards__button')) {
		e.preventDefault()

		const parentCard = e.target.closest('.cards__div')
		const details = parentCard.querySelector('.cards__additionally')

		const city = parentCard.querySelector('.city-name').textContent.trim()

		// Обновление диаграммы
		updateTemperatureChart(city)

		// Тоглинг деталей
		const isHidden = details.classList.toggle('is-hidden')

		if (!isHidden) {
			e.target.textContent = 'Hide details'
			parentCard.style.width = '960px'
			parentCard.style.height = 'auto'
			details.style.width = '25%'
		} else {
			e.target.textContent = 'More details'
			parentCard.style.width = ''
			details.style.width = '0'
		}
	}
})
