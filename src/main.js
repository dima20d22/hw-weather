import 'izitoast/dist/css/iziToast.min.css'
import { tryAndCatch } from './js/tryAndCatch.js'
import iziToast from 'izitoast'
import {
	addWeatherCards,
	deleteCards,
	loadDataFromLocalStorage,
	savedWeatherData,
} from './js/localStorage.js'
import { renderCards } from './js/render.js'
import { updateTemperatureChart } from './js/eChart.js'

const form = document.querySelector('.header__form')
const input = document.querySelector('.header__form__input')
const box = document.querySelector('.box')

document.addEventListener('DOMContentLoaded', () => {
	renderCards(savedWeatherData)
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

	const data = await tryAndCatch(inputValue)
	if (data) {
		addWeatherCards(data)
		renderCards(loadDataFromLocalStorage())
		input.value = '' // Очищаем поле ввода
	}
})

document.addEventListener('click', e => {
	if (e.target.classList.contains('cards__button')) {
		e.preventDefault()

		const parentCard = e.target.closest('.cards__div')
		const details = parentCard.querySelector('.cards__additionally')

		const city = parentCard.querySelector('.city-name').textContent.trim()

		updateTemperatureChart(city)

		setTimeout(() => {
			updateTemperatureChart(city)
		}, 500)

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

	if (e.target.closest('.cards__title__button--delete')) {
		const index = Array.from(
			document.querySelectorAll('.cards__title__button--delete')
		).indexOf(e.target.closest('.cards__title__button--delete'))
		deleteCards(index)
	}
})
