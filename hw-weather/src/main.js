import { getWeather } from './js/API.js'
import 'izitoast/dist/css/iziToast.min.css'
import iziToast from 'izitoast'
import { tryAndCatch } from './js/tryAndCatch.js'
import { box } from './js/render.js'

const form = document.querySelector('.header__form')
const input = document.querySelector('.header__form__input')

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

	await tryAndCatch(inputValue)
	inputValue = ''
})
