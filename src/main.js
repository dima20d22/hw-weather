import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { tryAndCatch } from './js/tryAndCatch.js'
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
const switchDayTomorrow = document.getElementById('linkTomorrow')
const switchDayToday = document.getElementById('linkToday')
const divToday = document.querySelector('.cards__today')
const divTomorrow = document.querySelector('.cards__tomorrow ')

document.addEventListener('DOMContentLoaded', () => {
	renderCards(savedWeatherData())
	divToday.classList.remove('is-hidden')
	switchDayToday.style.color = '#007bff'
})

switchDayTomorrow.addEventListener('click', e => {
	e.preventDefault()
	switchDayToday.style.color = ''
	switchDayTomorrow.style.color = '#007bff'
	divToday.classList.add('is-hidden')
	divTomorrow.classList.remove('is-hidden')
})

switchDayToday.addEventListener('click', e => {
	e.preventDefault()
	switchDayToday.style.color = '#007bff'
	switchDayTomorrow.style.color = ''
	divToday.classList.remove('is-hidden')
	divTomorrow.classList.add('is-hidden')
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

	const cityExists = savedWeatherData().some(
		city => city.location.name.toLowerCase() === inputValue.toLowerCase()
	)

	if (cityExists) {
		iziToast.warning({
			title: 'Warning',
			message: `City "${inputValue}" already exists.`,
			position: 'topRight',
		})
		input.value = ''
		return
	}

	const data = await tryAndCatch(inputValue)
	if (data) {
		addWeatherCards(data)
		renderCards(loadDataFromLocalStorage())
		input.value = ''
	}
})

document.addEventListener('click', e => {
	if (e.target.classList.contains('cards__button')) {
		e.preventDefault()

		const parentCard = e.target.closest('.cards__div')
		const details = parentCard.querySelector('.cards__additionally')

		const city = parentCard.querySelector('.city-name').textContent.trim()

		updateTemperatureChart(city)

		const isHidden = details.classList.toggle('is-hidden')

		if (!isHidden) {
			e.target.textContent = 'Hide details'

			parentCard.style.height = 'auto'
		} else {
			e.target.textContent = 'More details'
		}
	}

	if (e.target.closest('.cards__title__button--delete')) {
		const parentCard = e.target.closest('.cards__div')
		const cityId = parentCard.dataset.cityId
		const index = loadDataFromLocalStorage().findIndex(
			item => item.id === cityId
		)
		deleteCards(index)
	}
})
