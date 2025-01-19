import 'izitoast/dist/css/iziToast.min.css'
import { tryAndCatch } from './js/tryAndCatch.js'
import iziToast from 'izitoast'
import {
	addWeatherCards,
	deleteCards,
	savedWeatherData,
} from './js/localStorage.js'
import { renderCards } from './js/render.js'

const form = document.querySelector('.header__form')
const input = document.querySelector('.header__form__input')
const box = document.querySelector('.box')

document.addEventListener('DOMContentLoaded', () => {
	renderCards(savedWeatherData)
})

form.addEventListener('submit', async e => {
	e.preventDefault()
	let inputValue = input.value.trim()
	if (inputValue === '') {
		iziToast.error({
			title: 'Error',
			message: 'Please enter a city name',
			position: 'topRight',
		})
		return
	}

	const weatherData = await tryAndCatch(inputValue)
	if (weatherData) {
		addWeatherCards(weatherData)
		input.value = ''
	}
})

document.addEventListener('click', e => {
	if (e.target.classList.contains('cards__button')) {
		e.preventDefault()
		const parentCard = e.target.closest('.cards__div')
		const details = parentCard.querySelector('.cards__additionally')
		const wrapper = parentCard.querySelector('.content-wrapper')
		details.classList.toggle('is-hidden')
		if (document.querySelector('.cards__button').innerHTML === 'More details') {
			document.querySelector('.cards__button').innerHTML = 'Hide details'

			box.style.width = '100%'
			box.style.height = 'auto'
			details.style.width = '25%'
			wrapper.style.width = '50%'
		} else {
			document.querySelector('.cards__button').innerHTML = 'More details'
			box.style.width = '50%'
			wrapper.style.width = '50%'
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
